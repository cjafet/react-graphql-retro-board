import React from 'react';
import { useQuery } from '@apollo/client'; 
import { GET_ITEMS_BY_TEAM, GET_ALL_TEAMS } from "../constants/Queries";


const UserRetros = props => {
    let team = [];
    let iterations = [];
    const { loading_teams, error: error_teams, data: data_teams } = useQuery(GET_ALL_TEAMS);
    const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
      variables: { productTeam: "PBS" },
    });
    console.log(data);

    if (error_teams) return <p>Error</p>;
    if (loading_teams) return <p>Loading teams...</p>;

    if(!loading_teams && data_teams) {
      console.log(data_teams.allTeams);
      team = data_teams.allTeams
    }

    if (error) return <p>Error</p>;
    if(!loading && data) {
      console.log(data.allRetrosByTeam);
      iterations = data.allRetrosByTeam
    }
   
    return (
        <div style={{display: "flex", marginTop: "40px", marginLeft: "8%", alignItems: "center"}}>
          <div style={{margin: "10px 20px"}}>{team}</div>
          {iterations.map((it) => {
            return (
              <div key={it.iteration} style={{margin: "10px 20px"}}>
                <div className="task-header" style={{minHeight: "auto"}}>
                    <div className="task-body">
                      <a href={"/board/" + it.iteration} style={{color: "white"}}>{team} - {it.iteration}</a>
                    </div>
                </div>
              </div>
            )
          })}
        </div>        
    );

}

export default UserRetros;