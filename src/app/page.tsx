"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { Course } from "../types/course";
import CourseCard from "../components/CourseCard/CourseCard";
import styles from "./styles/Home.module.css";
import { RiArrowRightSLine, RiArrowLeftSLine } from "@remixicon/react";

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = (currentPage: number) => {
    api
      .get(`/courses/public/catalog?page=${currentPage}&limit=10`)
      .then((res) => {
        setCourses(res.data.courses);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  useEffect(() => {
    if (search.length === 0) {
      fetchCourses(page);
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

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

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
        <>
          <ul className={styles.list}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </ul>

          {search.length === 0 && (
            <div className={styles.pagination}>
              <button onClick={handlePrevPage} disabled={page === 1}>
                <RiArrowLeftSLine size={24} />
              </button>
              <span>{page}</span>
              <button onClick={handleNextPage} disabled={page === totalPages}>
                <RiArrowRightSLine size={24} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
