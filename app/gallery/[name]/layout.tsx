export default function DetailedGalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div id="modal-root" />
    </>
  );
}
