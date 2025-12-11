"use client";

import { Course } from "../../types/course";
import styles from './CourseCardEditable.module.css'
import { RiTimeLine, RiUserLine } from "@remixicon/react";

export default function CourseCardEditable({
  course,
  onDelete,
  onEdit,
}: {
  course: Course;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <li className={styles.card}>
      <div className={styles.imageContainer}>
        {course.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${course.image}`}
            alt={course.title}
            className={styles.image}
          />
        )}
      </div>

      <div>
        <div className={styles.content}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <div className={styles.meta}>
            <span><RiTimeLine/> {course.duration} horas</span>
            <span><RiUserLine/> {course.author.name}</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={onEdit} className={styles.edit}>
            Editar
          </button>
          <button onClick={onDelete} className={styles.delete}>
            Deletar
          </button>
        </div>
      </div>
    </li>
  );
}
