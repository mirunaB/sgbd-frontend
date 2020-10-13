import {
  ADD_DATABASES_SUCC,
  ADD_DATABASES_ERR,
  DROP_DATABASES_SUCC,
  DROP_DATABASES_ERR,
} from "./Types";

const initialState = {
  database: {},
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DATABASES_SUCC:
      return {
        ...state,
        database: payload,
      };
    case ADD_DATABASES_ERR:
      return {
        ...state,
        errors: payload,
      };
    case DROP_DATABASES_SUCC:
      return {
        ...state,
      };
    case DROP_DATABASES_ERR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
}