/**
 * Loads Google Fonts used by the Signature Generator typed mode.
 * Include once per route that renders {@link SignatureGeneratorTool} typed previews.
 */
export function SignatureGoogleFonts() {
  const href =
    "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Great+Vibes&family=Allura&family=Alex+Brush&family=Caveat:wght@400;700&family=Satisfy&display=swap";
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={href} />
    </>
  );
}
