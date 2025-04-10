import React, {useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Admin component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Admin = () => {
    const { themeColor} = useContext(ThemeContext);
    const teamname = useRef(null);
    const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;
    const authUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("authUser", authUser);

    const navigate = useNavigate();
    if (authUser === null || authUser.team === "") {
        navigate("/");
    }    

    const handleTeam = async (event) => {  
        event.preventDefault();
        if (authUser.organization !== "" && authUser.userName !== "") {
          let data = {
            query: "mutation newTeam($teamName: String!, $organization: String!) { addTeam(teamName: $teamName, organization: $organization) }",
            variables: { teamName: teamname.current.value, organization: authUser.organization },
          };

          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };

          const response = await fetch(
            GRAPHQL_SERVER,
            fetchOptions
          );

          console.log("addTeam response", response);
        }
    }

    // const handleCancel = (event) => {
    //     event.preventDefault();
    //     // navigate("/");
    // };

    
    return (

    <div style={{display: "inline-flex", alignItems: "center", width: "100%"}}>
        <div style={{borderRadius: "8px", display: "block", width: "100%"}}>
          <form onSubmit={handleTeam}>
            <div className="row" style={{backgroundColor: "#8634A5", marginBottom: "25px !important", width: "500px", height: "250px", marginTop: "60px"}}>
              <div className="col s12 m12 l12">
                <div className="row" style={{backgroundColor: "#4B0B6D", color: "white", height: "42px", alignContent: "center", marginTop: "0"}}>
                    <div className="col s12 m12 l12">
                        + ADD TEAM
                    </div>
                </div>
                <div className="row" style={{marginTop: "30px"}}>
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
                        ref={teamname}
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
          </form>
        </div>
    </div>
 )};

export default Admin;