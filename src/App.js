import React from "react";
import { useQuery } from '@apollo/client'; 
import { Route, Routes, Navigate } from "react-router-dom"; 
import './App.css';

// App Components
import UserRetros from "./components/UserRetros";
import Board from "./components/Board";
import NotFound from "./components/NotFound";
import { GET_ALL_TEAMS } from "./constants/Queries";
import Header from "./components/Header";

/**
 * Main app component.
 */
function App() {
  let team = [];
  
  /** Sets the query to get user teams*/
  const { loading_teams, error: error_teams, data: data_teams } = useQuery(GET_ALL_TEAMS);

  if (error_teams) {
    console.log("Error querying for teams");
  }
  if (loading_teams) return <p>Loading teams...</p>;

  if(!loading_teams && data_teams) {
    console.log(data_teams.allTeams);
    team = data_teams.allTeams;
  }

  return (
    <div className="App">
      <Header team={team} />
      <Routes>
        <Route path="/" element={<Navigate to="/retros" />} />
        <Route path="/retros" element={<UserRetros team={team} />} />
        <Route path="/board/:team/:iteration" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
