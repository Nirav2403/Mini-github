import { GET_GIT_REPO_STATUS } from "../Constants/reducerActionType";

const initialState = [];

export const getRepoStatus = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GIT_REPO_STATUS:
      return payload;

    default:
      return state;
  }
};
