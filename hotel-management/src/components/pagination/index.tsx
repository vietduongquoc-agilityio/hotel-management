import { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          size="sm"
          colorScheme={currentPage === i ? "blue" : "gray"}
          onClick={() => handlePageClick(i)}
          variant={currentPage === i ? "solid" : "outline"}
          mx={1} // Adds some margin between the buttons
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <HStack spacing={4} justify="center" mt={4}>
      <Button
        size="sm"
        colorScheme="gray"
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
      >
        &lt; Previous
      </Button>
      <HStack>{renderPageNumbers()}</HStack>
      <Button
        size="sm"
        colorScheme="gray"
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
      >
        Next &gt;
      </Button>
    </HStack>
  );
};

export default Pagination;
