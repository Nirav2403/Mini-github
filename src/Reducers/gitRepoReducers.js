import { GET_GIT_REPO } from "../Constants/reducerActionType";

const initialState = {
  items: [],
};

export const getRepoList = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GIT_REPO:
      const existingRepo = state.items.filter(
        (item) => item.id === payload?.items[0]?.id
      );
      return existingRepo.length > 0
        ? state
        : { ...payload, items: state.items.concat(payload.items) };

    default:
      return state;
  }
};
