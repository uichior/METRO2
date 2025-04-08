import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/common/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarNavigation } from "@/components/common/sidebar-navigation"
import { SwipeSidebar } from "@/components/common/swipe-sidebar"

const inter = Inter({ subsets: ["latin"] })
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "METRO - 製造業向け生産管理システム",
  description: "最先端の製造業向け生産管理システムで生産性を向上させましょう",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <SwipeSidebar>
              <div className="flex h-screen w-full overflow-hidden">
                <SidebarNavigation />
                <div className="flex-1 overflow-auto">
                  {children}
                </div>
              </div>
            </SwipeSidebar>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}