import { Inter } from "next/font/google"
import type React from "react" // Import React
 
const inter = Inter({ subsets: ["latin"] })
 
export const metadata = {
  title: "My Next.js App",
  description: "Created to resolve build issues",
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="en">
<body className={inter.className}>{children}</body>
</html>
  )
}