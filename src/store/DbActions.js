import axios from "axios";
import {
  DROP_DATABASES_SUCC,
  ADD_DATABASES_SUCC,
  GET_DB,
  SELECT_JOIN_SUCC,
  DB_ERROR,
  GROUP_BY_SUCC,
} from "./Types";
import { toast } from "react-toastify";

export const resetErrors = () => ({
  type: DB_ERROR,
  payload: {},
});

export const addDb = (name) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8080/catalog/saveDb/${name}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: ADD_DATABASES_SUCC,
      payload: res,
    });
    toast.success("Databases added ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("This database already exists");
  }
};

export const dropDb = (name) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/catalog/dropDb/${name}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: DROP_DATABASES_SUCC,
      payload: res,
    });
    toast.success("Database was deleted ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("This database doesn't exist ");
  }
};

export const getDb = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/catalog/databases", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    dispatch({
      type: GET_DB,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: DB_ERROR, payload: error });
  }
};

export const selectJoin = (
  type,
  dbName,
  table1,
  table2,
  cols,
  condition,
  selectedColumns
) => async (dispatch) => {
  const splitCols = cols.split("=");
  try {
    const res = await axios.post(
      `http://localhost:8080/record/${type}/${dbName}`,
      {
        table1,
        col1: splitCols[0],
        table2,
        col2: splitCols[1],
        condition: condition || "",
        selectedColumns,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: SELECT_JOIN_SUCC,
      payload: res,
    });
    toast.success("ROW added ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
  }
};

export const groupBy = (dbName, tableName, column) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/record/groupBy/${dbName}/${tableName}/${column}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: GROUP_BY_SUCC,
      payload: res,
    });
    toast.success("Groupby success");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
  }
};
