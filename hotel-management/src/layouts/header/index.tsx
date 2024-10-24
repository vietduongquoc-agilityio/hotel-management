import { useState, memo } from "react";
import { Box, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export interface HeaderProps {
  placeholder?: string;
}

function Header({ placeholder = "Search for rooms and offers" }: HeaderProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box as="header" className="header-container" mb="30px">
      <Box as="form" className="form-search">
        <InputGroup
          w="400px"
          h="40px"
          borderRadius={8}
        >
          <InputLeftAddon
            bg="grey.50"
            border="1px solid rgb(238, 240, 242);"
            children={<SearchIcon color="grey.500" />}
          />
          <Input
            bg="grey.50"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={placeholder}
            border="1px solid rgb(238, 240, 242)"
            borderRadius={4}
          />
        </InputGroup>
      </Box>
    </Box>
  );
}

export default memo(Header);
