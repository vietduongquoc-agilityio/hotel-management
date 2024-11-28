import { HStack, VStack } from "@chakra-ui/react";

// Components
import Button from "../Button";

interface paginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  pageCount: number;
}

const Pagination: React.FC<paginationProps> = ({
  currentPage,
  setCurrentPage,
  pageCount,
}) => {
  const visibleRange = 5;

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - Math.floor(visibleRange / 2), 1);
    const endPage = Math.min(startPage + visibleRange - 1, pageCount);

    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key="first"
          onClick={() => handlePageClick(1)}
          text="1"
          variant={currentPage === 1 ? "surface" : "outline"}
          buttonType="surface"
          sx={currentPage === 1 ? { bg: "blue.100", color: "blue.500" } : {}}
          borderRadius="5px"
        />
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="dots-start">...</span>);
      }
    }

    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          text={`${i}`}
          variant={currentPage === i ? "surface" : "outline"}
          buttonType="surface"
          sx={currentPage === i ? { bg: "blue.100", color: "blue.500" } : {}}
          borderRadius="5px"
        />
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        pageNumbers.push(<span key="dots-end">...</span>);
      }
      pageNumbers.push(
        <Button
          key={pageCount}
          onClick={() => handlePageClick(pageCount)}
          text={`${pageCount}`}
          variant={currentPage === pageCount ? "surface" : "outline"}
          buttonType="surface"
          sx={
            currentPage === pageCount
              ? { bg: "blue.100", color: "blue.500" }
              : {}
          }
          borderRadius="5px"
        />
      );
    }

    return pageNumbers;
  };

  return (
    <VStack spacing={4} w="100%">
      <HStack
        justifyContent="space-between"
        spacing={4}
        w="100%"
        maxW="1020px"
        padding="0 25px"
        mt="40px"
      >
        <Button
          onClick={handlePrevious}
          isDisabled={currentPage === 1}
          text="< Previous"
          buttonType="secondary"
        />
        <HStack>{renderPageNumbers()}</HStack>
        <Button
          onClick={handleNext}
          isDisabled={currentPage === pageCount}
          text="Next >"
          buttonType="secondary"
        />
      </HStack>
    </VStack>
  );
};

export default Pagination;
