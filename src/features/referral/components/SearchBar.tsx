import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useIsDarkMode } from "../../../state/user/hooks";
import { isMobile } from "react-device-detect";

const InputContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.referralInputBg};
  border: 1.5px solid rgba(114, 191, 101, 0.5);
  border-radius: 8px;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 413px;
  }
  .icon-search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
    @media screen and (min-width: 768px) {
      margin-right: 20px;
    }
  }
`;
const Input = styled.input`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.primaryText3};
  padding: 11.5px 0px 11.5px 10px;
  border-radius: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.referralInputBg};
  @media screen and (min-width: 768px) {
    padding: 20px 32px;
    width: 385px;
    font-size: 17px;
  }
`;

type Props = {
  setSearchTerm: (state: string) => void;
};

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const darkMode = useIsDarkMode();

  const debounceSearchTerm = useCallback(
    debounce((searchTerm) => setSearchTerm(searchTerm), 1000),
    []
  );

  return (
    <InputContainer>
      <Input
        placeholder="Search Wallet"
        darkMode={darkMode}
        onChange={(event) => {
          const value = event.target.value;
          setState(value);
          debounceSearchTerm(value);
        }}
        value={state}
      />
      <div className="icon-search">
        {darkMode ? (
          <img
            src="./icons/search.svg"
            alt=""
            height={isMobile && 24}
            width={isMobile && 24}
          />
        ) : (
          <img
            src="./icons/search-light.svg"
            alt=""
            height={isMobile && 24}
            width={isMobile && 24}
          />
        )}
      </div>
    </InputContainer>
  );
};

export default SearchBar;
