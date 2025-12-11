"use client";

import { useState, useEffect } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/authContext";
import { Course } from "../../types/course";
import styles from "./CourseModal.module.css";

export default function CourseModal({
  onClose,
  onSuccess,
  course,
}: {
  onClose: () => void;
  onSuccess: () => void;
  course?: Course;
}) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setDuration(course.duration);
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      let courseId = course?.id;

      if (course) {
        await api.put(
          `/courses/${course.id}`,
          { title, description, duration, status: true },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
      } else {
        const res = await api.post(
          "/courses",
          { title, description, duration, status: true },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
        courseId = res.data.id;
      }

      if (imageFile && courseId) {
        const formData = new FormData();
        formData.append("image", imageFile);

        await api.post(`/courses/${courseId}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onSuccess();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erro ao salvar curso.";
      setError(msg);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>{course ? "Editar Curso" : "Novo Curso"}</h3>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="desc">Descrição</label>
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="duracao">Duração (horas)</label>
        <input
          type="number"
          placeholder="Duração (horas)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
        <label htmlFor="file">Imagem</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        <button type="submit">{course ? "Salvar" : "Criar"}</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
        {error && <p className={styles.erro}>{error}</p>}
      </form>
    </div>
  );
}
