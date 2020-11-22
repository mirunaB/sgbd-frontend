import {
  ADD_DATABASES_SUCC,
  DB_ERROR,
  DROP_DATABASES_SUCC,
  GET_DB,
  SELECT_SUCC,
} from "./Types";

const initialState = {
  database: {},
  errors: {},
  databases: [],
  records: [],
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
    case SELECT_SUCC:
      return {
        ...state,
        records: payload,
      }
    default:
      return state;
  }
}
