"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { Course } from "../types/course";
import CourseCard from "../components/CourseCard/CourseCard";
import styles from "./styles/Home.module.css";

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/courses/public/catalog?page=1&limit=10")
      .then((res) => setCourses(res.data.courses))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      api
        .get("/courses/public/catalog?page=1&limit=10")
        .then((res) => setCourses(res.data.courses))
        .catch((error) => console.error(error));
      return;
    }

    const delay = setTimeout(() => {
      api
        .get(`/courses/public/search?title=${search}`)
        .then((res) => setCourses(res.data))
        .catch((error) => console.error(error));
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Pesquisar cursos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      {courses.length === 0 ? (
        <p>Não existem cursos ativos.</p>
      ) : (
        <ul className={styles.list}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      )}
    </div>
  );
}
