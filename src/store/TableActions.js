import axios from "axios";
import {
  DROP_TABLE_SUCC,
  ADD_TABLE_SUCC,
  ADD_ROW_SUCC,
  GET_TABLES_SUCC,
  GET_TABLE_COLS_SUCC,
  GET_ROWS_SUCC,
  DELETE_ROW_SUCC,
  DB_ERROR,
} from "./Types";
import { toast } from "react-toastify";

export const resetErrors = () => ({
  type: DB_ERROR,
  payload: {},
});

export const addTable = (nameDb, nameTable, columns) => async (dispatch) => {
  const cols = columns.map((col) => {
    const newCol = col;
    delete newCol["id"];
    return {
      ...newCol,
    };
  });
  try {
    const res = await axios.post(
      `http://localhost:8080/catalog/saveTable/${nameDb}/${nameTable}`,
      {
        cols: cols,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: ADD_TABLE_SUCC,
      payload: res,
    });
    toast.success("TABLE added ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("Something went wrong please try again ");
  }
};

export const dropTable = (nameDb, nameTable) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/catalog/dropTable/${nameDb}/${nameTable}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: DROP_TABLE_SUCC,
      payload: res,
    });
    toast.success("Table was deleted ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("Something went wrong please try again ");
  }
};

export const addRow = (nameDb, nameTable, columns) => async (dispatch) => {
  const firstKey = columns[Object.keys(columns)[0]];
  const processedCols = columns;
  delete processedCols[Object.keys(processedCols)[0]];

  const valuesArr = [];
  Object.keys(processedCols).map((key) => valuesArr.push(processedCols[key]));

  try {
    const res = await axios.post(
      `http://localhost:8080/record/saveRecord/${nameDb}/${nameTable}`,
      {
        row: {
          [firstKey]: valuesArr.join("#"),
        },
      },
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: ADD_ROW_SUCC,
      payload: res,
    });
    toast.success("ROW added ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("Something went wrong please try again ");
  }
};

export const getTables = (nameDb) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/catalog/tables/${nameDb}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    dispatch({
      type: GET_TABLES_SUCC,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: DB_ERROR, payload: error });
  }
};

export const getColumns = (nameDb, nameTable) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/catalog/cols/${nameDb}/${nameTable}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    dispatch({
      type: GET_TABLE_COLS_SUCC,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: DB_ERROR, payload: error });
  }
};

export const getRows = (nameDb, nameTable) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/record/findAll/${nameDb}/${nameTable}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    dispatch({
      type: GET_ROWS_SUCC,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: DB_ERROR, payload: error });
  }
};

export const deleteRow = (nameDb, nameTable, key, value) => async (
  dispatch
) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:8080/record/deleteRecord/${nameDb}/${nameTable}`,
      data: {
        row: {
          [key]: value,
        },
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    dispatch({
      type: DELETE_ROW_SUCC,
      payload: res,
    });
    toast.success("Row was deleted ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("Something went wrong please try again ");
  }
};
