import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { getFooterData } from "../lib/api";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await getFooterData();
  return (
    <>
      <NavBar />

      <main className="min-h-screen">{children}</main>
      <Footer data={footerData} />
    </>
  );
}
