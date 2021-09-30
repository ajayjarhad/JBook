import { useEffect } from "react";

import Resizable from "./resizable";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import { useActions } from "../hooks/use-actions";
import { Cell } from "../state";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";

import "./code-cell.css";
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const cumulativeCode = useCumulativeCode(cell.id);
  const bundle = useTypedSelector(
    (state) => state.bundles && state.bundles[cell.id]
  );

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle, cumulativeCode]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};
export default CodeCell;
