import axios from "axios";
import {
  DROP_TABLE_ERR,
  DROP_TABLE_SUCC,
  ADD_TABLE_ERR,
  ADD_TABLE_SUCC,
} from "./Types";
import { toast } from "react-toastify";

export const resetErrors = () => ({
  type: ADD_TABLE_ERR,
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
      type: ADD_TABLE_ERR,
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
      type: DROP_TABLE_ERR,
      payload: err.response,
    });
    toast.error("Something went wrong please try again ");
  }
};
