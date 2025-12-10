"use client";

import Link from "next/link";
import { useAuth } from "../../context/authContext";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  console.log("Usuário logado:", user);

  return (
    <header className={styles.header}>
      <h1>
        <span>&lt;</span><Link href="/">Algoritmo Humano</Link><span>/&gt;</span>
      </h1>
      {user ? (
        <div className={styles.userArea}>
          <Link href="/my-courses" className={styles.userName}>
            {user.name}
          </Link>
          <button onClick={logout} className={styles.logout}>
            Sair
          </button>
        </div>
      ) : (
        <Link href="/login" className={styles.login}>
          Login
        </Link>
      )}
    </header>
  );
}
