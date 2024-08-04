import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { SidebarMenu } from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import useAuth from '@/hooks/useAuth'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'MedGPT ',
  description: 'MedGPT is a platform for stroke detection and medical support',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUser } = useAuth()
  const user = await getUser()

  return (
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'dark' }}
    >
      <body className="bg-background text-foreground">
        <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Toaster />
            <div className="flex">
              {user ? (
                <div className="hidden  sm:block">
                  <SidebarMenu />
                </div>
              ) : (
                <></>
              )}
              <main className="w-full p-4">{children}</main>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
