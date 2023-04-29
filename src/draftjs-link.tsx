import { ContentBlock, ContentState } from "draft-js";
import React, { ReactNode } from "react";

interface LinkProps {
  contentState: ContentState;
  entityKey: string;
  children: ReactNode;
}

export const Link = (props: LinkProps) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: "#3b5998", textDecoration: "underline" }}>
      {props.children}
    </a>
  );
};

export const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};
