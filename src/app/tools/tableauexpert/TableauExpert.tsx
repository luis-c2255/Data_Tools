"use client";

import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import {
    Upload,
    BarChart3,
    PieChart,
    ChevronRight,
    Download,
    Plus,
    LayoutDashboard,
    FileSpreadsheet,
    Settings,
    HelpCircle,
    Lightbulb,
    ArrowRight,
    Database,
    LayoutGrid,
    ShieldCheck,
    FileText,
    TrendingUp,
    Share2,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart as ReLineChart,
    Line,
    PieChart as RePieChart,
    Pie,
    Cell,
    ScatterChart,
    Scatter,
    AreaChart,
    Area,
} from "recharts";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type DataRow = Record<string, unknown>;

interface AnalysisResult {
    summary: string;
    insights: string[];
    calculatedFields: { name: string; formula: string; reason: string }[];
    firstViz: string;
}

interface VizSuggestion {
    title: string;
    type: "bar" | "line" | "pie" | "scatter" | "area";
    xAxis: string;
    yAxis: string;
    mark: string;
    dimension: string;
    measure: string;
    description: string;
}

interface ValidationIssue {
    column: string;
    type: "missing" | "type_mismatch" | "format";
    message: string;
    count: number;
}

interface ValidationReport {
    isValid: boolean;
    issues: ValidationIssue[];
    totalRows: number;
}

type ActiveTab = "data" | "explore" | "viz" | "dashboard";
type Message = { role: "user" | "assistant"; content: string };

// ─────────────────────────────────────────────
// AI helpers — routes through the existing /api/chat endpoint
// ─────────────────────────────────────────────
async function callChat(content: string): Promise<string> {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content }] }),
    });
    const json = await res.json();
    return json?.choices?.[0]?.message?.content ?? json?.output ?? "";
}

function parseJSON<T>(raw: string): T {
    const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
    return JSON.parse(clean) as T;
}

async function apiAnalyzeSchema(data: DataRow[], fileName: string): Promise<AnalysisResult> {
    const schema = Object.keys(data[0] ?? {}).map((k) => ({ name: k, type: typeof data[0][k] }));
    const raw = await callChat(
        `You are a Tableau Expert AI. Analyze the schema and sample for "${fileName}".
Schema: ${JSON.stringify(schema)}
Sample (first 10 rows): ${JSON.stringify(data.slice(0, 10))}

Reply ONLY with valid JSON, no markdown fences:
{"summary":"string","insights":["string"],"calculatedFields":[{"name":"string","formula":"string","reason":"string"}],"firstViz":"string"}`
    );
    return parseJSON<AnalysisResult>(raw);
}

async function apiSuggestViz(data: DataRow[], context: string): Promise<VizSuggestion[]> {
    const cols = Object.keys(data[0] ?? {}).join(", ");
    const raw = await callChat(
        `You are a Tableau Expert AI. Columns: ${cols}. Context: "${context}".
Suggest 5 diverse visualizations (bar, line, scatter, pie, area).
Reply ONLY with a valid JSON array, no markdown fences:
[{"title":"string","type":"bar|line|pie|scatter|area","xAxis":"col","yAxis":"col","mark":"string","dimension":"col","measure":"col","description":"string"}]`
    );
    return parseJSON<VizSuggestion[]>(raw);
}

