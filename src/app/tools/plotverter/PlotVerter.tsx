"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, BarChart2, Loader2, Copy, Check, Eye, Code2, Send, Sparkles, RotateCcw } from "lucide-react";


const LIBRARIES = [
  { id: "matplotlib", name: "Matplotlib", description: "The OG Python plotting library" },
  { id: "seaborn", name: "Seaborn", description: "Statistical data visualization" },
  { id: "plotly", name: "Plotly", description: "Interactive web-ready charts" },
  { id: "bokeh", name: "Bokeh", description: "Interactive browser-based plots" },
  { id: "altair", name: "Altair", description: "Declarative statistical charts" },
];

const EXAMPLE_CODE = {
  matplotlib: `import matplotlib.pyplot as plt

categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 12, 67, 34]

fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.bar(categories, values, color='steelblue', edgecolor='white', linewidth=0.8)
ax.set_title('Sales by Category', fontsize=16, fontweight='bold', pad=15)
ax.set_xlabel('Category', fontsize=12)
ax.set_ylabel('Sales', fontsize=12)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3)
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
            str(val), ha='center', va='bottom', fontsize=10)
plt.tight_layout()
plt.show()`,
  seaborn: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({
    'Category': ['A', 'B', 'C', 'D', 'E'],
    'Sales': [23, 45, 12, 67, 34]
})
sns.set_theme(style='whitegrid')
fig, ax = plt.subplots(figsize=(8, 5))
sns.barplot(data=df, x='Category', y='Sales', color='steelblue', ax=ax)
ax.set_title('Sales by Category', fontsize=16, fontweight='bold')
ax.set_xlabel('Category', fontsize=12)
ax.set_ylabel('Sales', fontsize=12)
plt.tight_layout()
plt.show()`,
  plotly: `import plotly.graph_objects as go

categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 12, 67, 34]

fig = go.Figure(go.Bar(
    x=categories, y=values,
    marker_color='steelblue',
    text=values, textposition='outside'
))
fig.update_layout(
    title=dict(text='Sales by Category', font=dict(size=16)),
    xaxis_title='Category', yaxis_title='Sales',
    plot_bgcolor='white',
    yaxis=dict(gridcolor='rgba(0,0,0,0.1)'),
    margin=dict(t=60, b=40, l=60, r=20)
)
fig.show()`,
  bokeh: `from bokeh.plotting import figure, show
from bokeh.models import ColumnDataSource
from bokeh.io import output_notebook

output_notebook()
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 12, 67, 34]
source = ColumnDataSource(dict(categories=categories, values=values))

p = figure(x_range=categories, height=400, width=650,
           title='Sales by Category', toolbar_location=None)
p.vbar(x='categories', top='values', width=0.7,
       source=source, color='steelblue', line_color='white')
p.xgrid.grid_line_color = None
p.yaxis.axis_label = 'Sales'
p.xaxis.axis_label = 'Category'
p.title.text_font_size = '16pt'
p.y_range.start = 0
show(p)`,
  altair: `import altair as alt
import pandas as pd

df = pd.DataFrame({
    'Category': ['A', 'B', 'C', 'D', 'E'],
    'Sales': [23, 45, 12, 67, 34]
})
chart = alt.Chart(df).mark_bar(color='steelblue').encode(
    x=alt.X('Category:N', axis=alt.Axis(title='Category')),
    y=alt.Y('Sales:Q', axis=alt.Axis(title='Sales')),
    tooltip=['Category', 'Sales']
).properties(
    title='Sales by Category', width=550, height=350
).configure_view(strokeWidth=0).configure_axis(grid=True, gridOpacity=0.3)
chart.show()`,
};

const QUICK_EDITS = [
  "Change to a line chart",
  "Change to a pie chart",
  "Use a red/orange color palette",
  "Add a legend",
  "Make it horizontal",
  "Add gridlines",
  "Make the title larger",
  "Sort bars descending",
];

// ── sub-components ────────────────────────────────────────────────────────────

const LibraryCard = ({ lib, selected, side, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-start px-3 py-2 rounded-lg border-2 transition-all text-left w-full ${selected
      ? side === "source"
        ? "border-indigo-500 bg-indigo-950 text-white"
        : "border-emerald-500 bg-emerald-950 text-white"
      : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500"
      }`}
  >
    <span className="font-bold text-sm">{lib.name}</span>
    <span className="text-xs text-gray-400 font-normal leading-tight">{lib.description}</span>
  </button>
);

