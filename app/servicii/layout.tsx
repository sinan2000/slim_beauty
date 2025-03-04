export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="pt-[80px] md:pt-[96px]">
      {children}
    </div>
  );
}
