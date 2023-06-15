import { Footer } from "./components/footer"
import { Header } from "./components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  )
}
