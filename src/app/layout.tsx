import "./globals.css";
import { Poppins } from "next/font/google";
import styles from "./styles/Layout.module.css";
import { AuthProvider } from "../context/authContext";
import Header from "../components/Header/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Algoritmo Humano",
  description: "Catálogo de cursos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
