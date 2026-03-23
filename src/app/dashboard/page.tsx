"use client";

import Link from "next/link";



export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-navy text-white p-10 flex items-center justify-center">
            <div className="w-full max-w-5xl">

                {/* Glass Header */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl mb-10 transition-all duration-300 hover:bg-white/15 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                    <h1 className="text-4xl font-bold mb-3 text-center">Welcome to the App</h1>
                    <p className="text-lg text-gray-200 text-center">
                        Choose a tool to get started.
                    </p>
                </div>
                {/* Tool Buttons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Guided Analysis */}
                    <Link
                        href="/tools/guided-analysis"
                        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(0,150,255,0.4)] hover:border-blue-400/40"
                    >
                        <h2 className="text-2xl font-semibold text-center mb-2">Guided Data Analysis</h2>
                        <p className="text-gray-200 text-center">
                            Upload datasets, ask questions, and generate insights with AI-guided step-by-step analysis and Streamlit code output.
                        </p>
                    </Link>
                    {/* PlotVerter */}
                    <Link
                        href="/tools/plotverter"
                        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(180,0,255,0.4)] hover:border-purple-400/40"
                    >
                        <h2 className="text-2xl font-semibold text-center mb-2">PlotVerter</h2>
                        <p className="text-gray-200 text-center">
                            Convert Python visualization code between Matplotlib, Seaborn, Plotly, Bokeh, and Altair with live preview.
                        </p>
                    </Link>
                    {/* TableauExpert */}
                    <Link
                        href="/tools/tableauexpert"
                        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(0,255,200,0.4)] hover:border-teal-400/40"
                    >
                        <h2 className="text-2xl font-semibold text-center mb-2">TableauExpert</h2>
                        <p className="text-gray-200 text-center">
                            Upload CSV data, explore AI-generated insights, create interactive visualizations, and assemble an executive dashboard — guided step by step.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}