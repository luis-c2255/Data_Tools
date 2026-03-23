module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/src/app/analysis/GuidedAnalysisTool.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.js [app-rsc] (ecmascript)");
;
;
;
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
3) Always provide Python code snippets where relevant — practical, copy-paste ready examples.
4) Use practical and concise language accessible to non-experts.
5) Focus on feasibility and actionable business or research outcomes.
6) Maintain a professional, expert yet accessible tone — like a seasoned data scientist explaining to a collaborator.
7) Always steer toward concrete results and solutions.`;
const DATASETS = [
    {
        id: "sales",
        name: "Sales & Revenue",
        industry: "Retail",
        color: "#6366f1",
        description: "Monthly sales records across regions, products, and customer segments.",
        techniques: [
            "Time-Series Forecasting",
            "Segmentation",
            "Trend Analysis"
        ]
    },
    {
        id: "health",
        name: "Patient Health Records",
        industry: "Healthcare",
        color: "#ef4444",
        description: "Anonymized patient data including vitals, diagnoses, and outcomes.",
        techniques: [
            "Classification",
            "Correlation Analysis",
            "Outlier Detection"
        ]
    },
    {
        id: "stocks",
        name: "Stock Market Prices",
        industry: "Finance",
        color: "#10b981",
        description: "Historical OHLCV data for multiple equities across different market sectors.",
        techniques: [
            "Time-Series Analysis",
            "Volatility Modeling",
            "Moving Averages"
        ]
    },
    {
        id: "churn",
        name: "Customer Churn",
        industry: "Telecom",
        color: "#f59e0b",
        description: "Customer usage data, service plans, and churn labels for a telecom provider.",
        techniques: [
            "Logistic Regression",
            "Clustering",
            "Feature Importance"
        ]
    },
    {
        id: "climate",
        name: "Climate & Weather",
        industry: "Environmental",
        color: "#3b82f6",
        description: "Multi-decade weather observations including temperature, precipitation, and wind.",
        techniques: [
            "Seasonal Decomposition",
            "Anomaly Detection",
            "Forecasting"
        ]
    },
    {
        id: "ecommerce",
        name: "E-commerce Clickstream",
        industry: "Web Analytics",
        color: "#8b5cf6",
        description: "User session logs, page events, cart actions, and conversion data.",
        techniques: [
            "Funnel Analysis",
            "Cohort Analysis",
            "Behavioral Clustering"
        ]
    }
];
function renderMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`([^`\n]+)`/g, '<code style="background:#0f172a;padding:2px 6px;border-radius:4px;font-size:0.85em;color:#a5f3fc">$1</code>').replace(/```[\w]*\n([\s\S]*?)```/g, '<pre style="background:#0f172a;padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0;font-size:0.8em;border:1px solid #1e293b"><code style="color:#a5f3fc;white-space:pre">$1</code></pre>').replace(/\n/g, "<br/>");
}
function App() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("choose");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadedFile, setUploadedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadedData, setUploadedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: "assistant",
            content: "**Hello!** I am your Lead Data Analyst. Choose a pre-loaded dataset from the panel, or upload your own CSV file. I will guide you through the full analysis and generate a ready-to-run Streamlit dashboard."
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])();
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages,
        loading
    ]);
    const sendToAPI = async (msgs)=>{
        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    system: SYSTEM_PROMPT,
                    messages: msgs.map((m)=>({
                            role: m.role,
                            content: m.content
                        }))
                })
            });
            const data = await res.json();
            // Adjusted to handle standard API response structure
            const reply = data.content?.[0]?.text || "Sorry, I could not process that.";
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: reply
                    }
                ]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "assistant",
                        content: "Something went wrong. Please check your connection."
                    }
                ]);
        }
        setLoading(false);
    };
    const selectDataset = (ds)=>{
        if (loading) return;
        setSelected(ds);
        setUploadedFile(null);
        setUploadedData(null);
        const userMsg = {
            role: "user",
            content: `I have selected the ${ds.name} dataset (${ds.industry}). Description: ${ds.description}. Please start the analysis workflow.`
        };
        const updated = [
            ...messages,
            userMsg
        ];
        setMessages(updated);
        sendToAPI(updated);
    };
    const handleParsed = (name, data, fields)=>{
        setUploadedData({
            name,
            rows: data.length,
            columns: fields
        });
        setSelected({
            name
        });
        const sample = JSON.stringify(data.slice(0, 3));
        const userMsg = {
            role: "user",
            content: `I uploaded a dataset called ${name}. Rows: ${data.length}. Columns (${fields.length}): ${fields.join(", ")}. Sample: ${sample}. Please start the analysis workflow.`
        };
        const updated = [
            ...messages,
            userMsg
        ];
        setMessages(updated);
        sendToAPI(updated);
    };
    const handleFile = (file)=>{
        if (!file) return;
        setUploadedFile(file);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (r)=>handleParsed(file.name, r.data, r.meta.fields || [])
        });
    };
    const sendMessage = ()=>{
        if (!input.trim() || loading) return;
        const userMsg = {
            role: "user",
            content: input.trim()
        };
        const updated = [
            ...messages,
            userMsg
        ];
        setMessages(updated);
        setInput("");
        sendToAPI(updated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh",
            background: "#0a0f1e",
            color: "#e2e8f0",
            fontFamily: "system-ui,sans-serif",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:4px}
      `
            }, void 0, false, {
                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 290,
                    background: "#0d1526",
                    borderRight: "1px solid #1e293b",
                    display: "flex",
                    flexDirection: "column"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "18px 14px 12px",
                            borderBottom: "1px solid #1e293b"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                            borderRadius: 8,
                                            padding: 6,
                                            fontSize: 16
                                        },
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700
                                                },
                                                children: "AI Data Analyst"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    color: "#64748b"
                                                },
                                                children: "Powered by Claude"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 132,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    background: "#111827",
                                    borderRadius: 8,
                                    padding: 2
                                },
                                children: [
                                    "choose",
                                    "upload"
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTab(t),
                                        style: {
                                            flex: 1,
                                            padding: "6px 0",
                                            borderRadius: 6,
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            background: tab === t ? "#1e293b" : "transparent",
                                            color: tab === t ? "#e2e8f0" : "#64748b"
                                        },
                                        children: t === "choose" ? "📋 Datasets" : "⬆ Upload"
                                    }, t, false, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "8px 10px"
                        },
                        children: tab === "choose" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 11,
                                        color: "#64748b",
                                        padding: "8px 4px 6px",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: 1
                                    },
                                    children: "Select a Dataset"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this),
                                DATASETS.map((ds)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>selectDataset(ds),
                                        style: {
                                            padding: 12,
                                            borderRadius: 10,
                                            marginBottom: 8,
                                            cursor: "pointer",
                                            border: `1px solid ${selected?.id === ds.id ? ds.color : "#1e293b"}`,
                                            background: selected?.id === ds.id ? ds.color + "18" : "#111827"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: selected?.id === ds.id ? ds.color : "#e2e8f0",
                                                    marginBottom: 2
                                                },
                                                children: ds.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    color: "#64748b",
                                                    marginBottom: 6
                                                },
                                                children: ds.industry
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 151,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 4
                                                },
                                                children: ds.techniques.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            padding: "2px 6px",
                                                            borderRadius: 4,
                                                            background: ds.color + "22",
                                                            color: ds.color
                                                        },
                                                        children: t
                                                    }, t, false, {
                                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 45
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 152,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, ds.id, true, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 11,
                                        color: "#64748b",
                                        padding: "8px 4px 10px",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: 1
                                    },
                                    children: "Upload CSV"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>fileRef.current.click(),
                                    onDragOver: (e)=>{
                                        e.preventDefault();
                                        setDragging(true);
                                    },
                                    onDragLeave: ()=>setDragging(false),
                                    onDrop: (e)=>{
                                        e.preventDefault();
                                        setDragging(false);
                                        handleFile(e.dataTransfer.files[0]);
                                    },
                                    style: {
                                        border: `2px dashed ${dragging ? "#6366f1" : "#1e293b"}`,
                                        borderRadius: 12,
                                        padding: 24,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        background: dragging ? "#6366f118" : "#111827"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 28,
                                                marginBottom: 8
                                            },
                                            children: "📂"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 13,
                                                color: "#94a3b8",
                                                marginBottom: 4
                                            },
                                            children: "Drag and drop or click"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 11,
                                                color: "#4b5563"
                                            },
                                            children: "CSV files supported"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: fileRef,
                                            type: "file",
                                            accept: ".csv",
                                            style: {
                                                display: "none"
                                            },
                                            onChange: (e)=>handleFile(e.target.files[0])
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this),
                                uploadedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "#111827",
                                        border: "1px solid #1e293b",
                                        borderRadius: 10,
                                        padding: 12,
                                        marginTop: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 12,
                                                color: "#e2e8f0"
                                            },
                                            children: [
                                                "📄 ",
                                                uploadedFile.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 175,
                                            columnNumber: 19
                                        }, this),
                                        uploadedData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 11,
                                                color: "#64748b",
                                                marginTop: 4
                                            },
                                            children: [
                                                uploadedData.rows,
                                                " rows · ",
                                                uploadedData.columns?.length,
                                                " columns"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 176,
                                            columnNumber: 36
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "14px 20px",
                            borderBottom: "1px solid #1e293b",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "#0d1526"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "linear-gradient(135deg,#10b981,#059669)",
                                    borderRadius: 8,
                                    padding: 6,
                                    fontSize: 16
                                },
                                children: "🤖"
                            }, void 0, false, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 700
                                        },
                                        children: "Lead Data Analyst"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 11,
                                            color: "#10b981"
                                        },
                                        children: "● Online · Streamlit output"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginLeft: "auto",
                                    background: "#111827",
                                    border: "1px solid #1e293b",
                                    borderRadius: 8,
                                    padding: "4px 10px",
                                    fontSize: 12,
                                    color: "#94a3b8"
                                },
                                children: [
                                    "🗄 ",
                                    selected.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "16px 20px"
                        },
                        children: [
                            messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 10,
                                        marginBottom: 16,
                                        flexDirection: m.role === "user" ? "row-reverse" : "row"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 32,
                                                height: 32,
                                                borderRadius: 8,
                                                flexShrink: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 16,
                                                background: m.role === "user" ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "linear-gradient(135deg,#10b981,#059669)"
                                            },
                                            children: m.role === "user" ? "👤" : "🤖"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                maxWidth: "75%",
                                                padding: "10px 14px",
                                                borderRadius: m.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                                                background: m.role === "user" ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "#1e293b",
                                                fontSize: 13.5,
                                                lineHeight: 1.6
                                            },
                                            dangerouslySetInnerHTML: {
                                                __html: renderMarkdown(m.content)
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 10,
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 32,
                                            height: 32,
                                            borderRadius: 8,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 16,
                                            background: "linear-gradient(135deg,#10b981,#059669)"
                                        },
                                        children: "🤖"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "#1e293b",
                                            borderRadius: "4px 12px 12px 12px",
                                            padding: "12px 16px",
                                            display: "flex",
                                            gap: 6,
                                            alignItems: "center"
                                        },
                                        children: [
                                            0,
                                            1,
                                            2
                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: "#6366f1",
                                                    animation: "bounce 1.2s infinite",
                                                    animationDelay: `${i * 0.2}s`
                                                }
                                            }, i, false, {
                                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 215,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: bottomRef
                            }, void 0, false, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "12px 16px",
                            borderTop: "1px solid #1e293b",
                            display: "flex",
                            gap: 8,
                            background: "#0d1526"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                onKeyDown: (e)=>e.key === "Enter" && !e.shiftKey && sendMessage(),
                                placeholder: selected ? "Ask a follow-up question..." : "Select a dataset to start...",
                                disabled: loading,
                                style: {
                                    flex: 1,
                                    background: "#111827",
                                    border: "1px solid #1e293b",
                                    borderRadius: 10,
                                    padding: "10px 14px",
                                    color: "#e2e8f0",
                                    fontSize: 13.5,
                                    outline: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: sendMessage,
                                disabled: !input.trim() || loading,
                                style: {
                                    background: input.trim() && !loading ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#1e293b",
                                    border: "none",
                                    borderRadius: 10,
                                    padding: "10px 16px",
                                    cursor: input.trim() && !loading ? "pointer" : "default",
                                    color: input.trim() && !loading ? "#fff" : "#4b5563",
                                    fontSize: 16
                                },
                                children: "➤"
                            }, void 0, false, {
                                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/analysis/GuidedAnalysisTool.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/analysis/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalysisPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// app/analysis/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$analysis$2f$GuidedAnalysisTool$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/analysis/GuidedAnalysisTool.tsx [app-rsc] (ecmascript)");
;
;
function AnalysisPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-950 text-white p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold mb-6",
                    children: "Guided Data Analysis"
                }, void 0, false, {
                    fileName: "[project]/src/app/analysis/page.tsx",
                    lineNumber: 8,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$analysis$2f$GuidedAnalysisTool$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/analysis/page.tsx",
                    lineNumber: 9,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/analysis/page.tsx",
            lineNumber: 7,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/analysis/page.tsx",
        lineNumber: 6,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/analysis/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/analysis/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__adaa1a41._.js.map