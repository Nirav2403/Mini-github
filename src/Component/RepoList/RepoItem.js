import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RepoItem = (props) => {
  const { item } = props || {};
  const navigate = useNavigate();

  const redirectOnActivityPage = () => {
    navigate(`/${item?.full_name}`);
  };

  return (
    <div className="git-repo-row">
      <div className="git-repo-first-section">
        <div className="git-repo-profile-section">
          <div className="git-repo-name">{item.name}</div>
          <div
            className={`git-repo-control-status ${
              item?.private ? "private" : "public"
            }`}
          >
            {item?.private ? "Private" : "Public"}
          </div>
        </div>
        <div className="git-repo-status-section">
          <div className="git-repo-owner">
            <img className="repo-owner-avatar" src={item?.owner?.avatar_url} />
            <div className="repo-owner-name">
              <span>{item?.owner?.login}</span>
              <span>{item?.owner?.type}</span>
            </div>
          </div>

          <div className="git-repo-status-details">
            <div>
              <i class="fa-regular fa-star" />
              Star
              <span>{item.starred_count || 0}</span>
            </div>
            <div>
              <i class="fa-regular fa-share-from-square" />
              Share
              <span>{item.forks_count || 0}</span>
            </div>
            <div>
              <i class="fa-regular fa-star" />
              Issues
              <span>{item.open_issues_count || 0}</span>
            </div>
            <div>
              <i class="fa-regular fa-eye"></i>
              Visited
              <span>{item.watchers_count || 0}</span>
            </div>
            <div onClick={redirectOnActivityPage}>
              <i class="fa-solid fa-chart-line"></i>
              View Activity
            </div>
          </div>
        </div>
      </div>
      <div className="git-repo-second-section">
        <div className="git-repo-description">{item?.description}</div>
      </div>
      <div className="git-repo-third-section">
        <div className="git-date-description">
          <div>
            <span>Created at</span>
            <span>{moment(item.created_at).format("lll")}</span>
          </div>
          <div>
            <span>Updated at</span>
            <span>{moment(item.updated_at).format("lll")}</span>
          </div>
          <div>
            <span>Pushed at</span>
            <span>{moment(item.pushed_at).format("lll")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
