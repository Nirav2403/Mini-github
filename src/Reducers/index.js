import { combineReducers } from "redux";
import { getRepoList } from "./gitRepoReducers";
import { getRepoStatus } from "./gitRepoStatusReducers";

export default combineReducers({
  repoList: getRepoList,
  repoStatus: getRepoStatus,
});
