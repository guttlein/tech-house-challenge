import Navbar from "../components/Navbar";
import TabNavBar from "@/components/Tabs";

export default function RootLayout() {
  return (
    <>
      {/* Elementos fijos y comunes entre todas las vistas. NavBar y el Navegador por Tabs */}
      <Navbar />
      <TabNavBar />
    </>
  );
}
