import React from "react";
import { useQuery } from "@apollo/client";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// App Components
import DashBoard from "./components/DashBoard";
import Okr from "./components/Okr";
import Board from "./components/Board";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Home from "./components/Home";
import Settings from "./components/Settings";
import { Provider } from "./components/context/ThemeContext";
import { GET_ALL_TEAMS } from "./constants/Queries";
import SignUp from "./components/SignUp";
import Admin from "./components/admin/Admin";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";

/**
 * Main app component.
 */
function App() {
  let team = [];

  /** Sets the query to get user teams*/
  const {
    loading_teams,
    error: error_teams,
    data: data_teams,
  } = useQuery(GET_ALL_TEAMS);

  if (error_teams) {
    console.log("Error querying for teams");
  }
  if (loading_teams) return <p>Loading teams...</p>;

  if (!loading_teams && data_teams) {
    console.log("All Teams", data_teams.allTeams);
    team = data_teams.allTeams;
  }

  return (
    <div className="App">
      <Provider>
        <Header team={team} />
        <Routes>
          {/* <Route
            path="/:teams"
            element={<Navigate replace="true" to={mainRoute} />}
          /> */}
          <Route
            path=":team"
            element={<Navigate replace="true" to="dashboard" />}
          />
          {/* <Route path="/retros" element={<UserRetros team={team} />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/board/:team/:iteration" element={<Board />} />
          <Route path="/:team/dashboard" element={<DashBoard />} />
          <Route path="/:team/:hash/signup" element={<UserSignUp />} />
          <Route path="/:organization/:team/signin" element={<UserSignIn />} />
          <Route path="/okrs" element={<Okr team={team} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
