import type React from "react"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

            {/* Glassmorphic container */}
            <div className="relative z-10 w-full max-w-6xl mx-4">
                {children}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
    )
}
