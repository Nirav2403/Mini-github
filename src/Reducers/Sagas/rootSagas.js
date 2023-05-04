import { spawn } from "redux-saga/effects";
import repoSaga from "./sagas";

export default function* rootSaga() {
  console.log("Worked Redux-Saga!");

  yield spawn(repoSaga);
}
