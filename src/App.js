import React, { useState } from "react";
import './App.css';

import { useQuery } from '@apollo/client'; 
import { Route, Routes, Navigate } from "react-router-dom"; 

// App Components
import UserRetros from "./components/UserRetros";
import Board from "./components/Board";
import NotFound from "./components/NotFound";
import { GET_ITEMS_BY_TEAM, GET_ALL_TEAMS } from "./constants/Queries";
import Header from "./components/Header";


function App() {
  let team = [];
  const [lastIteration, setlastIteration] = useState();
  const { loading_teams, error: error_teams, data: data_teams } = useQuery(GET_ALL_TEAMS);
  const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
    variables: { productTeam: team[0] },
  });
  if (error) {
    console.log("Error querying for items");
  }
  if(!loading && data) {
    console.log("all_retros_by_team",data.allRetrosByTeam);
    setlastIteration(data.allRetrosByTeam.length);
  }

  if (error_teams) {
    console.log("Error querying for teams");
  }
  if (loading_teams) return <p>Loading teams...</p>;

  if(!loading_teams && data_teams) {
    console.log(data_teams.allTeams);
    team = data_teams.allTeams
  }

  return (
    <div className="App">
      <Header team={team} last_iteration={lastIteration} />
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
