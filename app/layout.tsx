import './globals.css'

export const metadata = {
  title: 'Plotly Chart Renderer',
  description: 'Interactive charts with Plotly.js and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
