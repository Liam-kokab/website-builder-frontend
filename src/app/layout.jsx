import './globals.css'

export const metadata = {
  title: 'Mazi',
  description: 'Some description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  )
}
