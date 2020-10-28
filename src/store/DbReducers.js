import {
  ADD_DATABASES_SUCC,
  DB_ERROR,
  DROP_DATABASES_SUCC,
  GET_DB,
} from "./Types";

const initialState = {
  database: {},
  errors: {},
  databases: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DATABASES_SUCC:
      return {
        ...state,
        database: payload,
      };
    case DROP_DATABASES_SUCC:
      return {
        ...state,
      };
    case GET_DB:
      return {
        ...state,
        databases: payload,
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
