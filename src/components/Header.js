import React from 'react';
import { useQuery } from '@apollo/client'; 
import { Link } from "react-router-dom";
import Modal from "./modals/Modal";
import { GET_ITEMS_BY_TEAM } from "../constants/Queries";

const Header = props => {
    console.log(props);
    let lastIteration = [];
    const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
      variables: { productTeam: props.team[0] },
    });
    console.log(data);
    if (error) {
        console.log("Error querying for items");
      }
    if(!loading && data) {
        console.log("all_retros_by_team",data.allRetrosByTeam);
        lastIteration = data.allRetrosByTeam.length;
        console.log(lastIteration);
    }
    return (
        <React.Fragment>
            <nav>
                <div className="nav-wrapper">
                <a href="/" className="brand-logo font-header">RetroBoard</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down font-header">
                    <li style={{position: "relative"}}><Modal teams={props.team} last_iteration={lastIteration} /> </li>
                    <li style={{position: "relative"}}><Link to="#"><span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Team</Link></li>
                    <li><Link to="/retros">My Retros</Link></li>
                    {lastIteration > 0 && (
                    <li><Link to={"/board/" + props.team + "/" + lastIteration}>Board</Link></li>
                    )}
                    <li><Link to="#">My Teams &nbsp;</Link></li>
                    <li>{props.team} Team</li>
                </ul>
                </div>
            </nav>
        </React.Fragment>
    );
}


export default Header;