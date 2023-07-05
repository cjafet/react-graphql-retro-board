import React from "react";

/**
 * NotFound component used when a route is not found.
 */
const NotFound = () => (
    <div style={{display: "inline-flex", alignItems: "center", height: "400px"}}>
        <i className="material-icons icn-error" style={{fontSize: "80px", marginRight: "10px"}}>error_outline</i>
        <h2 style={{margin: "0"}}>Page Not Found</h2>
    </div>
);

export default NotFound;