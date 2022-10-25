import React from "react";
import Link from "next/link";
import style from "./Pagination.module.scss";

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  prevGenerator,
  nextGenerator,
}) => {
  const nextLink = nextGenerator(pagination.current);
  const prevLink = prevGenerator(pagination.current);
  return (pagination.hasNext || pagination.hasPrevious) ? (
    <div className={style.root}>
      {pagination.hasPrevious && (
        <span>
          <Link href={prevLink}>« Trước</Link>
        </span>
      )}
      <span>{pagination.current}</span>
      {pagination.hasNext && (
        <span>
          <Link href={nextLink}>Tiếp »</Link>
        </span>
      )}
    </div>
  ) : null;
};

export interface PaginationProps {
  prevGenerator: (curr: number) => string;
  nextGenerator: (curr: number) => string;
  pagination: {
    hasPrevious: boolean;
    hasNext: boolean;
    current: number;
  };
}
