import axios from "axios";

export const getStaredGitRepo = (data) => {
  const { date, stars = "stars", desc = "desc", page } = data?.payload || {};
  return axios({
    method: "get",
    url: `https://api.github.com/search/repositories?q=created:>${date}&sort=${stars}&order=${desc}&page=${page}`,
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  });
};

export const getRepoActivity = (data) => {
  const { pathName, activity } = data?.payload || {};
  return axios({
    method: "get",
    url: `https://api.github.com/repos${pathName}/stats/${activity}`,
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  });
};
