import axios from "axios";
import {
  DROP_DATABASES_ERR,
  DROP_DATABASES_SUCC,
  ADD_DATABASES_ERR,
  ADD_DATABASES_SUCC,
} from "./Types";
import { toast } from "react-toastify";

export const resetErrors = () => ({
  type: ADD_DATABASES_ERR,
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
      type: ADD_DATABASES_ERR,
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
      type: DROP_DATABASES_ERR,
      payload: err.response,
    });
    toast.error("This database doesn't exist ");
  }
};
