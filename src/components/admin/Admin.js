import React, {useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Admin = () => {
    const { themeColor, authUser } = useContext(ThemeContext);
    const teamname = useRef(null);
    const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;
    console.log("authUser", authUser);

    const navigate = useNavigate();
    if (authUser.team === "") {
        navigate("/");
    }

    const handleTeam = async (event) => {  
        event.preventDefault();
        if (authUser.organization !== "" && authUser.userName !== "") {
          let data = {
            query: "mutation addTeam($teamName: String!, $organization: String!) { addTeam(teamName: $teamName, organization: $organization) { name team organization userName } }",
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

    const handleCancel = (event) => {
        event.preventDefault();
        // navigate("/");
    };

    
    return (

    <div style={{display: "inline-flex", alignItems: "center", width: "50%", height: "400px"}}>
        <div style={{borderRadius: "8px", display: "block", width: "50%"}}>
          <form onSubmit={handleTeam}>
            <div className="form-group">
              <input
                type="teamname"
                className="form-control login"
                id="teamname"
                aria-describedby="teamname"
                ref={teamname}
                placeholder="Enter new team name"
              />
            </div>
          <div className="pad-bottom mt-3 btn-login">
            <button
              className="button"
              type="submit"
              style={{ backgroundColor: themeColor }}
            >
              Create
            </button>
            &nbsp;
            <button
              className="button button-secondary btn-login"
              style={{ backgroundColor: themeColor }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        </div>
    </div>
 )};

export default Admin;