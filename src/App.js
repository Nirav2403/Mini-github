import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./CSS/style.css";
import RepoList from "./Component/RepoList/RepoList";
import RepoGraph from "./Component/RepoGraph/RepoGraph";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<RepoList />} />
          <Route path="/:owner/:repo" element={<RepoGraph />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
