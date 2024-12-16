import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

interface PageSizeSelectorProps {
  onPageSizeChange: (newSize: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  onPageSizeChange,
}) => {
  const [pageSize, setPageSize] = useState<number>(10);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    onPageSizeChange(newSize);
  };

  return (
    <Select
      width="45px"
      height="35px" 
      mt="2px"
      cursor="pointer"
      value={pageSize}
      onChange={handlePageSizeChange}
      placeholder="Select page size"
      fontSize="sm"
    >
      <option value={3}>3</option>
      <option value={5}>5</option>
      <option value={8}>8</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
    </Select>
  );
};

export default PageSizeSelector;
