import createSagaMiddleware from "@redux-saga/core";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers/";
import rootSaga from "../Reducers/Sagas/rootSagas";

const sagaMiddleWare = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleWare)
  );
  sagaMiddleWare.run(rootSaga);

  return store;
}
