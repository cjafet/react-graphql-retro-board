import React from 'react';
import { Link } from "react-router-dom";
import Modal from "./modals/Modal";

const Header = props => {
    console.log(props);
    return (
        <React.Fragment>
            <nav>
                <div className="nav-wrapper">
                <a href="/" className="brand-logo font-header">RetroBoard</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down font-header">
                    <li style={{position: "relative"}}><Modal teams={props.team} last_iteration={props.last_iteration} /> </li>
                    <li style={{position: "relative"}}><Link to="#"><span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Team</Link></li>
                    <li><Link to="/retros">My Retros</Link></li>
                    <li><Link to={"/board/" + props.last_iteration}>Board</Link></li>
                    <li><Link to="#">My Teams &nbsp;</Link></li>
                    <li>{props.team} Team</li>
                </ul>
                </div>
            </nav>
        </React.Fragment>
    );
    
    

}


export default Header;