import { useState, memo } from "react";
import { Box, Input, Image } from "@chakra-ui/react";
import searchIcon from "../../assets/icons/search.svg";

export interface HeaderProps {
  placeholder?: string;
}

function Header({ placeholder = "Search for rooms and offers" }: HeaderProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box as="header" className="header-container">
      <Box as="form" className="form-search">
        <Image src={searchIcon} alt="search" className="search-icon" />
        <Input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={placeholder}
          borderRadius={4}
          backgroundColor="#f0f1f3"
        />
      </Box>
    </Box>
  );
}

export default memo(Header);
