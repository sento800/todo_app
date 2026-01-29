import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface TaskListPaginationProps {
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}

const TaskListPagination = ({
  page,
  handlePrev,
  handleNext,
  totalPages,
  handlePageChange,
}: TaskListPaginationProps) => {
  const generatePages = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page < 4) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page > totalPages - 3) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const paginationShow = generatePages();
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              className={cn(
                "pointer",
                page === 1 && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
          <PaginationItem>
            {paginationShow.map((pageNum, index) => {
              if (pageNum === "...") {
                return <PaginationEllipsis key={index} />;
              } else {
                return (
                  <PaginationLink
                    key={index}
                    onClick={() => handlePageChange(pageNum as number)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                );
              }
            })}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={cn(
                "pointer",
                page === totalPages && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
