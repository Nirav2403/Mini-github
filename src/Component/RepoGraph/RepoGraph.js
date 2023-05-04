import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GET_GIT_REPO_STATUS_REQUESTED } from "../../Constants/reducerActionType";
import GitHeader from "../GitHeader/GitHeader";
import { useLocation } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const RepoGraph = (props) => {
  const { repoStatus = [] } = props || {};
  const params = useLocation();
  const [repoActivity, setRepoActivity] = useState("code_frequency");
  Chart.register(...registerables);

  const chartOptions = {
    type: "line",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };

  const getRepoActivities = (activity = repoActivity) => {
    const pathName = params?.pathname || "";
    props.getActivityGitRepo({ pathName, activity });
  };

  useEffect(() => {
    getRepoActivities();
  }, []);

  useEffect(() => {}, [repoStatus]);

  const handleRepoActivity = (e) => {
    setRepoActivity(e.target.value);
    getRepoActivities(e.target.value);
  };

  const returnRepoActivityName = (value) => {
    switch (value) {
      case "a":
        return "Addition";
      case "d":
        return "Deletions";
      case "c":
        return "Commits";
      default:
        return "Addition";
    }
  };

  const renderRepoGraphForContributor = (item) => {
    const weeks = item.weeks || [];
    const keys = Object.keys(weeks[0] || {})?.slice(1, 4) || [];
    const labels = weeks.map((item) => item.w);
    const datasets = keys.map((key) => {
      const data = weeks.map((item) => item[key]);
      return {
        label: returnRepoActivityName(key),
        data,
      };
    });

    const data = {
      labels,
      datasets,
    };
    const options = { ...chartOptions, data };

    return (
      <div className="repo-charts git-repo-row">
        <div className="repo-charts-contributer-name">
          <span>{item.author?.login}</span>
        </div>
        <div>
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };

  const renderGraphForAddition = () => {
    const labels = repoStatus.map((item) => item[0]);
    const addition = repoStatus.map((item) => item[1]);
    const deletions = repoStatus.map((item) => item[2]);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Addition",
          data: addition,
        },
        {
          label: "Deletions",
          data: deletions,
        },
      ],
    };
    const options = { ...chartOptions, data };
    return (
      <div className="repo-charts git-repo-row">
        <div>
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };

  const renderGraphForCommits = (item) => {
    const data = {
      labels: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      datasets: [
        {
          label: "Commits",
          data: item?.days,
        },
      ],
    };
    const options = { ...chartOptions, data };
    return (
      <div className="repo-charts git-repo-row">
        <div>
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };

  return (
    <div className="repo-status-graph">
      <GitHeader
        isFromRepoGraph
        repoActivity={repoActivity}
        handleRepoActivity={handleRepoActivity}
      />
      <div>
        {repoActivity === "contributors" &&
        repoStatus &&
        Array.isArray(repoStatus)
          ? repoStatus.map((item) => renderRepoGraphForContributor(item))
          : repoActivity === "code_frequency"
          ? renderGraphForAddition()
          : repoActivity === "commit_activity" &&
            repoStatus.map((item) => renderGraphForCommits(item))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  repoStatus: state.repoStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getActivityGitRepo: (data) =>
    dispatch({ type: GET_GIT_REPO_STATUS_REQUESTED, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoGraph);
