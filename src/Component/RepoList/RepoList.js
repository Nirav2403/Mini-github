import React, { Component } from "react";
import { connect } from "react-redux";
import { GET_GIT_REPO_REQUESTED } from "../../Constants/reducerActionType";
import moment from "moment";
import RepoItem from "./RepoItem";
import GitHeader from "../GitHeader/GitHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";

class RepoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoList: [],
      page: 1,
      date: moment().subtract(7, "days").format("YYYY-MM-DD"),
      gridLayout: "one-grid",
      dateDuration: 7,
    };
  }

  componentDidMount() {
    this.getStaredGitRepos();
  }

  getStaredGitRepos = async (
    page = this.state.page,
    date = this.state.date
  ) => {
    const { repoList } = this.props || [];
    const { stars, desc } = this.state;
    await this.props.getStaredGitRepo({ date, stars, desc, page });

    this.setState({
      page,
      hasMoreRepos:
        !repoList?.items?.length ||
        repoList?.items?.length < repoList.total_count,
    });
  };

  handleGridLayout = (e) => {
    this.setState({ gridLayout: e.target.value });
  };

  handleDateChange = (e) => {
    this.setState(
      {
        dateDuration: e.target.value,
        date: moment()?.subtract(e.target.value, "days")?.format("YYYY-MM-DD"),
      },
      () => {
        this.getStaredGitRepos();
      }
    );
  };

  fetchMoreRepos = () => {
    this.getStaredGitRepos(this.state.page + 1);
  };

  render() {
    const { repoList } = this.props || {};
    const { gridLayout, dateDuration, hasMoreRepos } = this.state || {};
    return (
      <div className="git-repo-container">
        <GitHeader
          dateDuration={dateDuration}
          gridLayout={gridLayout}
          handleDateChange={this.handleDateChange}
          handleGridLayout={this.handleGridLayout}
          isFromRepoPage
        />
        <div className="git-repo-row-details" id="git-repo-details">
          <InfiniteScroll
            dataLength={repoList?.total_count || 0}
            next={this.fetchMoreRepos}
            hasMore={hasMoreRepos}
            scrollableTarget="git-repo-details"
          >
            <div className={`git-repo-list ${gridLayout}`}>
              {repoList?.items?.map((item) => (
                <RepoItem item={item} />
              ))}
              {hasMoreRepos && (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  repoList: state.repoList,
});

const mapDispatchToProps = (dispatch) => ({
  getStaredGitRepo: (data) =>
    dispatch({ type: GET_GIT_REPO_REQUESTED, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);
