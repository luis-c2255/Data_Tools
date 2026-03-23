(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("choose");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadedFile, setUploadedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadedData, setUploadedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: "assistant",
            content: "**Hello!** I am your Lead Data Analyst. Choose a pre-loaded dataset from the panel, or upload your own CSV file. I will guide you through the full analysis and generate a ready-to-run Streamlit dashboard."
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["App.useEffect"], [
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parse(file, {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh",
            background: "#0a0f1e",
            color: "#e2e8f0",
            fontFamily: "system-ui,sans-serif",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:4px}
      `
            }, void 0, false, {
                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 290,
                    background: "#0d1526",
                    borderRight: "1px solid #1e293b",
                    display: "flex",
                    flexDirection: "column"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "18px 14px 12px",
                            borderBottom: "1px solid #1e293b"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                            borderRadius: 8,
                                            padding: 6,
                                            fontSize: 16
                                        },
                                        children: "📊"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700
                                                },
                                                children: "AI Data Analyst"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    color: "#64748b"
                                                },
                                                children: "Powered by Claude"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 132,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    background: "#111827",
                                    borderRadius: 8,
                                    padding: 2
                                },
                                children: [
                                    "choose",
                                    "upload"
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "8px 10px"
                        },
                        children: tab === "choose" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this),
                                DATASETS.map((ds)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: selected?.id === ds.id ? ds.color : "#e2e8f0",
                                                    marginBottom: 2
                                                },
                                                children: ds.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 11,
                                                    color: "#64748b",
                                                    marginBottom: 6
                                                },
                                                children: ds.industry
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 151,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 4
                                                },
                                                children: ds.techniques.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 10,
                                                            padding: "2px 6px",
                                                            borderRadius: 4,
                                                            background: ds.color + "22",
                                                            color: ds.color
                                                        },
                                                        children: t
                                                    }, t, false, {
                                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 45
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 152,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, ds.id, true, {
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 28,
                                                marginBottom: 8
                                            },
                                            children: "📂"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 13,
                                                color: "#94a3b8",
                                                marginBottom: 4
                                            },
                                            children: "Drag and drop or click"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 11,
                                                color: "#4b5563"
                                            },
                                            children: "CSV files supported"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: fileRef,
                                            type: "file",
                                            accept: ".csv",
                                            style: {
                                                display: "none"
                                            },
                                            onChange: (e)=>handleFile(e.target.files[0])
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this),
                                uploadedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "#111827",
                                        border: "1px solid #1e293b",
                                        borderRadius: 10,
                                        padding: 12,
                                        marginTop: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 12,
                                                color: "#e2e8f0"
                                            },
                                            children: [
                                                "📄 ",
                                                uploadedFile.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 175,
                                            columnNumber: 19
                                        }, this),
                                        uploadedData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 176,
                                            columnNumber: 36
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "14px 20px",
                            borderBottom: "1px solid #1e293b",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "#0d1526"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "linear-gradient(135deg,#10b981,#059669)",
                                    borderRadius: 8,
                                    padding: 6,
                                    fontSize: 16
                                },
                                children: "🤖"
                            }, void 0, false, {
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 700
                                        },
                                        children: "Lead Data Analyst"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 11,
                                            color: "#10b981"
                                        },
                                        children: "● Online · Streamlit output"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "16px 20px"
                        },
                        children: [
                            messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 10,
                                        marginBottom: 16,
                                        flexDirection: m.role === "user" ? "row-reverse" : "row"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this)),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 10,
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: "#6366f1",
                                                    animation: "bounce 1.2s infinite",
                                                    animationDelay: `${i * 0.2}s`
                                                }
                                            }, i, false, {
                                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                                lineNumber: 215,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: bottomRef
                            }, void 0, false, {
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "12px 16px",
                            borderTop: "1px solid #1e293b",
                            display: "flex",
                            gap: 8,
                            background: "#0d1526"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s(App, "0rI1cnH3JT8Mlpuq9Dkgfgcm4bM=");
_c = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/tools/guided-analysis/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalysisPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// app/analysis/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$tools$2f$guided$2d$analysis$2f$GuidedAnalysisTool$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/tools/guided-analysis/GuidedAnalysisTool.tsx [app-client] (ecmascript)");
"use client";
;
;
function AnalysisPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$tools$2f$guided$2d$analysis$2f$GuidedAnalysisTool$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/tools/guided-analysis/page.tsx",
        lineNumber: 7,
        columnNumber: 12
    }, this);
}
_c = AnalysisPage;
var _c;
__turbopack_context__.k.register(_c, "AnalysisPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/papaparse/papaparse.min.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/ ((e, t)=>{
    "function" == typeof define && define.amd ? ((r)=>r !== undefined && __turbopack_context__.v(r))(t()) : ("TURBOPACK compile-time truthy", 1) ? module.exports = t() : "TURBOPACK unreachable";
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function r() {
    var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {};
    var d, s = !n.document && !!n.postMessage, a = n.IS_PAPA_WORKER || !1, o = {}, h = 0, v = {};
    function u(e) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = {
            data: [],
            errors: [],
            meta: {}
        }, (function(e) {
            var t = b(e);
            t.chunkSize = parseInt(t.chunkSize), e.step || e.chunk || (t.chunkSize = null);
            this._handle = new i(t), (this._handle.streamer = this)._config = t;
        }).call(this, e), this.parseChunk = function(t, e) {
            var i = parseInt(this._config.skipFirstNLines) || 0;
            if (this.isFirstChunk && 0 < i) {
                let e = this._config.newline;
                e || (r = this._config.quoteChar || '"', e = this._handle.guessLineEndings(t, r)), t = [
                    ...t.split(e).slice(i)
                ].join(e);
            }
            this.isFirstChunk && U(this._config.beforeFirstChunk) && void 0 !== (r = this._config.beforeFirstChunk(t)) && (t = r), this.isFirstChunk = !1, this._halted = !1;
            var i = this._partialLine + t, r = (this._partialLine = "", this._handle.parse(i, this._baseIndex, !this._finished));
            if (!this._handle.paused() && !this._handle.aborted()) {
                t = r.meta.cursor, i = (this._finished || (this._partialLine = i.substring(t - this._baseIndex), this._baseIndex = t), r && r.data && (this._rowCount += r.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview);
                if (a) n.postMessage({
                    results: r,
                    workerId: v.WORKER_ID,
                    finished: i
                });
                else if (U(this._config.chunk) && !e) {
                    if (this._config.chunk(r, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
                    this._completeResults = r = void 0;
                }
                return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(r.data), this._completeResults.errors = this._completeResults.errors.concat(r.errors), this._completeResults.meta = r.meta), this._completed || !i || !U(this._config.complete) || r && r.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), i || r && r.meta.paused || this._nextChunk(), r;
            }
            this._halted = !0;
        }, this._sendError = function(e) {
            U(this._config.error) ? this._config.error(e) : a && this._config.error && n.postMessage({
                workerId: v.WORKER_ID,
                error: e,
                finished: !1
            });
        };
    }
    function f(e) {
        var r;
        (e = e || {}).chunkSize || (e.chunkSize = v.RemoteChunkSize), u.call(this, e), this._nextChunk = s ? function() {
            this._readChunk(), this._chunkLoaded();
        } : function() {
            this._readChunk();
        }, this.stream = function(e) {
            this._input = e, this._nextChunk();
        }, this._readChunk = function() {
            if (this._finished) this._chunkLoaded();
            else {
                if (r = new XMLHttpRequest, this._config.withCredentials && (r.withCredentials = this._config.withCredentials), s || (r.onload = y(this._chunkLoaded, this), r.onerror = y(this._chunkError, this)), r.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
                    var e, t = this._config.downloadRequestHeaders;
                    for(e in t)r.setRequestHeader(e, t[e]);
                }
                var i;
                this._config.chunkSize && (i = this._start + this._config.chunkSize - 1, r.setRequestHeader("Range", "bytes=" + this._start + "-" + i));
                try {
                    r.send(this._config.downloadRequestBody);
                } catch (e) {
                    this._chunkError(e.message);
                }
                s && 0 === r.status && this._chunkError();
            }
        }, this._chunkLoaded = function() {
            4 === r.readyState && (r.status < 200 || 400 <= r.status ? this._chunkError() : (this._start += this._config.chunkSize || r.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((e)=>null !== (e = e.getResponseHeader("Content-Range")) ? parseInt(e.substring(e.lastIndexOf("/") + 1)) : -1)(r), this.parseChunk(r.responseText)));
        }, this._chunkError = function(e) {
            e = r.statusText || e;
            this._sendError(new Error(e));
        };
    }
    function l(e) {
        (e = e || {}).chunkSize || (e.chunkSize = v.LocalChunkSize), u.call(this, e);
        var i, r, n = "undefined" != typeof FileReader;
        this.stream = function(e) {
            this._input = e, r = e.slice || e.webkitSlice || e.mozSlice, n ? ((i = new FileReader).onload = y(this._chunkLoaded, this), i.onerror = y(this._chunkError, this)) : i = new FileReaderSync, this._nextChunk();
        }, this._nextChunk = function() {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
            var e = this._input, t = (this._config.chunkSize && (t = Math.min(this._start + this._config.chunkSize, this._input.size), e = r.call(e, this._start, t)), i.readAsText(e, this._config.encoding));
            n || this._chunkLoaded({
                target: {
                    result: t
                }
            });
        }, this._chunkLoaded = function(e) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e.target.result);
        }, this._chunkError = function() {
            this._sendError(i.error);
        };
    }
    function c(e) {
        var i;
        u.call(this, e = e || {}), this.stream = function(e) {
            return i = e, this._nextChunk();
        }, this._nextChunk = function() {
            var e, t;
            if (!this._finished) return e = this._config.chunkSize, i = e ? (t = i.substring(0, e), i.substring(e)) : (t = i, ""), this._finished = !i, this.parseChunk(t);
        };
    }
    function p(e) {
        u.call(this, e = e || {});
        var t = [], i = !0, r = !1;
        this.pause = function() {
            u.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
            u.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(e) {
            this._input = e, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
            r && 1 === t.length && (this._finished = !0);
        }, this._nextChunk = function() {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i = !0;
        }, this._streamData = y(function(e) {
            try {
                t.push("string" == typeof e ? e : e.toString(this._config.encoding)), i && (i = !1, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e) {
                this._streamError(e);
            }
        }, this), this._streamError = y(function(e) {
            this._streamCleanUp(), this._sendError(e);
        }, this), this._streamEnd = y(function() {
            this._streamCleanUp(), r = !0, this._streamData("");
        }, this), this._streamCleanUp = y(function() {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
    }
    function i(m) {
        var n, s, a, t, o = Math.pow(2, 53), h = -o, u = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, d = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, i = this, r = 0, f = 0, l = !1, e = !1, c = [], p = {
            data: [],
            errors: [],
            meta: {}
        };
        function y(e) {
            return "greedy" === m.skipEmptyLines ? "" === e.join("").trim() : 1 === e.length && 0 === e[0].length;
        }
        function g() {
            if (p && a && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + v.DefaultDelimiter + "'"), a = !1), m.skipEmptyLines && (p.data = p.data.filter(function(e) {
                return !y(e);
            })), _()) {
                if (p) if (Array.isArray(p.data[0])) {
                    for(var e = 0; _() && e < p.data.length; e++)p.data[e].forEach(t);
                    p.data.splice(0, 1);
                } else p.data.forEach(t);
                function t(e, t) {
                    U(m.transformHeader) && (e = m.transformHeader(e, t)), c.push(e);
                }
            }
            function i(e, t) {
                for(var i = m.header ? {} : [], r = 0; r < e.length; r++){
                    var n = r, s = e[r], s = ((e, t)=>((e)=>(m.dynamicTypingFunction && void 0 === m.dynamicTyping[e] && (m.dynamicTyping[e] = m.dynamicTypingFunction(e)), !0 === (m.dynamicTyping[e] || m.dynamicTyping)))(e) ? "true" === t || "TRUE" === t || "false" !== t && "FALSE" !== t && (((e)=>{
                            if (u.test(e)) {
                                e = parseFloat(e);
                                if (h < e && e < o) return 1;
                            }
                        })(t) ? parseFloat(t) : d.test(t) ? new Date(t) : "" === t ? null : t) : t)(n = m.header ? r >= c.length ? "__parsed_extra" : c[r] : n, s = m.transform ? m.transform(s, n) : s);
                    "__parsed_extra" === n ? (i[n] = i[n] || [], i[n].push(s)) : i[n] = s;
                }
                return m.header && (r > c.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + c.length + " fields but parsed " + r, f + t) : r < c.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + c.length + " fields but parsed " + r, f + t)), i;
            }
            var r;
            p && (m.header || m.dynamicTyping || m.transform) && (r = 1, !p.data.length || Array.isArray(p.data[0]) ? (p.data = p.data.map(i), r = p.data.length) : p.data = i(p.data, 0), m.header && p.meta && (p.meta.fields = c), f += r);
        }
        function _() {
            return m.header && 0 === c.length;
        }
        function k(e, t, i, r) {
            e = {
                type: e,
                code: t,
                message: i
            };
            void 0 !== r && (e.row = r), p.errors.push(e);
        }
        U(m.step) && (t = m.step, m.step = function(e) {
            p = e, _() ? g() : (g(), 0 !== p.data.length && (r += e.data.length, m.preview && r > m.preview ? s.abort() : (p.data = p.data[0], t(p, i))));
        }), this.parse = function(e, t, i) {
            var r = m.quoteChar || '"', r = (m.newline || (m.newline = this.guessLineEndings(e, r)), a = !1, m.delimiter ? U(m.delimiter) && (m.delimiter = m.delimiter(e), p.meta.delimiter = m.delimiter) : ((r = ((e, t, i, r, n)=>{
                var s, a, o, h;
                n = n || [
                    ",",
                    "\t",
                    "|",
                    ";",
                    v.RECORD_SEP,
                    v.UNIT_SEP
                ];
                for(var u = 0; u < n.length; u++){
                    for(var d, f = n[u], l = 0, c = 0, p = 0, g = (o = void 0, new E({
                        comments: r,
                        delimiter: f,
                        newline: t,
                        preview: 10
                    }).parse(e)), _ = 0; _ < g.data.length; _++)i && y(g.data[_]) ? p++ : (d = g.data[_].length, c += d, void 0 === o ? o = d : 0 < d && (l += Math.abs(d - o), o = d));
                    0 < g.data.length && (c /= g.data.length - p), (void 0 === a || l <= a) && (void 0 === h || h < c) && 1.99 < c && (a = l, s = f, h = c);
                }
                return {
                    successful: !!(m.delimiter = s),
                    bestDelimiter: s
                };
            })(e, m.newline, m.skipEmptyLines, m.comments, m.delimitersToGuess)).successful ? m.delimiter = r.bestDelimiter : (a = !0, m.delimiter = v.DefaultDelimiter), p.meta.delimiter = m.delimiter), b(m));
            return m.preview && m.header && r.preview++, n = e, s = new E(r), p = s.parse(n, t, i), g(), l ? {
                meta: {
                    paused: !0
                }
            } : p || {
                meta: {
                    paused: !1
                }
            };
        }, this.paused = function() {
            return l;
        }, this.pause = function() {
            l = !0, s.abort(), n = U(m.chunk) ? "" : n.substring(s.getCharIndex());
        }, this.resume = function() {
            i.streamer._halted ? (l = !1, i.streamer.parseChunk(n, !0)) : setTimeout(i.resume, 3);
        }, this.aborted = function() {
            return e;
        }, this.abort = function() {
            e = !0, s.abort(), p.meta.aborted = !0, U(m.complete) && m.complete(p), n = "";
        }, this.guessLineEndings = function(e, t) {
            e = e.substring(0, 1048576);
            var t = new RegExp(P(t) + "([^]*?)" + P(t), "gm"), i = (e = e.replace(t, "")).split("\r"), t = e.split("\n"), e = 1 < t.length && t[0].length < i[0].length;
            if (1 === i.length || e) return "\n";
            for(var r = 0, n = 0; n < i.length; n++)"\n" === i[n][0] && r++;
            return r >= i.length / 2 ? "\r\n" : "\r";
        };
    }
    function P(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function E(C) {
        var S = (C = C || {}).delimiter, O = C.newline, x = C.comments, I = C.step, A = C.preview, T = C.fastMode, D = null, L = !1, F = null == C.quoteChar ? '"' : C.quoteChar, j = F;
        if (void 0 !== C.escapeChar && (j = C.escapeChar), ("string" != typeof S || -1 < v.BAD_DELIMITERS.indexOf(S)) && (S = ","), x === S) throw new Error("Comment character same as delimiter");
        !0 === x ? x = "#" : ("string" != typeof x || -1 < v.BAD_DELIMITERS.indexOf(x)) && (x = !1), "\n" !== O && "\r" !== O && "\r\n" !== O && (O = "\n");
        var z = 0, M = !1;
        this.parse = function(i, t, r) {
            if ("string" != typeof i) throw new Error("Input must be a string");
            var n = i.length, e = S.length, s = O.length, a = x.length, o = U(I), h = [], u = [], d = [], f = z = 0;
            if (!i) return w();
            if (T || !1 !== T && -1 === i.indexOf(F)) {
                for(var l = i.split(O), c = 0; c < l.length; c++){
                    if (d = l[c], z += d.length, c !== l.length - 1) z += O.length;
                    else if (r) return w();
                    if (!x || d.substring(0, a) !== x) {
                        if (o) {
                            if (h = [], k(d.split(S)), R(), M) return w();
                        } else k(d.split(S));
                        if (A && A <= c) return h = h.slice(0, A), w(!0);
                    }
                }
                return w();
            }
            for(var p = i.indexOf(S, z), g = i.indexOf(O, z), _ = new RegExp(P(j) + P(F), "g"), m = i.indexOf(F, z);;)if (i[z] === F) for(m = z, z++;;){
                if (-1 === (m = i.indexOf(F, m + 1))) return r || u.push({
                    type: "Quotes",
                    code: "MissingQuotes",
                    message: "Quoted field unterminated",
                    row: h.length,
                    index: z
                }), E();
                if (m === n - 1) return E(i.substring(z, m).replace(_, F));
                if (F === j && i[m + 1] === j) m++;
                else if (F === j || 0 === m || i[m - 1] !== j) {
                    -1 !== p && p < m + 1 && (p = i.indexOf(S, m + 1));
                    var y = v(-1 === (g = -1 !== g && g < m + 1 ? i.indexOf(O, m + 1) : g) ? p : Math.min(p, g));
                    if (i.substr(m + 1 + y, e) === S) {
                        d.push(i.substring(z, m).replace(_, F)), i[z = m + 1 + y + e] !== F && (m = i.indexOf(F, z)), p = i.indexOf(S, z), g = i.indexOf(O, z);
                        break;
                    }
                    y = v(g);
                    if (i.substring(m + 1 + y, m + 1 + y + s) === O) {
                        if (d.push(i.substring(z, m).replace(_, F)), b(m + 1 + y + s), p = i.indexOf(S, z), m = i.indexOf(F, z), o && (R(), M)) return w();
                        if (A && h.length >= A) return w(!0);
                        break;
                    }
                    u.push({
                        type: "Quotes",
                        code: "InvalidQuotes",
                        message: "Trailing quote on quoted field is malformed",
                        row: h.length,
                        index: z
                    }), m++;
                }
            }
            else if (x && 0 === d.length && i.substring(z, z + a) === x) {
                if (-1 === g) return w();
                z = g + s, g = i.indexOf(O, z), p = i.indexOf(S, z);
            } else if (-1 !== p && (p < g || -1 === g)) d.push(i.substring(z, p)), z = p + e, p = i.indexOf(S, z);
            else {
                if (-1 === g) break;
                if (d.push(i.substring(z, g)), b(g + s), o && (R(), M)) return w();
                if (A && h.length >= A) return w(!0);
            }
            return E();
            //TURBOPACK unreachable
            ;
            function k(e) {
                h.push(e), f = z;
            }
            function v(e) {
                var t = 0;
                return t = -1 !== e && (e = i.substring(m + 1, e)) && "" === e.trim() ? e.length : t;
            }
            function E(e) {
                return r || (void 0 === e && (e = i.substring(z)), d.push(e), z = n, k(d), o && R()), w();
            }
            function b(e) {
                z = e, k(d), d = [], g = i.indexOf(O, z);
            }
            function w(e) {
                if (C.header && !t && h.length && !L) {
                    var s = h[0], a = Object.create(null), o = new Set(s);
                    let n = !1;
                    for(let r = 0; r < s.length; r++){
                        let i = s[r];
                        if (a[i = U(C.transformHeader) ? C.transformHeader(i, r) : i]) {
                            let e, t = a[i];
                            for(; e = i + "_" + t, t++, o.has(e););
                            o.add(e), s[r] = e, a[i]++, n = !0, (D = null === D ? {} : D)[e] = i;
                        } else a[i] = 1, s[r] = i;
                        o.add(i);
                    }
                    n && console.warn("Duplicate headers found and renamed."), L = !0;
                }
                return {
                    data: h,
                    errors: u,
                    meta: {
                        delimiter: S,
                        linebreak: O,
                        aborted: M,
                        truncated: !!e,
                        cursor: f + (t || 0),
                        renamedHeaders: D
                    }
                };
            }
            function R() {
                I(w()), h = [], u = [];
            }
        }, this.abort = function() {
            M = !0;
        }, this.getCharIndex = function() {
            return z;
        };
    }
    function g(e) {
        var t = e.data, i = o[t.workerId], r = !1;
        if (t.error) i.userError(t.error, t.file);
        else if (t.results && t.results.data) {
            var n = {
                abort: function() {
                    r = !0, _(t.workerId, {
                        data: [],
                        errors: [],
                        meta: {
                            aborted: !0
                        }
                    });
                },
                pause: m,
                resume: m
            };
            if (U(i.userStep)) {
                for(var s = 0; s < t.results.data.length && (i.userStep({
                    data: t.results.data[s],
                    errors: t.results.errors,
                    meta: t.results.meta
                }, n), !r); s++);
                delete t.results;
            } else U(i.userChunk) && (i.userChunk(t.results, n, t.file), delete t.results);
        }
        t.finished && !r && _(t.workerId, t.results);
    }
    function _(e, t) {
        var i = o[e];
        U(i.userComplete) && i.userComplete(t), i.terminate(), delete o[e];
    }
    function m() {
        throw new Error("Not implemented.");
    }
    function b(e) {
        if ("object" != typeof e || null === e) return e;
        var t, i = Array.isArray(e) ? [] : {};
        for(t in e)i[t] = b(e[t]);
        return i;
    }
    function y(e, t) {
        return function() {
            e.apply(t, arguments);
        };
    }
    function U(e) {
        return "function" == typeof e;
    }
    return v.parse = function(e, t) {
        var i = (t = t || {}).dynamicTyping || !1;
        U(i) && (t.dynamicTypingFunction = i, i = {});
        if (t.dynamicTyping = i, t.transform = !!U(t.transform) && t.transform, !t.worker || !v.WORKERS_SUPPORTED) return i = null, v.NODE_STREAM_INPUT, "string" == typeof e ? (e = ((e)=>65279 !== e.charCodeAt(0) ? e : e.slice(1))(e), i = new (t.download ? f : c)(t)) : !0 === e.readable && U(e.read) && U(e.on) ? i = new p(t) : (n.File && e instanceof File || e instanceof Object) && (i = new l(t)), i.stream(e);
        (i = (()=>{
            var e;
            return !!v.WORKERS_SUPPORTED && (e = (()=>{
                var e = n.URL || n.webkitURL || null, t = r.toString();
                return v.BLOB_URL || (v.BLOB_URL = e.createObjectURL(new Blob([
                    "var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ",
                    "(",
                    t,
                    ")();"
                ], {
                    type: "text/javascript"
                })));
            })(), (e = new n.Worker(e)).onmessage = g, e.id = h++, o[e.id] = e);
        })()).userStep = t.step, i.userChunk = t.chunk, i.userComplete = t.complete, i.userError = t.error, t.step = U(t.step), t.chunk = U(t.chunk), t.complete = U(t.complete), t.error = U(t.error), delete t.worker, i.postMessage({
            input: e,
            config: t,
            workerId: i.id
        });
    }, v.unparse = function(e, t) {
        var n = !1, _ = !0, m = ",", y = "\r\n", s = '"', a = s + s, i = !1, r = null, o = !1, h = ((()=>{
            if ("object" == typeof t) {
                if ("string" != typeof t.delimiter || v.BAD_DELIMITERS.filter(function(e) {
                    return -1 !== t.delimiter.indexOf(e);
                }).length || (m = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (n = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i = t.skipEmptyLines), "string" == typeof t.newline && (y = t.newline), "string" == typeof t.quoteChar && (s = t.quoteChar), "boolean" == typeof t.header && (_ = t.header), Array.isArray(t.columns)) {
                    if (0 === t.columns.length) throw new Error("Option columns is empty");
                    r = t.columns;
                }
                void 0 !== t.escapeChar && (a = t.escapeChar + s), t.escapeFormulae instanceof RegExp ? o = t.escapeFormulae : "boolean" == typeof t.escapeFormulae && t.escapeFormulae && (o = /^[=+\-@\t\r].*$/);
            }
        })(), new RegExp(P(s), "g"));
        "string" == typeof e && (e = JSON.parse(e));
        if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0])) return u(null, e, i);
            if ("object" == typeof e[0]) return u(r || Object.keys(e[0]), e, i);
        } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [
            e.data
        ])), u(e.fields || [], e.data || [], i);
        throw new Error("Unable to serialize unrecognized input");
        function u(e, t, i) {
            var r = "", n = ("string" == typeof e && (e = JSON.parse(e)), "string" == typeof t && (t = JSON.parse(t)), Array.isArray(e) && 0 < e.length), s = !Array.isArray(t[0]);
            if (n && _) {
                for(var a = 0; a < e.length; a++)0 < a && (r += m), r += k(e[a], a);
                0 < t.length && (r += y);
            }
            for(var o = 0; o < t.length; o++){
                var h = (n ? e : t[o]).length, u = !1, d = n ? 0 === Object.keys(t[o]).length : 0 === t[o].length;
                if (i && !n && (u = "greedy" === i ? "" === t[o].join("").trim() : 1 === t[o].length && 0 === t[o][0].length), "greedy" === i && n) {
                    for(var f = [], l = 0; l < h; l++){
                        var c = s ? e[l] : l;
                        f.push(t[o][c]);
                    }
                    u = "" === f.join("").trim();
                }
                if (!u) {
                    for(var p = 0; p < h; p++){
                        0 < p && !d && (r += m);
                        var g = n && s ? e[p] : p;
                        r += k(t[o][g], p);
                    }
                    o < t.length - 1 && (!i || 0 < h && !d) && (r += y);
                }
            }
            return r;
        }
        function k(e, t) {
            var i, r;
            return null == e ? "" : e.constructor === Date ? JSON.stringify(e).slice(1, 25) : (r = !1, o && "string" == typeof e && o.test(e) && (e = "'" + e, r = !0), i = e.toString().replace(h, a), (r = r || !0 === n || "function" == typeof n && n(e, t) || Array.isArray(n) && n[t] || ((e, t)=>{
                for(var i = 0; i < t.length; i++)if (-1 < e.indexOf(t[i])) return !0;
                return !1;
            })(i, v.BAD_DELIMITERS) || -1 < i.indexOf(m) || " " === i.charAt(0) || " " === i.charAt(i.length - 1)) ? s + i + s : i);
        }
    }, v.RECORD_SEP = String.fromCharCode(30), v.UNIT_SEP = String.fromCharCode(31), v.BYTE_ORDER_MARK = "\ufeff", v.BAD_DELIMITERS = [
        "\r",
        "\n",
        '"',
        v.BYTE_ORDER_MARK
    ], v.WORKERS_SUPPORTED = !s && !!n.Worker, v.NODE_STREAM_INPUT = 1, v.LocalChunkSize = 10485760, v.RemoteChunkSize = 5242880, v.DefaultDelimiter = ",", v.Parser = E, v.ParserHandle = i, v.NetworkStreamer = f, v.FileStreamer = l, v.StringStreamer = c, v.ReadableStreamStreamer = p, n.jQuery && ((d = n.jQuery).fn.parse = function(o) {
        var i = o.config || {}, h = [];
        return this.each(function(e) {
            if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && n.FileReader) || !this.files || 0 === this.files.length) return !0;
            for(var t = 0; t < this.files.length; t++)h.push({
                file: this.files[t],
                inputElem: this,
                instanceConfig: d.extend({}, i)
            });
        }), e(), this;
        //TURBOPACK unreachable
        ;
        function e() {
            if (0 === h.length) U(o.complete) && o.complete();
            else {
                var e, t, i, r, n = h[0];
                if (U(o.before)) {
                    var s = o.before(n.file, n.inputElem);
                    if ("object" == typeof s) {
                        if ("abort" === s.action) return e = "AbortError", t = n.file, i = n.inputElem, r = s.reason, void (U(o.error) && o.error({
                            name: e
                        }, t, i, r));
                        if ("skip" === s.action) return void u();
                        "object" == typeof s.config && (n.instanceConfig = d.extend(n.instanceConfig, s.config));
                    } else if ("skip" === s) return void u();
                }
                var a = n.instanceConfig.complete;
                n.instanceConfig.complete = function(e) {
                    U(a) && a(e, n.file, n.inputElem), u();
                }, v.parse(n.file, n.instanceConfig);
            }
        }
        function u() {
            h.splice(0, 1), e();
        }
    }), a && (n.onmessage = function(e) {
        e = e.data;
        void 0 === v.WORKER_ID && e && (v.WORKER_ID = e.workerId);
        "string" == typeof e.input ? n.postMessage({
            workerId: v.WORKER_ID,
            results: v.parse(e.input, e.config),
            finished: !0
        }) : (n.File && e.input instanceof File || e.input instanceof Object) && (e = v.parse(e.input, e.config)) && n.postMessage({
            workerId: v.WORKER_ID,
            results: e,
            finished: !0
        });
    }), (f.prototype = Object.create(u.prototype)).constructor = f, (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(c.prototype)).constructor = c, (p.prototype = Object.create(u.prototype)).constructor = p, v;
});
}),
]);

//# sourceMappingURL=_1f23f27a._.js.map