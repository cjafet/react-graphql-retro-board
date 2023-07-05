import React from 'react';
import { useQuery } from '@apollo/client'; 
import { GET_ITEMS_BY_TEAM } from "../constants/Queries";

/**
 * UserRetros component used to render(list) all user retrospectives.
 */
const UserRetros = props => {
  console.log("props", props);
    
    /** Sets the query to get all team retrospectives*/
    const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
      variables: { productTeam: props.team[0] },
      refetchQueries: [
        GET_ITEMS_BY_TEAM, // DocumentNode object parsed with gql
       'allByTeam' // Query name
     ]
    });
    
    console.log(data);

    if (error) {
      console.log("Error querying items by team");
    }
    if(!loading && data) {
      console.log(data.allRetrosByTeam);
    }
   
    return (
        <div style={{display: "flex", marginTop: "40px", marginLeft: "8%", alignItems: "center"}}>
          
          {error && (
            <div>
              <p><strong>Could not fetch data from the server. <strong>Create a new Retrospective board to get started</strong> or check if the GraphQL server is up and running.</strong></p>  
            </div>
          )}
          
          {!error && data?.allRetrosByTeam.map((it) => {
            return (
              <div key={it.iteration} style={{margin: "10px 10px"}}>
                <div className="task-header-retros" style={{minHeight: "auto"}}>
                    <div className="task-body">
                      <a href={"/board/" + props.team + "/" + it.iteration} style={{color: "white"}}>{props.team} - {it.iteration}</a>
                    </div>
                </div>
              </div>
            )
          })}
        </div>        
    );

}

export default UserRetros;