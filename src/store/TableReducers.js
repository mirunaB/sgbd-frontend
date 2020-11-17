import {
  ADD_TABLE_SUCC,
  DROP_TABLE_SUCC,
  ADD_ROW_SUCC,
  GET_TABLES_SUCC,
  GET_TABLE_COLS_SUCC,
  GET_ROWS_SUCC,
  DELETE_ROW_SUCC,
  GET_TABLES_FK,
  DB_ERROR,
} from "./Types";

const initialState = {
  table: {},
  errors: {},
  row: {},
  tables: [],
  cols: [],
  rows: {},
  tablesFk: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TABLE_SUCC:
      return {
        ...state,
        table: payload,
      };
    case DROP_TABLE_SUCC:
      return {
        ...state,
      };
    case ADD_ROW_SUCC:
      return {
        ...state,
        row: payload,
      };
    case GET_TABLES_SUCC:
      return {
        ...state,
        tables: payload,
      };
    case GET_TABLE_COLS_SUCC:
      return {
        ...state,
        cols: payload,
      };
    case GET_TABLES_FK:
      return {
        ...state,
        tablesFk: payload,
      };
    case GET_ROWS_SUCC:
      return {
        ...state,
        rows: payload,
      };
    case DELETE_ROW_SUCC:
      return {
        ...state,
      };
    case DB_ERROR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
}
