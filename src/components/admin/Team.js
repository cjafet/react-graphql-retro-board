import React, {useContext, useRef} from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Team component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Team = (props) => {
    const { themeColor } = useContext(ThemeContext);
    const hash = useRef();
    
    return (

        <div className="row" style={{backgroundColor: "#8634A5", marginBottom: "25px !important", width: "100%", height: "180px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <div className="col s12 m12 l12">
                <div className="row" style={{backgroundColor: "#4B0B6D", color: "white", height: "42px", alignContent: "center", marginTop: "0"}}>
                    <div className="col s12 m12 l12">
                        {props.name.toUpperCase()}
                    </div>
                </div>
                <div className="row" style={{color: "white", textAlign: "left", marginBottom: "10px"}}>
                    <div className="col s1 m1 l1"></div>
                    <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                        <input
                            type="text"
                            className="form-control login"
                            id="hash"
                            aria-describedby="hash"
                            ref={hash}
                            placeholder="Enter new team name"
                            value={props.hash}
                        /> 
                    </div>
                    </div>
                    <div className="row" style={{color: "white", textAlign: "left"}}>
                       <div className="col s1 m1 l1"></div>
                       <div className="col s11 m11 l11" style={{padding: 0, margin: 0, textAlign: "left"}}>
                            <a
                                className="add-team-btn"
                                style={{ backgroundColor: themeColor, marginRight: "10px" }}
                                href="/admin/teams"
                                >
                                    ROTATE HASH
                            </a>

                            <a
                                className="add-team-btn"
                                style={{ backgroundColor: themeColor, marginRight: "10px" }}
                                href={"/"+ props.name + "/" + props.hash + "/signup" }
                                >
                                    SIGNUP
                            </a>

                            <a
                                className="add-team-btn"
                                style={{ backgroundColor: themeColor, marginRight: "10px" }}
                                href={"/"+ props.name + "/" + props.hash + "/signin" }
                                >
                                    LOGIN
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    
 )};

export default Team;