export default function DetailedGalleryLayout({
  children,
  ArtworkModal,
}: Readonly<{
  children: React.ReactNode;
  ArtworkModal: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {ArtworkModal}
      <div id="modal-root" />
    </>
  );
}
