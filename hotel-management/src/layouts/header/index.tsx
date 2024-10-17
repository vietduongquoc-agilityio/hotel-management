import { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import "./index.css";
import Input from "../../components/input";

export interface HeaderProps {
  placeholder?: string;
  search?: string;
}

export default function Header({
  placeholder = "Search for rooms and offers",
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <header className="header-container">
      <form className="form-search" action="#" method="get">
        <div className="search-icon">
          <img src={searchIcon} alt="search" className="search-icon" />
        </div>
        <Input
          className="search-input"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={placeholder}
          label=""
          size="md"
          border="none"
          borderRadius={4}
        />
      </form>
    </header>
  );
}
