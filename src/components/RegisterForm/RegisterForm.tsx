"use client";

import { useState } from "react";
import api from "../../lib/api";
import styles from "./RegisterForm.module.css";

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/register", { name, email, password });
      console.log("Registro OK:", res.data);

      onSuccess(); 
    } catch (error: any) {
      console.error("Erro no registro:", error);
      const msg = error?.response?.data?.error || "Erro ao registrar. Tente novamente.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
