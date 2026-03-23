module.exports=[89475,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(72131),e=a.i(32860),f=a.i(70106);let g=(0,f.default)("chart-no-axes-column",[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]]),h=(0,f.default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),i=(0,f.default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),j=(0,f.default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),k=(0,f.default)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),l=(0,f.default)("code-xml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]),m=(0,f.default)("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]),n=(0,f.default)("sparkles",[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]]),o=(0,f.default)("rotate-ccw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]),p=[{id:"matplotlib",name:"Matplotlib",description:"The OG Python plotting library"},{id:"seaborn",name:"Seaborn",description:"Statistical data visualization"},{id:"plotly",name:"Plotly",description:"Interactive web-ready charts"},{id:"bokeh",name:"Bokeh",description:"Interactive browser-based plots"},{id:"altair",name:"Altair",description:"Declarative statistical charts"}],q={matplotlib:`import matplotlib.pyplot as plt

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
plt.show()`,seaborn:`import seaborn as sns
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
plt.show()`,plotly:`import plotly.graph_objects as go

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
fig.show()`,bokeh:`from bokeh.plotting import figure, show
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
show(p)`,altair:`import altair as alt
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
chart.show()`},r=["Change to a line chart","Change to a pie chart","Use a red/orange color palette","Add a legend","Make it horizontal","Add gridlines","Make the title larger","Sort bars descending"],s=({lib:a,selected:c,side:d,onClick:e})=>(0,b.jsxs)("button",{onClick:e,className:`flex flex-col items-start px-3 py-2 rounded-lg border-2 transition-all text-left w-full ${c?"source"===d?"border-indigo-500 bg-indigo-950 text-white":"border-emerald-500 bg-emerald-950 text-white":"border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500"}`,children:[(0,b.jsx)("span",{className:"font-bold text-sm",children:a.name}),(0,b.jsx)("span",{className:"text-xs text-gray-400 font-normal leading-tight",children:a.description})]}),t=({html:a})=>{let c=(0,d.useRef)(null);return(0,d.useEffect)(()=>{if(!c.current)return;let b=c.current.contentDocument;b.open(),b.write(a),b.close()},[a]),(0,b.jsx)("iframe",{ref:c,className:"w-full h-auto border-none bg-white",sandbox:"allow-scripts",title:"Chart Preview"})},u=({side:a,activeTab:c,hasCode:d,isPreviewing:e,previewSide:f,onTabChange:g})=>(0,b.jsxs)("div",{className:"flex items-center gap-1",children:[(0,b.jsxs)("button",{onClick:()=>g(a,"code"),className:`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors ${"code"===c?"bg-gray-700 text-white":"text-gray-400 hover:text-gray-200"}`,children:[(0,b.jsx)(l,{className:"w-3 h-3"})," Code"]}),(0,b.jsxs)("button",{onClick:()=>g(a,"preview"),disabled:!d||e&&f===a,className:`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${"preview"===c?"bg-gray-700 text-white":"text-gray-400 hover:text-gray-200"}`,children:[e&&f===a?(0,b.jsx)(h,{className:"w-3 h-3 animate-spin"}):(0,b.jsx)(k,{className:"w-3 h-3"}),"Preview"]})]});function v(){let[a,c]=(0,d.useState)("matplotlib"),[f,k]=(0,d.useState)("plotly"),[l,v]=(0,d.useState)(q.matplotlib),[w,x]=(0,d.useState)(""),[y,z]=(0,d.useState)(!1),[A,B]=(0,d.useState)(!1),[C,D]=(0,d.useState)(""),[E,F]=(0,d.useState)(""),[G,H]=(0,d.useState)(!1),[I,J]=(0,d.useState)(""),[K,L]=(0,d.useState)(""),[M,N]=(0,d.useState)(null),[O,P]=(0,d.useState)("code"),[Q,R]=(0,d.useState)("code"),[S,T]=(0,d.useState)("output"),[U,V]=(0,d.useState)(""),[W,X]=(0,d.useState)(!1),[Y,Z]=(0,d.useState)([]),$=(0,d.useRef)(null);(0,d.useEffect)(()=>{$.current?.scrollIntoView({behavior:"smooth"})},[Y]);let _=async(a,b=1500)=>{let c=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:b,messages:a})}),d=await c.json();return d.output?d.output.trim():(d?.choices?.[0]?.message?.content||"").trim()},aa=a=>{"source"===a?(J(""),P("code")):(L(""),R("code"))},ab=async()=>{if(!l.trim())return void D("Please enter some code to convert.");if(a===f)return void D("Source and target libraries must be different.");z(!0),D(""),x(""),F(""),aa("source"),aa("output"),Z([]);let b=p.find(b=>b.id===a).name,c=p.find(a=>a.id===f).name,d=`You are an expert Python data visualization developer. Convert the following ${b} chart code to ${c}.
Rules:
- Preserve chart type, data, labels, title, and styling as closely as possible.
- If an exact equivalent doesn't exist in ${c}, produce the closest alternative and briefly note what changed.
- Return ONLY a valid JSON object with two keys:
  "code": full converted Python code as a plain string (no markdown, no backticks),
  "notes": short plain-English string explaining differences, or "" if direct.
No extra text outside the JSON.

${b} code:
${l}`;try{let a=await _([{role:"user",content:d}]),b=JSON.parse(a.replace(/^```json\s*/i,"").replace(/```$/,"").trim());x(b.code||""),F(b.notes||"")}catch{D("Conversion failed. Please try again.")}finally{z(!1)}},ac=async b=>{let c="source"===b?l:w,d="source"===b?a:f,e=p.find(a=>a.id===d).name;if(!c.trim())return;B(!0),N(b),"source"===b?P("preview"):R("preview");let g=`Convert this ${e} Python chart code to a self-contained HTML file rendered with Plotly.js (https://cdn.plot.ly/plotly-2.26.0.min.js).
- Extract all data, labels, titles, colors, chart type.
- Dark theme: body bg #0f172a, paper/plot bg #1e293b, font color #e2e8f0.
- Chart fills full viewport (100vw \xd7 100vh), no body margin.
- Return ONLY raw HTML, no markdown, no backticks, no explanation.

Python code:
${c}`;try{let a=(await _([{role:"user",content:g}],2e3)).replace(/^```html\s*/i,"").replace(/```$/,"").trim();"source"===b?J(a):L(a)}catch{D("Preview generation failed."),"source"===b?P("code"):R("code")}finally{B(!1)}},ad=(a,b)=>{"preview"===b?("source"===a?I:K)?"source"===a?P("preview"):R("preview"):ac(a):"source"===a?P("code"):R("code")},ae=async b=>{let c=(b||U).trim();if(!c)return;let d="source"===S?l:w,e="source"===S?a:f,g=p.find(a=>a.id===e).name;if(!d.trim())return void D(`No ${S} code to edit yet.`);let h={role:"user",content:c,side:S};Z(a=>[...a,h]),V(""),X(!0),D("");let i=Y.filter(a=>a.side===S).map(a=>({role:"assistant"===a.role?"assistant":"user",content:a.content})),j=`You are an expert Python ${g} developer. The user wants to modify a chart. Always return ONLY a valid JSON object with two keys: "code" (updated Python code, plain string, no markdown) and "reply" (short friendly confirmation of what you changed). No extra text.`,k=[{role:"user",content:`${j}

Current ${g} code:
${d}`},{role:"assistant",content:'{"code":"...","reply":"Ready to make changes!"}'},...i,{role:"user",content:c}];try{let a=await _(k,2e3),b=JSON.parse(a.replace(/^```json\s*/i,"").replace(/```$/,"").trim()),c=b.code||d,e=b.reply||"Done!";"source"===S?(v(c),aa("source")):(x(c),aa("output")),Z(a=>[...a,{role:"assistant",content:e,side:S}])}catch{Z(a=>[...a,{role:"assistant",content:"Sorry, I couldn't apply that change. Please try again.",side:S}])}finally{X(!1)}},af=p.find(b=>b.id===a),ag=p.find(a=>a.id===f);return(0,b.jsxs)("div",{className:"min-h-0 bg-gray-950 text-white flex flex-col overflow-y-auto",children:[(0,b.jsxs)("div",{className:"bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-3",children:[(0,b.jsx)(g,{className:"w-7 h-7 text-indigo-400"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-xl font-bold leading-tight",children:"PlotVerter"}),(0,b.jsx)("p",{className:"text-xs text-gray-400",children:"Python Visualization Library Converter"})]})]}),(0,b.jsx)("div",{className:"flex-1 min-h-0 p-4 overflow-y-auto",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto flex flex-col gap-4 min-h-0",children:[(0,b.jsxs)("div",{className:"flex items-center gap-4 justify-center flex-wrap",children:[(0,b.jsxs)("div",{className:"flex flex-col gap-1.5 w-40",children:[(0,b.jsx)("p",{className:"text-xs font-semibold text-indigo-400 uppercase tracking-widest text-center",children:"From"}),p.map(d=>(0,b.jsx)(s,{lib:d,selected:a===d.id,side:"source",onClick:()=>{d.id===f&&k(a),c(d.id),v(q[d.id]),x(""),F(""),aa("source"),aa("output"),Z([])}},d.id))]}),(0,b.jsxs)("div",{className:"flex flex-col items-center gap-3",children:[(0,b.jsx)(e.ArrowRight,{className:"w-7 h-7 text-gray-600"}),(0,b.jsx)("button",{onClick:ab,disabled:y||a===f,className:"flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors",children:y?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{className:"w-4 h-4 animate-spin"})," Converting..."]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(g,{className:"w-4 h-4"})," Convert"]})})]}),(0,b.jsxs)("div",{className:"flex flex-col gap-1.5 w-40",children:[(0,b.jsx)("p",{className:"text-xs font-semibold text-emerald-400 uppercase tracking-widest text-center",children:"To"}),p.map(d=>(0,b.jsx)(s,{lib:d,selected:f===d.id,side:"target",onClick:()=>{d.id===a&&c(f),k(d.id),x(""),F(""),aa("output"),Z([])}},d.id))]})]}),C&&(0,b.jsx)("div",{className:"bg-red-950 border border-red-800 text-red-300 px-4 py-3 rounded-xl text-center text-sm",children:C}),E&&(0,b.jsxs)("div",{className:"bg-amber-950 border border-amber-800 text-amber-200 px-4 py-3 rounded-xl text-sm flex gap-2",children:[(0,b.jsx)("span",{className:"font-bold shrink-0",children:"⚠ Note:"}),(0,b.jsx)("span",{children:E})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0",children:[(0,b.jsxs)("div",{className:"bg-gray-900 rounded-xl overflow-y-auto border border-indigo-900/50 flex flex-col",style:{minHeight:340},children:[(0,b.jsxs)("div",{className:"flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700",children:[(0,b.jsxs)("span",{className:"text-sm font-semibold text-indigo-300",children:[af?.name," — Source"]}),(0,b.jsx)(u,{side:"source",activeTab:O,hasCode:!!l.trim(),isPreviewing:A,previewSide:M,onTabChange:ad})]}),(0,b.jsx)("div",{className:"flex-1 min-h-0 relative",children:"code"===O?(0,b.jsx)("textarea",{value:l,onChange:a=>{v(a.target.value),aa("source")},className:"w-full h-auto min-h-64 p-4 bg-gray-900 text-gray-100 font-mono text-xs resize-none outline-none leading-relaxed",placeholder:"Paste your chart code here...",spellCheck:!1}):(0,b.jsx)("div",{className:"w-full",style:{height:280},children:A&&"source"===M?(0,b.jsx)("div",{className:"flex items-center justify-center h-auto",children:(0,b.jsx)(h,{className:"w-8 h-8 animate-spin text-indigo-400"})}):I?(0,b.jsx)(t,{html:I}):null})})]}),(0,b.jsxs)("div",{className:"bg-gray-900 rounded-xl overflow-y-auto border border-emerald-900/50 flex flex-col",style:{minHeight:340},children:[(0,b.jsxs)("div",{className:"flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700",children:[(0,b.jsxs)("span",{className:"text-sm font-semibold text-emerald-300",children:[ag?.name," — Output"]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(u,{side:"output",activeTab:Q,hasCode:!!w.trim(),isPreviewing:A,previewSide:M,onTabChange:ad}),(0,b.jsx)("button",{onClick:()=>{w&&(navigator.clipboard.writeText(w),H(!0),setTimeout(()=>H(!1),2e3))},disabled:!w,className:"flex items-center gap-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors ml-1",children:G?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(j,{className:"w-3.5 h-3.5 text-green-400"})," Copied"]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i,{className:"w-3.5 h-3.5"})," Copy"]})})]})]}),(0,b.jsx)("div",{className:"flex-1 min-h-0 relative",children:"code"===Q?(0,b.jsxs)("div",{className:"relative h-auto",children:[(0,b.jsx)("textarea",{readOnly:!0,value:w,className:"w-full h-auto min-h-64 p-4 bg-gray-900 text-gray-100 font-mono text-xs resize-none outline-none leading-relaxed",placeholder:y?"Converting...":"Converted code will appear here...",spellCheck:!1}),y&&(0,b.jsx)("div",{className:"absolute inset-0 bg-gray-900/80 flex items-center justify-center",children:(0,b.jsx)(h,{className:"w-8 h-8 animate-spin text-indigo-400"})})]}):(0,b.jsx)("div",{className:"w-full",style:{height:280},children:A&&"output"===M?(0,b.jsx)("div",{className:"flex items-center justify-center h-auto",children:(0,b.jsx)(h,{className:"w-8 h-8 animate-spin text-emerald-400"})}):K?(0,b.jsx)(t,{html:K}):null})})]})]}),(0,b.jsxs)("div",{className:"bg-gray-900 rounded-xl border border-gray-700 overflow-hidden",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(n,{className:"w-4 h-4 text-violet-400"}),(0,b.jsx)("span",{className:"text-sm font-semibold text-violet-300",children:"Ask for changes"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("span",{className:"text-xs text-gray-400",children:"Editing:"}),(0,b.jsxs)("button",{onClick:()=>T("source"),className:`px-3 py-1 rounded text-xs font-medium transition-colors ${"source"===S?"bg-indigo-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:[af?.name," (source)"]}),(0,b.jsxs)("button",{onClick:()=>T("output"),disabled:!w,className:`px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${"output"===S?"bg-emerald-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:[ag?.name," (output)"]}),Y.length>0&&(0,b.jsx)("button",{onClick:()=>Z([]),className:"ml-1 text-gray-500 hover:text-gray-300 transition-colors",title:"Clear chat",children:(0,b.jsx)(o,{className:"w-3.5 h-3.5"})})]})]}),(0,b.jsx)("div",{className:"px-4 pt-3 flex flex-wrap gap-2",children:r.map(a=>(0,b.jsx)("button",{onClick:()=>ae(a),disabled:W,className:"px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-violet-500 text-gray-300 hover:text-white rounded-full text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed",children:a},a))}),Y.length>0&&(0,b.jsxs)("div",{className:"mx-4 mt-3 max-h-48 overflow-y-auto flex flex-col gap-2 pr-1",children:[Y.map((a,c)=>(0,b.jsx)("div",{className:`flex gap-2 ${"user"===a.role?"justify-end":"justify-start"}`,children:(0,b.jsxs)("div",{className:`max-w-xs px-3 py-2 rounded-xl text-xs leading-relaxed ${"user"===a.role?"source"===a.side?"bg-indigo-700 text-white":"bg-emerald-700 text-white":"bg-gray-700 text-gray-200"}`,children:["assistant"===a.role&&(0,b.jsx)("span",{className:"font-semibold text-violet-300 block mb-0.5",children:"✦ Claude"}),a.content]})},c)),W&&(0,b.jsx)("div",{className:"flex justify-start",children:(0,b.jsxs)("div",{className:"bg-gray-700 text-gray-300 px-3 py-2 rounded-xl text-xs flex items-center gap-1.5",children:[(0,b.jsx)(h,{className:"w-3 h-3 animate-spin"})," Applying changes…"]})}),(0,b.jsx)("div",{ref:$})]}),(0,b.jsxs)("div",{className:"p-4 flex gap-2",children:[(0,b.jsx)("input",{value:U,onChange:a=>V(a.target.value),onKeyDown:a=>{"Enter"!==a.key||a.shiftKey||(a.preventDefault(),ae())},disabled:W,placeholder:`Describe a change to the ${"source"===S?af?.name+" source":ag?.name+" output"} chart…`,className:"flex-1 px-4 py-2.5 bg-gray-800 border border-gray-600 focus:border-violet-500 text-gray-100 rounded-xl text-sm outline-none placeholder-gray-500 transition-colors disabled:opacity-50"}),(0,b.jsx)("button",{onClick:()=>ae(),disabled:!U.trim()||W,className:"flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors",children:W?(0,b.jsx)(h,{className:"w-4 h-4 animate-spin"}):(0,b.jsx)(m,{className:"w-4 h-4"})})]})]}),(0,b.jsx)("p",{className:"text-center text-gray-600 text-xs pb-1",children:"PlotVerter uses Claude AI. Previews are browser approximations — always test your Python code locally."})]})})]})}a.s(["default",0,function(){return(0,b.jsxs)("div",{className:"min-h-screen bg-navy text-white flex flex-col p-10",children:[(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(c.default,{href:"/dashboard",className:"inline-block px-4 py-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition shadow-lg",children:"← Back to Dashboard"})}),(0,b.jsx)("div",{className:"flex-1 min-h-0 overflow-y-auto",children:(0,b.jsx)(v,{})})]})}],89475)}];

//# sourceMappingURL=src_app_tools_plotverter_page_tsx_0.puo1n._.js.map