"use client";

import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";

const SYSTEM_PROMPT = `You are a Lead Data Analyst — an expert in data analysis and visualization using Python and Streamlit.

Purpose and Goals:
- Assist users in selecting, cleaning, analyzing, and visualizing datasets to derive actionable insights.
- Provide clear explanations of datasets and identify key questions they can answer.
- Deliver end-to-end data science solutions using Python and Streamlit.

Behaviors and Rules:
1) When a dataset is selected or uploaded, present 2-3 key analytical questions it can answer, then guide the user step by step.
2) End-to-End Analysis Workflow:
   a) Data Cleaning: Outline specific preprocessing steps (handling missing values, encoding variables, removing duplicates).
   b) Data Analysis: Propose analytical techniques (regression, clustering, time-series, etc.) suitable for the chosen dataset.
   c) Insights Generation: Describe how to extract valuable findings and communicate them effectively.
   d) Automation and Visualization: Always generate ready-to-run Streamlit dashboard code using Plotly charts inside Streamlit (st.plotly_chart). Structure the app with st.sidebar for filters, st.tabs or st.columns for layout, and clear section headers using st.title/st.header. Each code block should be a complete, self-contained Streamlit app the user can run with: streamlit run app.py
3) METRICS RULE — ALWAYS REQUIRED, NO EXCEPTIONS: Every Streamlit dashboard you generate MUST include a metrics section — regardless of whether it uses tabs, pages, or a single-page layout. Skipping metrics is never acceptable. Follow these rules precisely:
   - ALWAYS start the dashboard (and the top of every tab if st.tabs is used) with a metrics section — minimum 3 metric cards.
   - NEVER output a Streamlit code block without at least one metrics section.
   - Every metric card MUST be defined as a Python dict with EXACTLY these four keys:
       m = {"title": "...", "value": "...", "delta": "...", "card_type": "..."}
   - "title": short label describing what is measured (e.g. "Total Revenue", "Avg Session Duration").
   - "value": the computed or representative result (e.g. "$1.2M", "87%", "4.3 min").
   - "delta": change vs. prior period, always with explicit sign (e.g. "+12%", "-3.4%", "+120 units").
   - "card_type": must be exactly one of: "success", "warning", "error", "info".
       Use "success" for positive results, "error" for declining/bad values, "warning" for needs-attention,
       "info" for the most important KPI, "info" for neutral context metrics.
   - Render each metric with: st.metric(label=m["title"], value=m["value"], delta=m["delta"])
   - Show card_type visibly below each metric with: st.caption(f"Type: {m['card_type'].upper()}")
   - Required boilerplate — use this exact structure every time:
       st.subheader("Key Metrics")
       metrics = [
           {"title": "Total Sales",  "value": "$2.4M",  "delta": "+18%",  "card_type": "success"},
           {"title": "Churn Rate",   "value": "5.2%",   "delta": "+1.1%", "card_type": "error"},
           {"title": "Active Users", "value": "14,302", "delta": "+320",  "card_type": "info"},
       ]
       cols = st.columns(len(metrics))
       for col, m in zip(cols, metrics):
           with col:
               st.metric(label=m["title"], value=m["value"], delta=m["delta"])
               st.caption(f"Type: {m['card_type'].upper()}")
   - Adapt titles and values to the actual dataset. Use realistic estimates if exact values cannot be computed. Never omit the block.
4) CHART TYPES — WHITELIST & RECOMMENDATIONS:
   Only use Plotly chart types from the following approved whitelist. Do NOT use any chart type outside this list:

   APPROVED WHITELIST (Plotly Express / Graph Objects):
   - px.line / go.Scatter          → Line Chart
   - px.bar / go.Bar               → Bar Chart (vertical or horizontal)
   - px.scatter / go.Scatter       → Scatter Plot
   - px.area                       → Area Chart
   - px.histogram / go.Histogram   → Histogram
   - px.box / go.Box               → Box Plot
   - px.violin / go.Violin         → Violin Plot
   - px.pie / go.Pie               → Pie Chart
   - px.funnel / go.Funnel         → Funnel Chart
   - px.heatmap / go.Heatmap       → Heatmap
   - px.treemap                    → Treemap
   - px.scatter_mapbox             → Geo Scatter Map (only when location data is present)
   - go.Candlestick                → Candlestick Chart (only for OHLCV financial data)
   - go.Indicator                  → Gauge / KPI Indicator

   RECOMMENDED CHART PER ANALYSIS TYPE (prefer these mappings when applicable):
   - Time-Series / Trend Analysis  → px.line, px.area
   - Distribution / Spread         → px.histogram, px.box, px.violin
   - Comparison / Ranking          → px.bar (horizontal preferred for many categories)
   - Correlation / Relationship    → px.scatter, px.heatmap
   - Composition / Part-of-Whole   → px.pie, px.treemap
   - Funnel / Conversion           → px.funnel
   - Financial / OHLCV             → go.Candlestick, px.line
   - Geospatial                    → px.scatter_mapbox
   - KPI / Single-value Highlight  → go.Indicator
   - Clustering / Multi-dimension  → px.scatter (with color encoding), px.heatmap

   Always choose the recommended chart type first. Only deviate if the data structure genuinely requires it, and only using another whitelisted type. Never use unlisted chart types even if Plotly supports them.

5) Always provide Python code snippets where relevant — practical, copy-paste ready examples.
6) Use practical and concise language accessible to non-experts.
7) Focus on feasibility and actionable business or research outcomes.
8) Maintain a professional, expert yet accessible tone — like a seasoned data scientist explaining to a collaborator.
9) Always steer toward concrete results and solutions.`;

