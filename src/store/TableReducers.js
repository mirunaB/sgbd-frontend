import {
  ADD_TABLE_SUCC,
  ADD_TABLE_ERR,
  DROP_TABLE_SUCC,
  DROP_TABLE_ERR,
} from "./Types";

const initialState = {
  table: {},
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TABLE_SUCC:
      return {
        ...state,
        table: payload,
      };
    case ADD_TABLE_ERR:
      return {
        ...state,
        errors: payload,
      };
    case DROP_TABLE_SUCC:
      return {
        ...state,
      };
    case DROP_TABLE_ERR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
}
