import React, {useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Team component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Team = () => {
    const { themeColor } = useContext(ThemeContext);

    
    return (

        <div className="row" style={{backgroundColor: "#8634A5", marginBottom: "25px !important", width: "500px", height: "250px"}}>
            <div className="col s12 m12 l12">
                <div className="row" style={{backgroundColor: "#4B0B6D", color: "white", height: "42px", alignContent: "center", marginTop: "13px"}}>
                    <div className="col s12 m12 l12">
                        + ADD TEAM
                    </div>
                </div>
                    <div className="row">
                        <div className="col s1 m1 l1"></div>
                        <div className="col s6 m6 l6" style={{color: "white", textAlign: "left", padding: "0"}}>Enter your new team name:</div>
                        <div className="col s5 m5 l5"></div>
                    </div>
                    <div className="row" style={{color: "white", textAlign: "left"}}>
                        <div className="col s1 m1 l1"></div>
                        <div className="col s7 m7 l7" style={{padding: 0, margin: 0}}>
                            <input
                                type="teamname"
                                className="form-control login"
                                id="teamname"
                                aria-describedby="teamname"
                                // ref={teamname}
                                placeholder="Enter new team name"
                            /> 
                        </div>
                        <div className="col s4 m4 l4" style={{padding: 0, margin: 0, textAlign: "left"}}>
                            <button
                                className="add-team-btn"
                                type="submit"
                                style={{ backgroundColor: themeColor }}
                                >
                                    ADD TEAM
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    
 )};

export default Team;