const PreviewFrame = ({ html }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const doc = ref.current.contentDocument;
    doc.open(); doc.write(html); doc.close();
  }, [html]);
  return <iframe ref={ref} className="w-full h-auto border-none bg-white" sandbox="allow-scripts" title="Chart Preview" />;
};

const TabBar = ({ side, activeTab, hasCode, isPreviewing, previewSide, onTabChange }) => (
  <div className="flex items-center gap-1">
    <button
      onClick={() => onTabChange(side, "code")}
      className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors ${activeTab === "code" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
        }`}
    >
      <Code2 className="w-3 h-3" /> Code
    </button>
    <button
      onClick={() => onTabChange(side, "preview")}
      disabled={!hasCode || (isPreviewing && previewSide === side)}
      className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${activeTab === "preview" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
        }`}
    >
      {isPreviewing && previewSide === side
        ? <Loader2 className="w-3 h-3 animate-spin" />
        : <Eye className="w-3 h-3" />}
      Preview
    </button>
  </div>
);

// ── main component ────────────────────────────────────────────────────────────
export default function PlotVerter() {
  const [source, setSource] = useState("matplotlib");
  const [target, setTarget] = useState("plotly");
  const [sourceCode, setSourceCode] = useState(EXAMPLE_CODE["matplotlib"]);
  const [outputCode, setOutputCode] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  // preview state
  const [sourcePreviewHtml, setSourcePreviewHtml] = useState("");
  const [outputPreviewHtml, setOutputPreviewHtml] = useState("");
  const [previewSide, setPreviewSide] = useState(null);
  const [sourceTab, setSourceTab] = useState("code");
  const [outputTab, setOutputTab] = useState("code");

  // edit chat state
  const [editTarget, setEditTarget] = useState("output"); // "source" | "output"
  const [editInput, setEditInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // [{role, content, side}]
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory]);

  // ── helpers ────────────────────────────────────────────────────────────────

  const callClaude = async (messages, maxTokens = 1500) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        max_tokens: maxTokens,
        messages
      }),
    });
    const data = await res.json();
    // PlotVerter output (clean Python code)
    if (data.output) {
      return data.output.trim();
    }
    // Guided Analysis fallback
    const text =
      data?.choices?.[0]?.message?.content ||
      "";
    return text.trim();
  };
  const resetPreview = (side) => {
    if (side === "source") { setSourcePreviewHtml(""); setSourceTab("code"); }
    else { setOutputPreviewHtml(""); setOutputTab("code"); }
  };

  // ── convert ───────────────────────────────────────────────────────────────

  const convert = async () => {
    if (!sourceCode.trim()) { setError("Please enter some code to convert."); return; }
    if (source === target) { setError("Source and target libraries must be different."); return; }
    setIsConverting(true); setError(""); setOutputCode(""); setNotes("");
    resetPreview("source"); resetPreview("output"); setChatHistory([]);

    const srcName = LIBRARIES.find(l => l.id === source).name;
    const tgtName = LIBRARIES.find(l => l.id === target).name;

    const prompt = `You are an expert Python data visualization developer. Convert the following ${srcName} chart code to ${tgtName}.
Rules:
- Preserve chart type, data, labels, title, and styling as closely as possible.
- If an exact equivalent doesn't exist in ${tgtName}, produce the closest alternative and briefly note what changed.
- Return ONLY a valid JSON object with two keys:
  "code": full converted Python code as a plain string (no markdown, no backticks),
  "notes": short plain-English string explaining differences, or "" if direct.
No extra text outside the JSON.

${srcName} code:
${sourceCode}`;

    try {
      const raw = await callClaude([{ role: "user", content: prompt }]);
      const parsed = JSON.parse(raw.replace(/^```json\s*/i, "").replace(/```$/, "").trim());
      setOutputCode(parsed.code || "");
      setNotes(parsed.notes || "");
    } catch { setError("Conversion failed. Please try again."); }
    finally { setIsConverting(false); }
  };

  // ── preview ───────────────────────────────────────────────────────────────

  const generatePreview = async (side) => {
    const code = side === "source" ? sourceCode : outputCode;
    const libId = side === "source" ? source : target;
    const libName = LIBRARIES.find(l => l.id === libId).name;
    if (!code.trim()) return;

    setIsPreviewing(true); setPreviewSide(side);
    if (side === "source") setSourceTab("preview"); else setOutputTab("preview");

    const prompt = `Convert this ${libName} Python chart code to a self-contained HTML file rendered with Plotly.js (https://cdn.plot.ly/plotly-2.26.0.min.js).
- Extract all data, labels, titles, colors, chart type.
- Dark theme: body bg #0f172a, paper/plot bg #1e293b, font color #e2e8f0.
- Chart fills full viewport (100vw × 100vh), no body margin.
- Return ONLY raw HTML, no markdown, no backticks, no explanation.

Python code:
${code}`;

    try {
      const html = await callClaude([{ role: "user", content: prompt }], 2000);
      const clean = html.replace(/^```html\s*/i, "").replace(/```$/, "").trim();
      if (side === "source") setSourcePreviewHtml(clean);
      else setOutputPreviewHtml(clean);
    } catch {
      setError("Preview generation failed.");
      if (side === "source") setSourceTab("code"); else setOutputTab("code");
    } finally { setIsPreviewing(false); }
  };

  const handleTabChange = (side, tab) => {
    if (tab === "preview") {
      const existingHtml = side === "source" ? sourcePreviewHtml : outputPreviewHtml;
      if (existingHtml) {
        if (side === "source") setSourceTab("preview"); else setOutputTab("preview");
      } else { generatePreview(side); }
    } else {
      if (side === "source") setSourceTab("code"); else setOutputTab("code");
    }
  };

  // ── edit / chat ───────────────────────────────────────────────────────────

  const submitEdit = async (requestText?: string) => {
    const req = (requestText || editInput).trim();
    if (!req) return;

    const currentCode = editTarget === "source" ? sourceCode : outputCode;
    const libId = editTarget === "source" ? source : target;
    const libName = LIBRARIES.find(l => l.id === libId).name;

    if (!currentCode.trim()) {
      setError(`No ${editTarget} code to edit yet.`);
      return;
    }

    const newUserMsg = { role: "user", content: req, side: editTarget };
    setChatHistory(h => [...h, newUserMsg]);
    setEditInput("");
    setIsEditing(true);
    setError("");

    // Build conversation for Claude: system context + prior turns (filtered to same side) + new request
    const priorMsgs = chatHistory
      .filter(m => m.side === editTarget)
      .map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));

    const systemContext = `You are an expert Python ${libName} developer. The user wants to modify a chart. Always return ONLY a valid JSON object with two keys: "code" (updated Python code, plain string, no markdown) and "reply" (short friendly confirmation of what you changed). No extra text.`;

    const messages = [
      { role: "user", content: `${systemContext}\n\nCurrent ${libName} code:\n${currentCode}` },
      { role: "assistant", content: '{"code":"...","reply":"Ready to make changes!"}' },
      ...priorMsgs,
      { role: "user", content: req },
    ];

    try {
      const raw = await callClaude(messages, 2000);
      const parsed = JSON.parse(raw.replace(/^```json\s*/i, "").replace(/```$/, "").trim());
      const newCode = parsed.code || currentCode;
      const reply = parsed.reply || "Done!";

      if (editTarget === "source") { setSourceCode(newCode); resetPreview("source"); }
      else { setOutputCode(newCode); resetPreview("output"); }

      setChatHistory(h => [...h, { role: "assistant", content: reply, side: editTarget }]);
    } catch {
      setChatHistory(h => [...h, { role: "assistant", content: "Sorry, I couldn't apply that change. Please try again.", side: editTarget }]);
    } finally { setIsEditing(false); }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitEdit(); }
  };

  const copyOutput = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const srcLib = LIBRARIES.find(l => l.id === source);
  const tgtLib = LIBRARIES.find(l => l.id === target);

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-0 bg-gray-950 text-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-3">
        <BarChart2 className="w-7 h-7 text-indigo-400" />
        <div>
          <h1 className="text-xl font-bold leading-tight">PlotVerter</h1>
          <p className="text-xs text-gray-400">Python Visualization Library Converter</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-4 overflow-y-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 min-h-0">

          {/* Library selector */}
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <div className="flex flex-col gap-1.5 w-40">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest text-center">From</p>
              {LIBRARIES.map(lib => (
                <LibraryCard key={lib.id} lib={lib} selected={source === lib.id} side="source"
                  onClick={() => { if (lib.id === target) setTarget(source); setSource(lib.id); setSourceCode(EXAMPLE_CODE[lib.id]); setOutputCode(""); setNotes(""); resetPreview("source"); resetPreview("output"); setChatHistory([]); }} />
              ))}
            </div>

            <div className="flex flex-col items-center gap-3">
              <ArrowRight className="w-7 h-7 text-gray-600" />
              <button onClick={convert} disabled={isConverting || source === target}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                {isConverting ? <><Loader2 className="w-4 h-4 animate-spin" /> Converting...</> : <><BarChart2 className="w-4 h-4" /> Convert</>}
              </button>
            </div>

            <div className="flex flex-col gap-1.5 w-40">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest text-center">To</p>
              {LIBRARIES.map(lib => (
                <LibraryCard key={lib.id} lib={lib} selected={target === lib.id} side="target"
                  onClick={() => { if (lib.id === source) setSource(target); setTarget(lib.id); setOutputCode(""); setNotes(""); resetPreview("output"); setChatHistory([]); }} />
              ))}
            </div>
          </div>

          {/* Error / Notes */}
          {error && <div className="bg-red-950 border border-red-800 text-red-300 px-4 py-3 rounded-xl text-center text-sm">{error}</div>}
          {notes && (
            <div className="bg-amber-950 border border-amber-800 text-amber-200 px-4 py-3 rounded-xl text-sm flex gap-2">
              <span className="font-bold shrink-0">⚠ Note:</span><span>{notes}</span>
            </div>
          )}

          {/* Code panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
            {/* Source */}
            <div className="bg-gray-900 rounded-xl overflow-y-auto border border-indigo-900/50 flex flex-col" style={{ minHeight: 340 }}>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-sm font-semibold text-indigo-300">{srcLib?.name} — Source</span>
                <TabBar side="source" activeTab={sourceTab} hasCode={!!sourceCode.trim()} isPreviewing={isPreviewing} previewSide={previewSide} onTabChange={handleTabChange} />
              </div>
              <div className="flex-1 min-h-0 relative">
                {sourceTab === "code"
                  ? <textarea value={sourceCode} onChange={e => { setSourceCode(e.target.value); resetPreview("source"); }}
                    className="w-full h-auto min-h-64 p-4 bg-gray-900 text-gray-100 font-mono text-xs resize-none outline-none leading-relaxed"
                    placeholder="Paste your chart code here..." spellCheck={false} />
                  : <div className="w-full" style={{ height: 280 }}>
                    {isPreviewing && previewSide === "source"
                      ? <div className="flex items-center justify-center h-auto"><Loader2 className="w-8 h-8 animate-spin text-indigo-400" /></div>
                      : sourcePreviewHtml ? <PreviewFrame html={sourcePreviewHtml} /> : null}
                  </div>}
              </div>
            </div>

            {/* Output */}
            <div className="bg-gray-900 rounded-xl overflow-y-auto border border-emerald-900/50 flex flex-col" style={{ minHeight: 340 }}>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-sm font-semibold text-emerald-300">{tgtLib?.name} — Output</span>
                <div className="flex items-center gap-2">
                  <TabBar side="output" activeTab={outputTab} hasCode={!!outputCode.trim()} isPreviewing={isPreviewing} previewSide={previewSide} onTabChange={handleTabChange} />
                  <button onClick={copyOutput} disabled={!outputCode}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors ml-1">
                    {copied ? <><Check className="w-3.5 h-3.5 text-green-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>
              <div className="flex-1 min-h-0 relative">
                {outputTab === "code"
                  ? <div className="relative h-auto">
                    <textarea readOnly value={outputCode}
                      className="w-full h-auto min-h-64 p-4 bg-gray-900 text-gray-100 font-mono text-xs resize-none outline-none leading-relaxed"
                      placeholder={isConverting ? "Converting..." : "Converted code will appear here..."} spellCheck={false} />
                    {isConverting && <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-400" /></div>}
                  </div>
                  : <div className="w-full" style={{ height: 280 }}>
                    {isPreviewing && previewSide === "output"
                      ? <div className="flex items-center justify-center h-auto"><Loader2 className="w-8 h-8 animate-spin text-emerald-400" /></div>
                      : outputPreviewHtml ? <PreviewFrame html={outputPreviewHtml} /> : null}
                  </div>}
              </div>
            </div>
          </div>

          {/* ── Edit / Chat panel ── */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-violet-300">Ask for changes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Editing:</span>
                <button onClick={() => setEditTarget("source")}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${editTarget === "source" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                  {srcLib?.name} (source)
                </button>
                <button onClick={() => setEditTarget("output")} disabled={!outputCode}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${editTarget === "output" ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                  {tgtLib?.name} (output)
                </button>
                {chatHistory.length > 0 && (
                  <button onClick={() => setChatHistory([])} className="ml-1 text-gray-500 hover:text-gray-300 transition-colors" title="Clear chat">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick edit chips */}
            <div className="px-4 pt-3 flex flex-wrap gap-2">
              {QUICK_EDITS.map(q => (
                <button key={q} onClick={() => submitEdit(q)}
                  disabled={isEditing}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-violet-500 text-gray-300 hover:text-white rounded-full text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  {q}
                </button>
              ))}
            </div>

            {/* Chat history */}
            {chatHistory.length > 0 && (
              <div className="mx-4 mt-3 max-h-48 overflow-y-auto flex flex-col gap-2 pr-1">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === "user"
                      ? msg.side === "source" ? "bg-indigo-700 text-white" : "bg-emerald-700 text-white"
                      : "bg-gray-700 text-gray-200"
                      }`}>
                      {msg.role === "assistant" && <span className="font-semibold text-violet-300 block mb-0.5">✦ Claude</span>}
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-300 px-3 py-2 rounded-xl text-xs flex items-center gap-1.5">
                      <Loader2 className="w-3 h-3 animate-spin" /> Applying changes…
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}

            {/* Input */}
            <div className="p-4 flex gap-2">
              <input
                value={editInput}
                onChange={e => setEditInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isEditing}
                placeholder={`Describe a change to the ${editTarget === "source" ? srcLib?.name + " source" : tgtLib?.name + " output"} chart…`}
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-600 focus:border-violet-500 text-gray-100 rounded-xl text-sm outline-none placeholder-gray-500 transition-colors disabled:opacity-50"
              />
              <button onClick={() => submitEdit()} disabled={!editInput.trim() || isEditing}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                {isEditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-center text-gray-600 text-xs pb-1">
            PlotVerter uses Claude AI. Previews are browser approximations — always test your Python code locally.
          </p>
        </div>
      </div>
    </div>
  );
}
