import React, { useEffect, useRef } from "react";
import {
  CompositeDecorator,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";

import {
  ControlButton,
  editorStyles,
  headerStyles,
  controlStyle,
} from "./draftjs-styles";
import { FaLink } from "react-icons/fa";
import draftToHtml from "draftjs-to-html";
import { findLinkEntities, Link } from "./draftjs-link";
import { blockControls, inlineControls } from "./draftjs-constants";

interface DraftJsEditorProps {
  onChange: (selected: string) => void;
}

const DraftJsEditor = (props: DraftJsEditorProps) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(decorator)
  );

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef.current!.focus();
  }, []);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType: string) => {
    onEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const onLinkClick = (e: any) => {
    e.preventDefault();

    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    if (!selection.isCollapsed()) {
      const blockWithLinkAtBeginning = contentState.getBlockForKey(
        selection.getStartKey()
      );
      const linkKey = blockWithLinkAtBeginning.getEntityAt(
        selection.getStartOffset()
      );
      if (linkKey) {
        onEditorChange(RichUtils.toggleLink(editorState, selection, null));
      } else {
        const href = window.prompt("URL:");
        if (!href) {
          onEditorChange(RichUtils.toggleLink(editorState, selection, null));
          return "handled";
        }
        const contentWithEntity = contentState.createEntity("LINK", "MUTABLE", {
          url: href,
        });
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentWithEntity,
        });
        onEditorChange(
          RichUtils.toggleLink(newEditorState, selection, entityKey)
        );
      }
    }
  };

  const onEditorChange = (es: EditorState) => {
    setEditorState(es);

    const contentState = es.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);
    props.onChange(html);
  };

  const isLinkSelectedAtText = (): boolean => {
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

  const isLinkSelectedAtCursor = (): boolean => {
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

  const isLinkSelected = (): boolean => {
    return isLinkSelectedAtCursor() || isLinkSelectedAtText();
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={headerStyles}>
        <div style={controlStyle}>
          {inlineControls.map((control, index) => {
            const currentStyle = editorState.getCurrentInlineStyle();

            return (
              <ControlButton
                selected={currentStyle.has(control.name)}
                key={index}
                onClick={() => toggleInlineStyle(control.name)}
              >
                {control.icon}
              </ControlButton>
            );
          })}

          <ControlButton selected={isLinkSelected()} onClick={onLinkClick}>
            <FaLink />
          </ControlButton>
        </div>
        <div style={controlStyle}>
          {blockControls.map((control, index) => {
            const selection = editorState.getSelection();
            const blockType = editorState
              .getCurrentContent()
              .getBlockForKey(selection.getStartKey())
              .getType();
            return (
              <ControlButton
                selected={control.name === blockType}
                key={index}
                onClick={() => toggleBlockType(control.name)}
              >
                {control.icon}
              </ControlButton>
            );
          })}
        </div>
      </div>
      <div style={editorStyles}>
        <Editor
          editorState={editorState}
          onChange={onEditorChange}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
        />
      </div>
    </div>
  );
};

export default DraftJsEditor;
