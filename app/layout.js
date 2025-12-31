export const metadata = {
  title: 'Newsbiz24',
  description: 'Latest News and Business Updates',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
