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
          buttonType="pagination"
          sx={currentPage === i ? { bg: "blue.100", color: "blue.500" } : {}}
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
          buttonType="disabled"
        />
        <HStack>{renderPageNumbers()}</HStack>
        <Button
          onClick={handleNext}
          isDisabled={currentPage === pageCount}
          text="Next >"
          buttonType="disabled"
        />
      </HStack>
    </VStack>
  );
};

export default Pagination;
