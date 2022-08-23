import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Ragister from "./components/Ragister";
import RequerUser from "./hooks/RequirUser";

function App() {
  return (
    <div className="App">
      <Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <RequerUser>
                <Home />
              </RequerUser>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <RequerUser>
                <Home />
              </RequerUser>
            }
          ></Route>

          <Route path="/ragister" element={<Ragister />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
