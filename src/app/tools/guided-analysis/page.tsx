"use client";

// app/analysis/page.tsx
import Link from "next/link";
import GuidedAnalysisTool from "./GuidedAnalysisTool";

export default function Page() {
    return (
        <div className="min-h-screen bg-navy text-white p-10 overflow-y-auto">
            <div className="mb-6">
                <Link
                    href="/dashboard"
                    className="fixed top-6 left-6 z-50 px-4 py-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition shadow-lg"
                >
                    ← Back to Dashboard
                </Link>
            </div>
            {/* Scrollable Tool Area */}
            <div className="max-h-[80vh] overflow-y-auto pr-2">
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy to-transparent" />
                <GuidedAnalysisTool />
            </div>
        </div>
    );
}