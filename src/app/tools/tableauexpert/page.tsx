"use client";

import Link from "next/link";
import TableauExpertTool from "./TableauExpert";

export default function Page() {
    return (
        <div className="min-h-screen bg-navy text-white flex flex-col">
            <div className="fixed top-6 left-6 z-50">
                <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition shadow-lg text-white text-sm"
                >
                    ← Back to Dashboard
                </Link>
            </div>
            {/* The tool manages its own full-screen layout */}
            <div className="flex-1 mt-0">
                <TableauExpertTool />
            </div>
        </div>
    );
}