const DATASETS = [
  { id: "sales", name: "Sales & Revenue", industry: "Retail", color: "#6366f1", description: "Monthly sales records across regions, products, and customer segments.", techniques: ["Time-Series Forecasting", "Segmentation", "Trend Analysis"] },
  { id: "health", name: "Patient Health Records", industry: "Healthcare", color: "#ef4444", description: "Anonymized patient data including vitals, diagnoses, and outcomes.", techniques: ["Classification", "Correlation Analysis", "Outlier Detection"] },
  { id: "stocks", name: "Stock Market Prices", industry: "Finance", color: "#10b981", description: "Historical OHLCV data for multiple equities across different market sectors.", techniques: ["Time-Series Analysis", "Volatility Modeling", "Moving Averages"] },
  { id: "churn", name: "Customer Churn", industry: "Telecom", color: "#f59e0b", description: "Customer usage data, service plans, and churn labels for a telecom provider.", techniques: ["Logistic Regression", "Clustering", "Feature Importance"] },
  { id: "climate", name: "Climate & Weather", industry: "Environmental", color: "#3b82f6", description: "Multi-decade weather observations including temperature, precipitation, and wind.", techniques: ["Seasonal Decomposition", "Anomaly Detection", "Forecasting"] },
  { id: "ecommerce", name: "E-commerce Clickstream", industry: "Web Analytics", color: "#8b5cf6", description: "User session logs, page events, cart actions, and conversion data.", techniques: ["Funnel Analysis", "Cohort Analysis", "Behavioral Clustering"] }
];

function renderMarkdown(text) {
  if (typeof text != "string") {
    text = String(text ?? "");
  }
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`\n]+)`/g, '<code style="background:#0f172a;padding:2px 6px;border-radius:4px;font-size:0.85em;color:#a5f3fc">$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre style="background:#0f172a;padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0;font-size:0.8em;border:1px solid #1e293b"><code style="color:#a5f3fc;white-space:pre">$1</code></pre>')
    .replace(/\n/g, "<br/>");
}

