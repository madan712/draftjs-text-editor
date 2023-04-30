import styled from "styled-components";

interface StyledProps {
  selected?: boolean;
  color?: string;
}

export const DsControlButton = styled.div<StyledProps>`
  padding: 10px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  color: ${(props: StyledProps) => (props.selected ? "#ffffff" : "#808080")};
  outline: none;
  background-color: ${(props: StyledProps) =>
    props.selected ? (props.color ? props.color : "#808080") : "#ffffff"};
  &:hover {
    background-color: ${(props: StyledProps) =>
      props.color ? props.color : "#D3D3D3"};
    color: #ffffff;
  }
`;

export const DsHeader = styled.div<StyledProps>`
  border: 2px solid
    ${(props: StyledProps) => (props.color ? props.color : "#808080")};
  border-bottom: 0;
  display: flex;
  flex-direction: row;
`;

export const DsControl = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  border-right: 2px solid
    ${(props: StyledProps) => (props.color ? props.color : "#808080")};
`;

export const DsEditor = styled.div<StyledProps>`
  border: 2px solid
    ${(props: StyledProps) => (props.color ? props.color : "#808080")};
  padding: 5px;
  overflow: auto;
  flex: 1;
`;

export const DsContainer = styled.div<StyledProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
