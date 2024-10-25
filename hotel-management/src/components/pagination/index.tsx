import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import Button from "../button";

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
          onClick={() => handlePageClick(i)}
          text={`${i}`}
          variant={currentPage === i ? "pagination" : "outline"}
          buttonType={"paginationButton"}
        ></Button>
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
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
        text={"< Previous"}
        buttonType={"nextButton"}
      />
      <HStack>{renderPageNumbers()}</HStack>
      <Button
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
        text={"Next >"}
        buttonType={"nextButton"}
      />
    </HStack>
  );
};

export default Pagination;