export default function App() {
  const [tab, setTab] = useState("choose");
  const [selected, setSelected] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "**Hello!** I am your Lead Data Analyst. Choose a pre-loaded dataset from the panel, or upload your own CSV file. I will guide you through the full analysis and generate a ready-to-run Streamlit dashboard." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const sendToAPI = async (msgs) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", { // Calls your own server
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: [
            ...msgs
              .filter(m => m.role !== "system")
              .map(m => ({ role: m.role, content: m.content }))
          ]
        })
      });
      const data = await res.json();
      console.log("API response:", JSON.stringify(data, null, 2));
      // Adjusted to handle standard API response structure
      const reply =
        data?.choices?.[0]?.message?.content ||
        data?.content?.[0]?.text || "Sorry, I could not process that.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please check your connection." }]);
    }
    setLoading(false);
  };

  const selectDataset = (ds) => {
    if (loading) return;
    setSelected(ds);
    setUploadedFile(null);
    setUploadedData(null);
    const userMsg = { role: "user", content: `I have selected the ${ds.name} dataset (${ds.industry}). Description: ${ds.description}. Please start the analysis workflow and immediately generate a complete, ready-to-run Streamlit dashboard. The dashboard MUST include: (1) a metrics section with at least 3 cards — each with title, value, delta, and card_type fields, (2) relevant Plotly charts from the approved whitelist. Do not defer the dashboard code to a later step — include the full code block in this response.` };
    const updated = [...messages, userMsg];
    setMessages(updated);
    sendToAPI(updated);
  };

  const handleParsed = (name, data, fields) => {
    setUploadedData({ name, rows: data.length, columns: fields });
    setSelected({ name });
    const sample = JSON.stringify(data.slice(0, 3));
    const userMsg = { role: "user", content: `I uploaded a dataset called ${name}. Rows: ${data.length}. Columns (${fields.length}): ${fields.join(", ")}. Sample: ${sample}. Please start the analysis workflow and immediately generate a complete, ready-to-run Streamlit dashboard. The dashboard MUST include: (1) a metrics section with at least 3 cards — each with title, value, delta, and card_type fields, (2) relevant Plotly charts from the approved whitelist. Do not defer the dashboard code to a later step — include the full code block in this response.` };
    const updated = [...messages, userMsg];
    setMessages(updated);
    sendToAPI(updated);
  };

  const handleFile = (file) => {
    if (!file) return;
    setUploadedFile(file);
    Papa.parse(file, {
      header: true, dynamicTyping: true, skipEmptyLines: true,
      complete: (r) => handleParsed(file.name, r.data, r.meta.fields || [])
    });
  };

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    sendToAPI(updated);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0f1e", color: "#e2e8f0", fontFamily: "system-ui,sans-serif", overflow: "hidden" }}>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:4px}
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 290, background: "#0d1526", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 14px 12px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 8, padding: 6, fontSize: 16 }}>📊</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>AI Data Analyst</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>Powered by Claude</div>
            </div>
          </div>
          <div style={{ display: "flex", background: "#111827", borderRadius: 8, padding: 2 }}>
            {["choose", "upload"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: tab === t ? "#1e293b" : "transparent", color: tab === t ? "#e2e8f0" : "#64748b" }}>
                {t === "choose" ? "📋 Datasets" : "⬆ Upload"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
          {tab === "choose" ? (
            <>
              <div style={{ fontSize: 11, color: "#64748b", padding: "8px 4px 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Select a Dataset</div>
              {DATASETS.map(ds => (
                <div key={ds.id} onClick={() => selectDataset(ds)} style={{ padding: 12, borderRadius: 10, marginBottom: 8, cursor: "pointer", border: `1px solid ${selected?.id === ds.id ? ds.color : "#1e293b"}`, background: selected?.id === ds.id ? ds.color + "18" : "#111827" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: selected?.id === ds.id ? ds.color : "#e2e8f0", marginBottom: 2 }}>{ds.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{ds.industry}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {ds.techniques.map(t => <span key={t} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: ds.color + "22", color: ds.color }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div style={{ fontSize: 11, color: "#64748b", padding: "8px 4px 10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Upload CSV</div>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                style={{ border: `2px dashed ${dragging ? "#6366f1" : "#1e293b"}`, borderRadius: 12, padding: 24, textAlign: "center", cursor: "pointer", background: dragging ? "#6366f118" : "#111827" }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>Drag and drop or click</div>
                <div style={{ fontSize: 11, color: "#4b5563" }}>CSV files supported</div>
                <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
              </div>
              {uploadedFile && (
                <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: 12, marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: "#e2e8f0" }}>📄 {uploadedFile.name}</div>
                  {uploadedData && <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{uploadedData.rows} rows · {uploadedData.columns?.length} columns</div>}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: 10, background: "#0d1526" }}>
          <div style={{ background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: 8, padding: 6, fontSize: 16 }}>🤖</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Lead Data Analyst</div>
            <div style={{ fontSize: 11, color: "#10b981" }}>● Online · Streamlit output</div>
          </div>
          {selected && (
            <div style={{ marginLeft: "auto", background: "#111827", border: "1px solid #1e293b", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "#94a3b8" }}>
              🗄 {selected.name}
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 16, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: m.role === "user" ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "linear-gradient(135deg,#10b981,#059669)" }}>
                {m.role === "user" ? "👤" : "🤖"}
              </div>
              <div
                style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: m.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px", background: m.role === "user" ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "#1e293b", fontSize: 13.5, lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
              />
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: "linear-gradient(135deg,#10b981,#059669)" }}>🤖</div>
              <div style={{ background: "#1e293b", borderRadius: "4px 12px 12px 12px", padding: "12px 16px", display: "flex", gap: 6, alignItems: "center" }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: "12px 16px", borderTop: "1px solid #1e293b", display: "flex", gap: 8, background: "#0d1526" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder={selected ? "Ask a follow-up question..." : "Select a dataset to start..."}
            disabled={loading}
            style={{ flex: 1, background: "#111827", border: "1px solid #1e293b", borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 13.5, outline: "none" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{ background: input.trim() && !loading ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#1e293b", border: "none", borderRadius: 10, padding: "10px 16px", cursor: input.trim() && !loading ? "pointer" : "default", color: input.trim() && !loading ? "#fff" : "#4b5563", fontSize: 16 }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
