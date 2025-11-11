import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PokemonPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const PAGE_GROUP_SIZE = 10
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE)

  const startPage = currentGroup * PAGE_GROUP_SIZE + 1
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages)

  const hasPrevGroup = startPage > 1
  const hasNextGroup = endPage < totalPages

  const prevGroupPage = startPage - PAGE_GROUP_SIZE
  const nextGroupPage = endPage + 1

  return (
    <Pagination>
      <PaginationContent>

        {/* 이전 그룹 */}
        <PaginationItem>
          <PaginationPrevious
            href={hasPrevGroup ? `/?page=${prevGroupPage}` : undefined}
            className={!hasPrevGroup ? "invisible" : ""}
          />
        </PaginationItem>

        {/* 페이지 번호들 */}
        {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
          const pageNum = startPage + i

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={`/?page=${pageNum}`}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* 다음 그룹 */}
        <PaginationItem>
          <PaginationNext
            href={hasNextGroup ? `/?page=${nextGroupPage}` : undefined}
            className={!hasNextGroup ? "invisible" : ""}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
