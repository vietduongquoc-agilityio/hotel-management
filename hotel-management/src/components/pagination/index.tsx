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
          _hover={{
            bg: "blue.100",
            border: "1px solid #1570ef",
            color: "blue.500",
          }}
          border="1px solid #ffffff"
          key={i}
          size="sm"
          h="40px"
          w="40px"
          color="grey.400"
          onClick={() => handlePageClick(i)}
          variant={currentPage === i ? "solids" : "outline"}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <HStack
      padding="13px 24px"
      justifyContent={"space-between"}
      spacing={4}
      justify="center"
      mt={4}
      fontSize="12px"
      fontWeight="400"
    >
      <Button
        border="1px solid #667085"
        borderRadius="8px"
        size="md"
        bg="white.200"
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
        color="grey.500"
        _hover={{
          bg: "blue.100",
          border: "1px solid #1570ef",
          color: "blue.500",
        }}
        w="90px"
        h="36px"
      >
        &lt; Previous
      </Button>
      <HStack>{renderPageNumbers()}</HStack>
      <Button
        size="md"
        bg="white.200"
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
        border="1px solid #667085"
        borderRadius="8px"
        color="grey.500"
        _hover={{
          bg: "blue.100",
          border: "1px solid #1570ef",
          color: "blue.500",
        }}
        w="84px"
        h="36px"
      >
        Next &gt;
      </Button>
    </HStack>
  );
};

export default Pagination;
