"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/authContext";
import { Course } from "../../types/course";
import CourseCardEditable from "../../components/CourseCardEditable/CourseCardEditable";
import CourseModal from "../../components/CourseModal/CourseModal";
import styles from './page.module.css'

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCourses = () => {
    if (!user) return;
    api
      .get("/courses/my", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const handleDelete = async (id: number) => {
    await api.delete(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    fetchCourses();
  };

  return (
    <div className={styles.container}>
      <h2>Meus Cursos</h2>
      <button
        onClick={() => setShowModal(true)}
        className={styles.newCourse}
      >
        Adicionar novo curso
      </button>

      {courses.length === 0 ? (
        <p>Você ainda não criou nenhum curso.</p>
      ) : (
        <ul className={styles.list}>
          {courses.map((course) => (
            <CourseCardEditable
              key={course.id}
              course={course}
              onDelete={() => handleDelete(course.id)}
              onEdit={() => console.log("Editar curso", course.id)}
            />
          ))}
        </ul>
      )}

      {showModal && (
        <CourseModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchCourses();
          }}
        />
      )}
    </div>
  );
}
