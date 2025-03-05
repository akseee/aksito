import { FC } from "react";
import styles from "./pagination.module.css";
import { Button } from "@ui";
import clsx from "clsx";

type TPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export const Pagination: FC<TPaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const maxVisiblePages = 5;

  let firstPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let lastPage = firstPage + maxVisiblePages - 1;

  if (lastPage > totalPages) {
    lastPage = totalPages;
    firstPage = Math.max(1, lastPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index
  );

  return (
    <div className={styles.pagination}>
      <Button
        extraClass={styles.sides}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        начало
      </Button>
      <div className={styles.links}>
        <span className={clsx(!(firstPage > 1) && styles.invis)}>...</span>
        {pageNumbers.map((page) => (
          <Button
            disabled={currentPage === page}
            key={page}
            onClick={() => onPageChange(page)}
            extraClass={styles.page}
          >
            {page}
          </Button>
        ))}
        {
          <span className={clsx(!(lastPage < totalPages) && styles.invis)}>
            ...
          </span>
        }
      </div>

      <Button
        extraClass={styles.sides}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        конец
      </Button>
    </div>
  );
};
