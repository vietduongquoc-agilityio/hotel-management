import React, { memo } from "react";
import { Select, Box } from "@chakra-ui/react";

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = Number(event.target.value);
    onPageSizeChange(newSize);
  };

  return (
    <Box display="flex" textAlign="center" mt="3px" ml="10px">
      <Select
        width="55px"
        height="35px"
        mt="2px"
        cursor="pointer"
        value={pageSize}
        onChange={handlePageSizeChange}
        size="sm"
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={8}>8</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </Select>
    </Box>
  );
};

export default memo(PageSizeSelector);
