import axios from "axios";
import {
  DROP_TABLE_SUCC,
  ADD_TABLE_SUCC,
  ADD_ROW_SUCC,
  GET_TABLES_SUCC,
  GET_TABLE_COLS_SUCC,
  GET_TABLES_FK,
  GET_ROWS_SUCC,
  DELETE_ROW_SUCC,
  DB_ERROR,
  SELECT_SUCC,
  ADD_INDEX_SUCC,
} from "./Types";
import { toast } from "react-toastify";

export const resetErrors = () => ({
  type: DB_ERROR,
  payload: {},
});

export const addTable = (nameDb, nameTable, columns) => async (dispatch) => {
  const cols = columns.map((col) => {
    const newCol = col;
    const value = col.fk;
    delete newCol["id"];
    delete newCol["fk"];
    const colRes = {
      ...newCol,
    };
    if (Object.keys(value).length > 0) {
      colRes.fKeys = {
        [col.attributeName]: value,
      };
    }
    return colRes;
  });
  try {
    const res = await axios.post(
      `http://localhost:8080/catalog/saveTable/${nameDb}/${nameTable}`,
      cols,
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
    if (err.response.data && err.response.data === "FIELD_MUST_BE_UNIQUE") {
      toast.error("Field must be unique");
    } else if (err.response.data && err.response.data === "FK_CONSRAINT") {
      toast.error("Foreign key constraint error");
    }
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

export const getTablesFk = (nameDb, tableName) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/catalog/tables/${nameDb}/${tableName}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    dispatch({
      type: GET_TABLES_FK,
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
      `http://localhost:8080/record/findAllRec/${nameDb + "_" + nameTable}`,
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
    toast.error("Cannot delete this row. There is a fk constraint");
  }
};

export const select = (dbName, columns, table, condition) => async (
  dispatch
) => {
  console.log(dbName);
  try {
    const res = await axios.post(
      `http://localhost:8080/record/select?dbName=${dbName}&tableName=${table}&condition=${condition}&columns=${columns}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: SELECT_SUCC,
      payload: res,
    });
    toast.success("SELECT succeeded ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("Invalid query! ");
  }
};

export const addIndex = (nameDb, nameTable, data) => async (dispatch) => {
  const { name, isUnique, columns } = data;
  const columnList = columns.map((col) => ({
    attributeName: col.columnsIndex,
  }));

  try {
    const res = await axios.post(
      `http://localhost:8080/catalog/addIndex/${nameDb}/${nameTable}`,
      {
        name,
        isUnique,
        columnList,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    dispatch({
      type: ADD_INDEX_SUCC,
      payload: res,
    });
    toast.success("Index added ");
  } catch (err) {
    dispatch({
      type: DB_ERROR,
      payload: err.response,
    });
    toast.error("Something went wrong please try again");
  }
};
