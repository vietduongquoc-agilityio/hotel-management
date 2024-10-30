import { HStack, VStack } from "@chakra-ui/react";
import Button from "../button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  pageCount,
}) => {
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
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          text={`${i}`}
          variant={currentPage === i ? "pagination" : "outline"}
          buttonType="paginationButton"
          sx={currentPage === i ? { bg: "blue.100", color: "blue.500" } : {}}
        />
      );
    }
    return pageNumbers;
  };

  return (
    <VStack spacing={4} align="center">
      <HStack justify="center" spacing={4}>
        <Button
          onClick={handlePrevious}
          isDisabled={currentPage === 1}
          text="< Previous"
          buttonType="nextButton"
        />
        <HStack>{renderPageNumbers()}</HStack>
        <Button
          onClick={handleNext}
          isDisabled={currentPage === pageCount}
          text="Next >"
          buttonType="nextButton"
        />
      </HStack>
    </VStack>
  );
};

export default Pagination;
