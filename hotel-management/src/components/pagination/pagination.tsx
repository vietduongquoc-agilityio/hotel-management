import React, { useState } from "react";
import Button from "../button";
import "./index.css";

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
    for (let i = 1; i <= 7; i++) {
      pageNumbers.push(
        <Button
          key={i}
          className={`page-btn ${currentPage === i ? "active" : ""}`}
          label={i.toString()}
          backgroundColor={currentPage === i ? "#f0f1f3" : "#ffffff"}
          color={currentPage === i ? "#1366d9" : "#667085"}
          handleClick={() => handlePageClick(i)}
          borderRadius={8}
          fontSize="14px"
          fontWeight="500"
          border="none"
        />
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <Button
        className="prev-btn"
        label="< Previous"
        backgroundColor="#ffffff"
        color="#667085"
        handleClick={handlePrevious}
        borderRadius={8}
        fontSize="14px"
        fontWeight="500"
        disabled={currentPage === 1}
        border="1px solid #667085"
      />
      <div className="wrap-page-btn">{renderPageNumbers()}</div>
      <Button
        className="next-btn"
        label="Next >"
        backgroundColor="#ffffff"
        color="#667085"
        handleClick={handleNext}
        borderRadius={8}
        fontSize="14px"
        fontWeight="500"
        disabled={currentPage === totalPages}
        border="1px solid #667085"
      />
    </div>
  );
};

export default Pagination;
