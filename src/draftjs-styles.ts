import styled from "styled-components";

interface StyledProps {
  color?: string;
  selected?: boolean;
}

export const DsControlButton = styled.div<StyledProps>`
  padding: 10px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  color: grey;
  outline: none;
  background-color: ${(props: { selected?: boolean }) =>
    props.selected ? "#cccccc" : "#ffffff"};
  &:hover {
    background-color: ${(props: { color?: string }) => props.color};
  }
`;

export const DsHeader = styled.div<StyledProps>`
  border: 2px solid #cccccc;
  border-bottom: 0;
  display: flex;
  flex-direction: row;
`;

export const DsControl = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  border-right: 2px solid #cccccc;
`;

export const DsEditor = styled.div<StyledProps>`
  border: 2px solid #cccccc;
  padding: 5px;
  overflow: auto;
  flex: 1;
`;

export const DsContainer = styled.div<StyledProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
