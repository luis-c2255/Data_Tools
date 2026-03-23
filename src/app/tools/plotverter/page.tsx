"use client";

// app/plotverter/page.tsx
import Link from "next/link";
import PlotVerter from "./PlotVerter";

export default function Page() {
    return (
        <div className="min-h-screen bg-navy text-white flex flex-col p-10">
            <div className="mb-6">
                <Link
                    href="/dashboard"
                    className="inline-block px-4 py-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition shadow-lg"
                >
                    ← Back to Dashboard
                </Link>
            </div>
            {/* SCROLL FIX: Layer 2 */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <PlotVerter />
            </div>
        </div>
    );
}