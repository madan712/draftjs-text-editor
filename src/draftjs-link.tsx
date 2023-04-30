import { ContentBlock, ContentState, EditorState } from "draft-js";
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

const isLinkSelectedAtText = (editorState: EditorState): boolean => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const entity = block.getEntityAt(selection.getStartOffset());
    if (entity) {
      const entityInstance = contentState.getEntity(entity);
      return entityInstance.getType() === "LINK";
    }
  }
  return false;
};

const isLinkSelectedAtCursor = (editorState: EditorState): boolean => {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const entity = block.getEntityAt(selection.getStartOffset() - 1);
    if (entity) {
      const entityInstance = contentState.getEntity(entity);
      return entityInstance.getType() === "LINK";
    }
  }
  return false;
};

export const isLinkSelected = (editorState: EditorState): boolean => {
  return (
    isLinkSelectedAtCursor(editorState) || isLinkSelectedAtText(editorState)
  );
};
