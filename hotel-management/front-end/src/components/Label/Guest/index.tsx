import Button from "@/components/Button";
import { Box, Select } from "@chakra-ui/react";

const LabelGuest = () => {
  return (
    <>
      <Box
        cursor="pointer"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        width="100%"
      >
        <Box display="flex" gap="10px">
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Name"
          ></Select>
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Stay"
          ></Select>
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Price"
          ></Select>
        </Box>
        <Button text={"Add Guest"} buttonType={"primary"}></Button>
      </Box>
    </>
  );
};

export default LabelGuest;
