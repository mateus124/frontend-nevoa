"use client";

import { useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/authContext";
import styles from './CourseModal.module.css';

export default function CourseModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post(
        "/courses",
        { title, description, duration },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      onSuccess();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erro ao criar curso.";
      setError(msg);
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <h3>Novo Curso</h3>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duração (horas)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
        <button type="submit">Criar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
        {error && <p className={styles.erro}>{error}</p>}
      </form>
    </div>
  );
}
