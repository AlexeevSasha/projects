import react from "react";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";
import { theme } from "../../styles/theme";
import { IconSearch } from "../../components/Icon/IconSearch";
import { useDebounce } from "../../hooks/useDebounce";
import { IconLoading } from "../../components/Icon/IconLoading";

interface AutoCompleteProps {
  iconColor?: string;
  inputStyle?: react.CSSProperties;
  optionsStyle?: react.CSSProperties;
  onLoadSearch: (searchText: string) => Promise<string[]>;
  defaultValue?: string;
  onChange: (value: string) => void;
  containerWidth?: string;
}
export const InputAutoComplete: FC<AutoCompleteProps> = ({
  inputStyle,
  optionsStyle,
  containerWidth,
  onLoadSearch,
  defaultValue = "",
  onChange,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [isFirstValue, setIsFirstValue] = useState<boolean>(true);
  const debounceText = useDebounce(defaultValue, 500);

  useEffect(() => {
    if (debounceText && !selectedText) {
      onLoadSearch(debounceText).then((r) => {
        setIsComponentVisible(true);
        setSuggestions(r || []);
        setIsSearching(false);
      });
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceText]);

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    isFirstValue && setIsFirstValue(false);
    onChange(e.target.value);
    if (e.target.value !== selectedText || !e.target.value) {
      setIsComponentVisible(true);
      setIsSearching(true);
      setSelectedText("");
    } else {
      setIsComponentVisible(false);
      setIsSearching(false);
    }
  };
  const handleMouseLeave = () => {
    setIsComponentVisible(false);
  };

  const onSuggestionSelected = (value: string) => {
    setSelectedText(value);
    setIsComponentVisible(false);
    onChange(value);
    setSuggestions([]);
  };

  return (
    <Container onMouseLeave={handleMouseLeave} width={containerWidth}>
      <div>
        <InputContainer>
          <Input
            name={"auto-complete"}
            id="input"
            autoComplete="off"
            value={defaultValue}
            onChange={onTextChanged}
            type={"text"}
            style={inputStyle}
            fullWidth
          />
          <span>
            <IconSearch />
          </span>
        </InputContainer>
      </div>
      <Cdiv />
      {isComponentVisible && !isFirstValue && (
        <AutoCompleteContainer style={optionsStyle}>
          {isSearching ? (
            <IconLoading />
          ) : !suggestions?.length ? (
            <TextMessage> {defaultValue?.length ? "Совпадений не найдено" : "Введите данные для поиска"}</TextMessage>
          ) : (
            suggestions.map((item: string, index) => (
              <AutoCompleteItem key={index} onClick={() => onSuggestionSelected(item)}>
                {item}
              </AutoCompleteItem>
            ))
          )}
        </AutoCompleteContainer>
      )}
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width ?? "100%"};
`;

const Cdiv = styled.div`
  opacity: 1;
  height: 10px;
  min-width: 220px;
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  border-radius: 5px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 1;
  width: 100%;
`;
const AutoCompleteContainer = styled.ul`
  position: absolute;
  padding: 5px 0;
  margin: 10px 0 0;
  list-style-type: none;
  min-width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  max-height: 280px;
  overflow-y: auto;
  z-index: 999999;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.optionContainerShadow};
`;

const AutoCompleteItem = styled.li`
  padding: 7.5px 15px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.green};
  }
  ,
`;
const TextMessage = styled.li`
  color: ${theme.colors.lightTeleGray};
  align-items: center;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  padding: 7.5px 15px;
`;
const InputContainer = styled.div<{ error?: boolean }>`
  display: flex;
  background: ${theme.colors.white};
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.03);

  svg {
    padding: 0 13px;
  }
  span {
    cursor: pointer;
  }

  border: ${(props) => (props.error ? `1px solid ${theme.colors.lightRed}` : "none")};
`;
