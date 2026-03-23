import "./globals.css";

export const metadata = {
    title: "AI Data Analyst",
    description: "Your Data, Explained Clearly",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen text-white bg-gradient-to-b from-[#0A0F1F] to-[#0F1A3A] overflow-y-auto">
                {/* Page content */}
                <div className="relative z-40">
                    {children}
                </div>

            </body>
        </html>
    );
}
