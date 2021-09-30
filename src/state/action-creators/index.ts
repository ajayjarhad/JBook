import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  Direction,
  Action,
} from "../actions";
import { CellType } from "../cell";
import Bundle from "../../bundler";
export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (Dispatch: Dispatch<Action>) => {
    Dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });
    const result = await Bundle(input);
    Dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
