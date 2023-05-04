import { put, call, takeEvery } from "redux-saga/effects";
import {
  GET_GIT_REPO,
  GET_GIT_REPO_REQUESTED,
  GET_GIT_REPO_STATUS,
  GET_GIT_REPO_STATUS_REQUESTED,
} from "../../Constants/reducerActionType";
import {
  getRepoActivity,
  getStaredGitRepo,
} from "../../Component/RepoList/action";

function* getGitRepoList(data) {
  const repos = yield call(getStaredGitRepo, data);
  yield put({ type: GET_GIT_REPO, payload: repos });
}

function* getGitRepoActivity(data) {
  const repos = yield call(getRepoActivity, data);
  yield put({ type: GET_GIT_REPO_STATUS, payload: repos });
}

export default function* repoSaga() {
  yield takeEvery(GET_GIT_REPO_REQUESTED, getGitRepoList);
  yield takeEvery(GET_GIT_REPO_STATUS_REQUESTED, getGitRepoActivity);
}
