import React from "react";
import Link from "next/link";
import style from "./Pagination.module.scss";

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  prefix = "/page",
}) => {
  return (
    <div className={style.root}>
      {pagination.hasPrevious && (
        <span>
          <Link href={`${prefix}/${pagination.current - 1}`}>« Trước</Link>
        </span>
      )}
      <span>{pagination.current}</span>
      {pagination.hasNext && (
        <span>
          <Link href={`${prefix}/${pagination.current + 1}`}>Tiếp »</Link>
        </span>
      )}
    </div>
  );
};

export interface PaginationProps {
  prefix?: string;
  pagination: {
    hasPrevious: boolean;
    hasNext: boolean;
    current: number;
  };
}
