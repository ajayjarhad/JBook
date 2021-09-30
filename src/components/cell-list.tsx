import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div>
      {" "}
      <AddCell previousCellId={null} />
      {renderedCells}{" "}
      <div className={cells.length === 0 ? "force-visible" : ""}> </div>
    </div>
  );
};

export default CellList;
