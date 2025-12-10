"use client";

import { useState } from "react";
import api from "../../lib/api";
import styles from "./LoginForm.module.css";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/login", { email, password });
      const { token } = res.data;

      const profileRes = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { id, name, email: userEmail } = profileRes.data;
      login({ id, name, email: userEmail, token });
      console.log("Login OK:", profileRes.data);

      router.push("/");
    } catch (error: any) {
      const msg = error?.response?.data?.error || "Email ou senha inválidos.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
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
      <button type="submit">Entrar</button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
