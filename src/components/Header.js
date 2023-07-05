import React from 'react';
import { useQuery } from '@apollo/client'; 
import { Link } from "react-router-dom";
import RetrospectiveModal from "./modals/RetrospectiveModal";
import { GET_ITEMS_BY_TEAM } from "../constants/Queries";

/**
 * Header component used to render the top navigation menu.
 */
const Header = props => {
    console.log(props);
    
    /** Sets the query to get all team retrospectives*/
    const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
      variables: { productTeam: props.team[0] },
    });
    
    console.log(data);
    if (error) {
        console.log("Error querying for items");
      }
    if(!loading && data) {
        console.log("all_retros_by_team",data.allRetrosByTeam);
    }
    
    return (
        <React.Fragment>
            <nav>
                <div className="nav-wrapper">
                <a href="/" className="logo font-header">RetroBoard</a>
                <ul id="nav-mobile" className="right font-header">
                    <li style={{position: "relative"}}><RetrospectiveModal teams={props.team} last_iteration={data?.allRetrosByTeam.length} /> </li>
                    {/* <li style={{position: "relative"}}><Link to="#"><span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Team</Link></li> */}
                    <li><Link to="/retros">My Retros</Link></li>
                    {data?.allRetrosByTeam.length > 0 && (
                    <li><Link to={"/board/" + props.team + "/" + data?.allRetrosByTeam.length}>Board</Link></li>
                    )}
                    {/* <li><Link to="#">My Teams &nbsp;</Link></li> */}
                    {props.team.toString()!=='' && (
                        <li style={{marginLeft: "20px", fontSize: "18px"}}>{props.team.toString().toUpperCase()} TEAM</li>
                    )}
                    
                </ul>
                </div>
            </nav>
        </React.Fragment>
    );
}


export default Header;