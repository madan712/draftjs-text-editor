import React, { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (selected: string) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  showLine?: boolean;
  showCopyIcon?: boolean;
  css?: React.CSSProperties;
}

const textareaCommonStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderColor: "#ccc",
  lineHeight: "16px",
  fontSize: "10px",
};

const textareaLinedStyle: React.CSSProperties = {
  backgroundImage: "url('http://i.imgur.com/2cOaJ.png')",
  backgroundAttachment: "local",
  backgroundRepeat: "no-repeat",
  paddingLeft: "35px",
  paddingTop: "10px",
};

const copyButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "2px",
  right: "2px",
  width: "24px",
  height: "24px",
  padding: "0",
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const CopyIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="24" height="24" stroke="none" fill="#000000" opacity="0" />
      <g transform="matrix(1 0 0 1 12 12)">
        <path
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(0,0,0)",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="translate(-12, -12)"
          d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

const RichTextarea = (props: Props) => {
  const textarea_ref = useRef<HTMLTextAreaElement>();
  const {
    showLine = true,
    showCopyIcon = true,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    value = "",
    placeholder = "",
    name = "",
    maxLength,
  } = props;

  useEffect(() => {
    if (autoFocus) {
      textarea_ref.current.focus();
    }
  });

  const onChange = (event: any) => {
    const input: string = event.target.value;
    props.onChange(input);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(props.value);
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        ...props.css,
      }}
    >
      <textarea
        style={
          showLine
            ? { ...textareaLinedStyle, ...textareaCommonStyle }
            : { ...textareaCommonStyle }
        }
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={onChange}
        value={value}
        ref={textarea_ref}
      />
      {showCopyIcon && (
        <button style={copyButtonStyle} onClick={copy}>
          <CopyIcon />
        </button>
      )}
    </div>
  );
};

export default RichTextarea;
