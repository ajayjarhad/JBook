import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useActions } from "../hooks/use-actions";

import { Cell } from "../state";
import "./text-editor.css";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
