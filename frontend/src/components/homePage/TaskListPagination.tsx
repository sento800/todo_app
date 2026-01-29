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
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page < 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page > totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }
    return pages;
  };

  const paginationShow = generatePages();
  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
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
              onClick={page === totalPages ? undefined : handleNext}
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
