import { useState, type FC } from "react";
import { styled } from "styled-components";

const DivWrapper = styled.div`
  width: 60%;
  display: inline-block;
  vertical-align: top;
  margin-top: 7px;
  position: relative;
  text-align: center;

  @media screen and (max-width: 950px) {
    width: 50%;
  }

  @media screen and (max-width: 720px) {
    width: 80%;
  }

  @media screen and (max-width: 330px) {
    width: 75%;
  }

  & input {
    margin: 0;
    width: 80%;
    padding: 8px 0 8px 6%;
    border-radius: 6px;
    border: 2px solid white;

    @media screen and (max-width: 950px) {
      padding-left: 10%;
    }

    @media screen and (max-width: 370px) {
      padding-left: 10%;
      width: 70%;
    }
  }

  & i {
    position: absolute;
    left: 8%;
    top: 9px;

    @media screen and (max-width: 370px) {
      left: 12%;
    }
  }
`;
type Props = {
  onSearch: (searchTerm: string) => void;
};

const Search: FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      onSearch(searchTerm);
    }
  };

  return (
    <DivWrapper>
      <i className="fa fa-search" />
      <input
        type="text"
        id="text"
        name="search"
        placeholder="Buscar productos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </DivWrapper>
  );
};

export default Search;
