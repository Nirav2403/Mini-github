import React from "react";

const GitHeader = (props) => {
  const {
    dateDuration,
    gridLayout,
    isFromRepoPage,
    isFromRepoGraph,
    repoActivity,
  } = props || {};

  return (
    <div className="git-repo-header">
      <div className="git-title">
        <svg
          height="32"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          data-view-component="true"
          class="octicon octicon-mark-github"
        >
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        Mini Github
      </div>
      {isFromRepoPage && (
        <div>
          <div className="grid-select-box">
            <label>Filter</label>
            <select
              placeholder="Date duration"
              value={dateDuration}
              onChange={props.handleDateChange}
            >
              <option value={1}>Last day</option>
              <option value={7}>Last week</option>
              <option value={30}>Last month</option>
              <option value={365}>Last year</option>
            </select>
          </div>
          <div className="grid-select-box">
            <label>Grid Layout</label>
            <select
              placeholder="Grid Layout"
              value={gridLayout}
              onChange={props.handleGridLayout}
            >
              <option value="one-grid">One Grid</option>
              <option value="two-grid">Two Grid</option>
              <option value="three-grid">Three Grid</option>
            </select>
          </div>
        </div>
      )}
      {isFromRepoGraph && (
        <div>
          <div className="grid-select-box">
            <label>Activity</label>
            <select
              placeholder="Date duration"
              value={repoActivity}
              onChange={props.handleRepoActivity}
            >
              <option value="code_frequency">Additions/Deletions</option>
              <option value="commit_activity">Commits</option>
              <option value="contributors">Contributors</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHeader;
