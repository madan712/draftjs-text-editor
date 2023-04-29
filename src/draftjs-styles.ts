import styled from "styled-components";

export const ControlButton = styled.div`
  padding: 10px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  color: grey;
  outline: none;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? "#cccccc" : "#ffffff"};
  &:hover {
    background-color: #cccccc;
  }
`;

export const controlButton = (selected: boolean) => ({
  padding: "10px",
  border: "none",
  borderRadius: 0,
  cursor: "pointer",
  color: "#808080",
  outline: "none",
  backgroundColor: selected ? "#cccccc" : "#ffffff",
  "&:hover": {
    backgroundColor: "#cccccc",
  },
});

export const headerStyles: React.CSSProperties = {
  border: "2px solid #cccccc",
  borderBottom: "0px",
  display: "flex",
  flexDirection: "row",
};

export const controlStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  borderRight: "2px solid #cccccc",
};

export const editorStyles: React.CSSProperties = {
  border: "2px solid #cccccc",
  padding: "5px",
  overflow: "auto",
  flex: 1,
};
