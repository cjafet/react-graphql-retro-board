import React from "react";

/**
 * NotFound component used when a route is not found.
 */
const NotFound = () => (

    <div style={{display: "inline-flex", alignItems: "center", height: "400px"}}>
        <div style={{backgroundColor: "#ed143d", borderRadius: "8px", display: "flex", maxWidth: "581px"}}>
            <ul style={{display: "flex", color: "white", padding: "10px 20px"}}>
            <li>
            <i className="material-icons icn-error" style={{fontSize: "51px", marginRight: "10px"}}>error_outline</i>
            </li>
            <li style={{marginTop: "7px"}}>
            <h4 style={{margin: "0"}}>Page Not Found</h4>
            </li>
            </ul>
        </div>
    </div>
);

export default NotFound;