import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthInitializer } from "@/components/auth-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EYEA Admin Dashboard",
  description: "Admin dashboard for EYEA organization",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthInitializer />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
