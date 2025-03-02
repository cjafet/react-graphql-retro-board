import React from "react";

/**
 * Analysis component used in the DashBoard component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Analysis = (props) => {
    
    return (
    <div style={{position: "relative", alignItems: "center"}}>
        <div className="row" style={{display: "block", color: "white", margin: 0}}>
            <div className="col" style={{fontSize: "18px", borderRadius: "8px", width: "300px", marginTop: "3%"}}>
                {props.title}: 
            </div>
        </div>
        <div className="row" style={{position: "absolute", top: "25px", display: "block", margin: 0, alignItems: "center"}}>
            <div className="col" style={{color: "white", borderRadius: "8px", width: "300px", alignItems: "center"}}>
                <span style={{fontSize: "48px", alignItems: "center"}}>+{props.data?.toFixed(2)}</span>
            </div>
        </div>
    </div>
 )};

export default Analysis;