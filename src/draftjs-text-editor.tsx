import React, { useEffect, useRef } from "react";
import {
  CompositeDecorator,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";

import {
  DsControlButton,
  DsHeader,
  DsControl,
  DsEditor,
  DsContainer,
} from "./draftjs-styles";
import { FaLink } from "react-icons/fa";
import draftToHtml from "draftjs-to-html";
import { findLinkEntities, isLinkSelected, Link } from "./draftjs-link";
import { blockControls, inlineControls } from "./draftjs-constants";

interface DraftJsEditorProps {
  onChange: (html: string) => void;
  color?: string;
}

const DraftJsEditor = ({ onChange, color = "#808080" }: DraftJsEditorProps) => {
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
    onChange(html);
  };

  return (
    <DsContainer>
      <DsHeader color={color}>
        <DsControl color={color}>
          {inlineControls.map((control, index) => {
            const currentStyle = editorState.getCurrentInlineStyle();

            return (
              <DsControlButton
                selected={currentStyle.has(control.name)}
                color={color}
                key={index}
                onClick={() => toggleInlineStyle(control.name)}
              >
                {control.icon}
              </DsControlButton>
            );
          })}

          <DsControlButton
            selected={isLinkSelected(editorState)}
            color={color}
            onClick={onLinkClick}
          >
            <FaLink />
          </DsControlButton>
        </DsControl>
        <DsControl color={color}>
          {blockControls.map((control, index) => {
            const selection = editorState.getSelection();
            const blockType = editorState
              .getCurrentContent()
              .getBlockForKey(selection.getStartKey())
              .getType();

            return (
              <DsControlButton
                selected={control.name === blockType}
                color={color}
                key={index}
                onClick={() => toggleBlockType(control.name)}
              >
                {control.icon}
              </DsControlButton>
            );
          })}
        </DsControl>
      </DsHeader>
      <DsEditor color={color}>
        <Editor
          editorState={editorState}
          onChange={onEditorChange}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
        />
      </DsEditor>
    </DsContainer>
  );
};

export default DraftJsEditor;
