import "./globals.css";
import { Poppins } from "next/font/google";
import styles from "./styles/Layout.module.css"

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
        <header className={styles.header}>
          <h1><span>&lt;</span>Algoritmo Humano<span>/&gt;</span></h1>
          <a href="/login" className={styles.login}> Login </a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}