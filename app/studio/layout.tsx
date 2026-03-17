/* Sanity Studio uses its own isolated layout — site header and footer
   are intentionally excluded from this route segment. */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