async function apiChat(
    messages: Message[],
    data: DataRow[],
    fileName: string,
    analysis: AnalysisResult | null
): Promise<string> {
    const cols = Object.keys(data[0] ?? {}).join(", ");
    const history = messages.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n\n");
    return callChat(
        `You are a Tableau Expert AI. Dataset: "${fileName}". Columns: ${cols}.
Summary: ${analysis?.summary ?? "Not yet analyzed"}. Insights: ${analysis?.insights?.join("; ") ?? "none"}.
Guide the user through data exploration, Tableau concepts (Dimensions, Measures, Marks), and business insights. Always reference actual column names.

--- Conversation ---
${history}`
    );
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

function cn(...cls: (string | boolean | undefined | null)[]) {
    return cls.filter(Boolean).join(" ");
}

function SimpleMarkdown({ children }: { children: string }) {
    const html = children
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:1px 4px;border-radius:4px;font-size:0.8em">$1</code>')
        .replace(/\n/g, "<br />");
    return <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
}

function CustomTooltip({ active, payload, label, dimension, measure }: {
    active?: boolean; payload?: { value: unknown }[]; label?: string; dimension: string; measure: string;
}) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg text-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{dimension}</p>
            <p className="font-bold text-slate-800 mb-2">{label}</p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">{measure}</span>
                <span className="text-sm font-bold text-blue-600 ml-auto">
                    {typeof payload[0].value === "number"
                        ? (payload[0].value as number).toLocaleString(undefined, { maximumFractionDigits: 2 })
                        : String(payload[0].value)}
                </span>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function TableauExpertTool() {
    const [data, setData] = useState<DataRow[]>([]);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [suggestions, setSuggestions] = useState<VizSuggestion[]>([]);
    const [activeTab, setActiveTab] = useState<ActiveTab>("data");
    const [currentStep, setCurrentStep] = useState(1);
    const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);
    const [messages, setMessages] = useState<Message[]>([{
        role: "assistant",
        content: "Welcome to your **Guided Data Exploration**! I'm your Tableau Expert.\n\nOur journey has 5 steps:\n1. **Connect**: Upload your data.\n2. **Explore**: Understand the schema and insights.\n3. **Calculate**: Create new fields for deeper analysis.\n4. **Visualize**: Build your charts.\n5. **Present**: Assemble the final dashboard.\n\n**Step 1:** Please upload a CSV file to begin.",
    }]);
    const [input, setInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    function validateData(rows: DataRow[]): ValidationReport {
        const issues: ValidationIssue[] = [];
        Object.keys(rows[0] ?? {}).forEach((col) => {
            let missing = 0;
            const types = new Set<string>();
            rows.forEach((r) => {
                const v = r[col];
                if (v === null || v === undefined || v === "") missing++;
                else types.add(typeof v);
            });
            if (missing > 0) issues.push({ column: col, type: "missing", message: `${missing} missing values.`, count: missing });
            if (types.size > 1) issues.push({ column: col, type: "type_mismatch", message: `Mixed types: ${[...types].join(", ")}.`, count: types.size });
        });
        return { isValid: issues.length === 0, issues, totalRows: rows.length };
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".csv")) {
            alert("Please upload a CSV file. For Excel files, use File → Save As → CSV first.");
            e.target.value = "";
            return;
        }
        setFileName(file.name);
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (ev) => {
            Papa.parse(ev.target?.result as string, {
                header: true, dynamicTyping: true, skipEmptyLines: true,
                complete: async (results) => {
                    const parsed = results.data as DataRow[];
                    const report = validateData(parsed);
                    setValidationReport(report);
                    setData(parsed);
                    try {
                        const result = await apiAnalyzeSchema(parsed, file.name);
                        setAnalysis(result);
                        setCurrentStep(2);
                        const note = !report.isValid ? `\n\n⚠️ **Data Quality:** ${report.issues.length} issue(s) found — check the Data Source tab.` : "";
                        setMessages((prev) => [...prev, {
                            role: "assistant",
                            content: `**Step 2: Exploration.** Analyzed **${file.name}**.\n\n${result.summary}\n\n**Key Insights:**\n${result.insights.map((i) => `- ${i}`).join("\n")}${note}\n\nCheck the **Exploration** tab, then generate visualizations when ready.`,
                        }]);
                        setActiveTab("explore");
                    } catch {
                        setMessages((prev) => [...prev, { role: "assistant", content: "Error analyzing data. Please check the file and try again." }]);
                    } finally {
                        setLoading(false);
                    }
                },
            });
        };
        reader.readAsText(file);
    }

    async function handleGetSuggestions() {
        if (!data.length) return;
        setLoading(true);
        try {
            const vizs = await apiSuggestViz(data, analysis?.summary ?? "General exploration");
            setSuggestions(vizs);
            setCurrentStep(4);
            setActiveTab("viz");
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: "**Step 4: Visualization.** Charts generated! Each shows the Tableau **Dimension** (categorical) and **Measure** (numerical) used.",
            }]);
        } catch { /* silent */ } finally { setLoading(false); }
    }

    async function handleSend(text: string) {
        if (!text.trim() || chatLoading) return;
        const next: Message[] = [...messages, { role: "user", content: text }];
        setMessages(next);
        setInput("");
        setChatLoading(true);
        try {
            const reply = await apiChat(next, data, fileName, analysis);
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch {
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error." }]);
        } finally { setChatLoading(false); }
    }

    function renderChart(s: VizSuggestion) {
        const chartData = data.slice(0, 20);
        const ttp = { dimension: s.dimension, measure: s.measure };
        return (
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base font-semibold text-slate-100">{s.title}</h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded border border-blue-100">{s.mark}</span>
                </div>
                <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {s.type === "pie" ? (
                            <RePieChart>
                                <Pie data={chartData} dataKey={s.yAxis} nameKey={s.xAxis} cx="50%" cy="50%" outerRadius={90} label>
                                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip /><Legend />
                            </RePieChart>
                        ) : s.type === "scatter" ? (
                            <ScatterChart><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey={s.xAxis} tick={{ fontSize: 11 }} /><YAxis dataKey={s.yAxis} tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip {...ttp} />} /><Scatter data={chartData} fill="#3b82f6" />
                            </ScatterChart>
                        ) : s.type === "line" ? (
                            <ReLineChart data={chartData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey={s.xAxis} tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip {...ttp} />} /><Legend />
                                <Line type="monotone" dataKey={s.yAxis} stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                            </ReLineChart>
                        ) : s.type === "area" ? (
                            <AreaChart data={chartData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey={s.xAxis} tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip {...ttp} />} /><Legend />
                                <Area type="monotone" dataKey={s.yAxis} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.12} />
                            </AreaChart>
                        ) : (
                            <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey={s.xAxis} tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip {...ttp} />} /><Legend />
                                <Bar dataKey={s.yAxis} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                    <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dimension</p>
                        <p className="font-medium text-slate-700 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />{s.dimension}</p></div>
                    <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Measure</p>
                        <p className="font-medium text-slate-700 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />{s.measure}</p></div>
                </div>
                <p className="mt-3 text-xs text-slate-500 italic">{s.description}</p>
            </div>
        );
    }

    function NavBtn({ tab, icon: Icon, label, disabled }: { tab: ActiveTab; icon: React.ElementType; label: string; disabled?: boolean }) {
        return (
            <button onClick={() => !disabled && setActiveTab(tab)} disabled={disabled}
                className={cn("w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors",
                    disabled && "opacity-40 cursor-not-allowed",
                    !disabled && activeTab === tab && "bg-slate-800 text-white",
                    !disabled && activeTab !== tab && "hover:bg-slate-800/50 text-slate-300")}>
                <Icon size={17} /><span>{label}</span>
            </button>
        );
    }

    // ─── Render ───
    return (
        <div className="flex h-screen bg-slate-800 text-slate-100 font-sans overflow-hidden">

            {/* Sidebar */}
            <aside className="w-60 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
                <div className="p-5 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="text-white w-4 h-4" />
                    </div>
                    <h1 className="font-bold text-white text-sm tracking-tight">Tableau Expert</h1>
                </div>
                <nav className="flex-1 p-3 space-y-1">
                    <NavBtn tab="data" icon={FileSpreadsheet} label="Data Source" />
                    <NavBtn tab="explore" icon={Lightbulb} label="Exploration" disabled={!data.length} />
                    <NavBtn tab="viz" icon={PieChart} label="Visualizations" disabled={!data.length} />
                    <NavBtn tab="dashboard" icon={LayoutDashboard} label="Dashboard" disabled={!data.length} />
                </nav>
                <div className="p-3 border-t border-slate-800 space-y-1 text-xs">
                    <button onClick={() => { localStorage.setItem("te_session", JSON.stringify({ data, fileName, analysis, suggestions, activeTab, currentStep, messages })); alert("Saved!"); }}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-emerald-400 transition-colors">
                        <Download size={15} />Save Session
                    </button>
                    <button onClick={() => { const s = localStorage.getItem("te_session"); if (s) { const p = JSON.parse(s); setData(p.data ?? []); setFileName(p.fileName ?? ""); setAnalysis(p.analysis ?? null); setSuggestions(p.suggestions ?? []); setActiveTab(p.activeTab ?? "data"); setCurrentStep(p.currentStep ?? 1); setMessages(p.messages ?? []); alert("Loaded!"); } else alert("No saved session."); }}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-blue-400 transition-colors">
                        <Upload size={15} />Load Session
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"><Settings size={15} />Settings</button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"><HelpCircle size={15} />Help</button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Header */}
                <header className="h-[68px] bg-slate-900 border-slate-700 flex flex-col justify-center px-6 shrink-0">
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-3">
                            <h2 className="font-semibold text-slate-700 text-sm">
                                {activeTab === "data" && "Step 1: Connect to Data"}
                                {activeTab === "explore" && "Step 2 & 3: Exploration & Calculation"}
                                {activeTab === "viz" && "Step 4: Visualizations"}
                                {activeTab === "dashboard" && "Step 5: Executive Dashboard"}
                            </h2>
                            {fileName && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">{fileName}</span>}
                        </div>
                        <button onClick={() => { if (currentStep < 5) setCurrentStep((s) => Math.min(s + 1, 5)); if (currentStep === 4) setActiveTab("dashboard"); }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1">
                            {currentStep < 5 ? "Next Step" : "Finish"}<ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden flex">
                        {[1, 2, 3, 4, 5].map((s) => <div key={s} className={cn("flex-1 transition-all duration-500", s <= currentStep ? "bg-blue-500" : "")} />)}
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6 bg-slate-800">

                    {/* DATA TAB */}
                    {activeTab === "data" && (
                        <div className="max-w-3xl mx-auto">
                            {!data.length ? (
                                <div className="bg-slate-900 border-2 border-dashed border-slate-700 rounded-3xl p-14 flex flex-col items-center text-center space-y-5">
                                    <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center">
                                        <Upload className="text-blue-500 w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-100">Upload your dataset</h3>
                                        <p className="text-slate-300 mt-1 max-w-xs text-sm">Connect a CSV file to start AI-guided exploration.</p>
                                    </div>
                                    <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                                    <button onClick={() => fileInputRef.current?.click()} disabled={loading}
                                        className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all text-sm disabled:opacity-60">
                                        {loading ? "Analyzing…" : "Browse Files"}
                                    </button>
                                    <p className="text-xs text-slate-400">CSV only · For Excel files, export as CSV first</p>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-slate-800">Data Preview</h3>
                                        <button onClick={() => { setData([]); setValidationReport(null); setFileName(""); }} className="text-sm text-red-500 hover:text-red-600 font-medium">Remove</button>
                                    </div>
                                    {validationReport && !validationReport.isValid && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
                                            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm"><HelpCircle size={16} />Data Quality Issues</div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {validationReport.issues.map((issue, i) => (
                                                    <div key={i} className="bg-white/60 p-3 rounded-lg border border-amber-100 flex justify-between items-center">
                                                        <div><p className="text-[10px] font-bold text-amber-700 uppercase">{issue.column}</p><p className="text-xs text-amber-900">{issue.message}</p></div>
                                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded">{issue.type.replace("_", " ")}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-slate-900 border-slate-700 rounded-xl overflow-hidden shadow-sm">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs">
                                                <thead className="bg-slate-800 border-slate-700">
                                                    <tr>{Object.keys(data[0]).map((k) => <th key={k} className="px-3 py-2.5 font-semibold text-slate-300 whitespace-nowrap">{k}</th>)}</tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {data.slice(0, 10).map((row, i) => (
                                                        <tr key={i} className="hover:bg-slate-50/50">
                                                            {Object.values(row).map((val, j) => <td key={j} className="px-3 py-2 text-slate-300 whitespace-nowrap">{val !== null && val !== undefined ? String(val) : "—"}</td>)}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-3 bg-slate-400 border-t border-slate-200 text-[11px] text-slate-900 flex justify-between">
                                            <span>First 10 of {data.length} rows</span><span>{Object.keys(data[0]).length} columns</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => setActiveTab("explore")} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 text-sm flex items-center gap-2">
                                            Start Exploration <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* EXPLORE TAB */}
                    {activeTab === "explore" && analysis && (
                        <div className="space-y-6 max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    <section className="bg-slate-800 p-7 rounded-2xl border border-slate-600 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-100 mb-3">Expert Summary</h3>
                                        <p className="text-sm text-slate-100 leading-relaxed"><SimpleMarkdown>{analysis.summary}</SimpleMarkdown></p>
                                    </section>
                                    <section className="bg-slate-800 p-7 rounded-2xl border border-slate-600 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2"><Lightbulb className="text-amber-500" size={18} />Key Insights</h3>
                                        <ul className="space-y-3">
                                            {analysis.insights.map((insight, i) => (
                                                <li key={i} className="flex items-start gap-3 p-3.5 bg-slate-800 rounded-xl border border-slate-600">
                                                    <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-200 mt-0.5 shrink-0">{i + 1}</div>
                                                    <span className="text-slate-200 text-sm">{insight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                                <div className="space-y-5">
                                    <section className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl">
                                        <h3 className="text-base font-bold mb-4 flex items-center gap-2"><Plus className="text-blue-400" size={16} />Calculated Fields</h3>
                                        <div className="space-y-4">
                                            {analysis.calculatedFields.map((f, i) => (
                                                <div key={i} className="p-3.5 bg-slate-800 rounded-xl border border-slate-700">
                                                    <h4 className="font-bold text-blue-400 text-xs">{f.name}</h4>
                                                    <code className="block mt-1.5 text-[11px] bg-black/30 p-2 rounded font-mono text-slate-300">{f.formula}</code>
                                                    <p className="mt-1.5 text-[11px] text-slate-400">{f.reason}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <button onClick={handleGetSuggestions} disabled={loading}
                                        className="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500 flex flex-col items-center gap-2 text-sm disabled:opacity-60">
                                        {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" /> : <><BarChart3 size={28} />Generate Visualizations</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIZ TAB */}
                    {activeTab === "viz" && (
                        <div className="space-y-6">
                            {suggestions.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    {suggestions.map((s, i) => <div key={i}>{renderChart(s)}</div>)}
                                    <div className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center p-10 text-center">
                                        <Plus className="text-slate-100 w-10 h-10 mb-3" />
                                        <h4 className="font-bold text-slate-300 text-sm">Add Custom Visualization</h4>
                                        <p className="text-xs text-slate-400 mt-1">Ask the expert in the chat panel.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20 text-slate-500 text-sm">No visualizations yet. Go to Exploration and click &ldquo;Generate Visualizations&rdquo;.</div>
                            )}
                        </div>
                    )}

                    {/* DASHBOARD TAB */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-7 pb-12 max-w-6xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
                                <div>
                                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-1">Executive Overview</p>
                                    <h2 className="text-2xl font-bold text-slate-300">{fileName || "Untitled Analysis"}</h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Generated {new Date().toLocaleDateString()} · {data.length.toLocaleString()} records</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-blue-600 border border-slate-400 rounded-lg text-xs font-medium text-white hover:bg-blue-700 flex items-center gap-1.5"><Download size={14} />Export PDF</button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 flex items-center gap-1.5"><Share2 size={14} />Share</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                                {[
                                    { label: "Total Records", value: data.length.toLocaleString(), icon: Database, color: "text-slate-900" },
                                    { label: "Dimensions", value: Object.keys(data[0] ?? {}).length, icon: LayoutGrid, color: "text-slate-900" },
                                    { label: "Data Quality", value: validationReport?.isValid ? "100%" : "Needs Review", icon: ShieldCheck, color: "text-emerald-600" },
                                    { label: "Key Insights", value: analysis?.insights.length ?? 0, icon: Lightbulb, color: "text-blue-600" },
                                ].map((k, i) => (
                                    <div key={i} className="bg-slate-700 p-5 rounded-2xl border border-slate-500 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-2"><p className="text-xs text-slate-200 font-medium">{k.label}</p><k.icon size={16} className="text-slate-300" /></div>
                                        <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                                    </div>
                                ))}
                            </div>
                            {suggestions.length > 0 && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    {suggestions.slice(0, 4).map((s, i) => <div key={i}>{renderChart(s)}</div>)}
                                </div>
                            )}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-7">
                                <div className="xl:col-span-2 bg-slate-800 p-7 rounded-2xl border border-slate-600 shadow-sm">
                                    <div className="flex items-center gap-3 mb-5"><div className="p-2 bg-blue-50 rounded-lg"><FileText className="text-blue-600" size={18} /></div><h3 className="text-lg font-bold text-slate-200">Executive Summary</h3></div>
                                    <p className="text-slate-200 leading-relaxed text-sm italic border-l-4 border-blue-100 pl-5 py-1 mb-4">"Based on the automated analysis of {fileName}, significant patterns have been identified across your primary dimensions."</p>
                                    {analysis && <p className="text-sm text-slate-200 leading-relaxed"><SimpleMarkdown>{analysis.summary.split("\n")[0]}</SimpleMarkdown></p>}
                                </div>
                                <div className="bg-slate-900 text-white p-7 rounded-2xl shadow-xl">
                                    <div className="flex items-center gap-3 mb-5"><div className="p-2 bg-blue-500/20 rounded-lg"><TrendingUp className="text-blue-400" size={18} /></div><h3 className="text-lg font-bold">Strategic Actions</h3></div>
                                    <ul className="space-y-4">
                                        {analysis?.insights.slice(0, 4).map((insight, i) => (
                                            <li key={i} className="flex gap-3 group">
                                                <div className="shrink-0 w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">{i + 1}</div>
                                                <p className="text-xs text-slate-300 leading-snug pt-1">{insight}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-7 pt-5 border-t border-slate-800">
                                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5">View Detailed Report <ChevronRight size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Chat panel */}
            <aside className="w-72 bg-slate-900 border-l border-slate-600 flex flex-col shadow-2xl shrink-0">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="font-bold text-xs text-slate-300 uppercase tracking-wider">Expert Assistant</span>
                    </div>
                    <HelpCircle size={15} className="text-slate-400" />
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-800">
                    {messages.map((msg, i) => (
                        <div key={i} className={cn("max-w-[92%] rounded-2xl px-3.5 py-3 shadow-sm text-xs leading-relaxed",
                            msg.role === "assistant" ? "bg-slate-900 text-slate-300 border border-slate-600 self-start rounded-tl-none" : "bg-blue-600 text-white self-end ml-auto rounded-tr-none")}>
                            <SimpleMarkdown>{msg.content}</SimpleMarkdown>
                        </div>
                    ))}
                    {chatLoading && (
                        <div className="bg-slate-800 border border-slate-600 rounded-2xl px-3.5 py-3 flex gap-1 w-16">
                            {[0, 0.15, 0.3].map((d, i) => <div key={i} className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />)}
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <div className="p-3 border-t border-slate-700 bg-slate-900">
                    {data.length > 0 && messages.length < 6 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {["What are the top trends?", "Suggest a chart", "Explain the outliers"].map((q) => (
                                <button key={q} onClick={() => handleSend(q)} className="text-[10px] bg-slate-900 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-full border border-slate-200 transition-colors">{q}</button>
                            ))}
                        </div>
                    )}
                    <div className="relative">
                        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the expert…"
                            className="w-full bg-slate-600 rounded-xl p-3 pr-9 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none min-h-[70px] border-none"
                            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(input); } }} />
                        <button onClick={() => handleSend(input)} disabled={chatLoading || !input.trim()}
                            className="absolute bottom-3 right-3 text-blue-600 hover:text-blue-700 disabled:opacity-40 transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 text-center">AI can make mistakes. Verify important insights.</p>
                </div>
            </aside>
        </div>
    );
}