"use client";

import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>{isLogin ? "Entrar" : "Registrar"}</h1>
      {isLogin ? (
        <LoginForm />
      ) : (
        <RegisterForm onSuccess={() => setIsLogin(true)} />
      )}
      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          marginTop: "1rem",
          background: "none",
          border: "none",
          color: "#0070f3",
          cursor: "pointer",
        }}
      >
        {isLogin ? "Ainda não tem conta? Registre-se" : "Já tem conta? Faça login"}
      </button>
    </div>
  );
}
