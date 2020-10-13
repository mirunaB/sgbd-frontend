import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import dbReducers from "./DbReducers";
import tableReducers from "./TableReducers";

const reducers = combineReducers({
  dbReducers,
  tableReducers,
});

const middleware = [thunk];

const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
