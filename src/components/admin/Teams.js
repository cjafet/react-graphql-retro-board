import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import Team from "./Team";

/**
 * Admin component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Teams = () => {
    const { actions} = useContext(ThemeContext);
    const [teams, setTeams] = useState([]);
    const authUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("authUser", authUser);

    const navigate = useNavigate();
    if (authUser.team === "") {
        navigate("/");
    }

    useEffect(() => {
      actions.getTeamsByOrg(authUser.organization).then(res => {
        let arrayOfThree = [];
        for (let i = 0; i < res.length; i += 3) {
          arrayOfThree.push(res.slice(i, i + 3));
        }

        setTeams(JSON.stringify(arrayOfThree));
        console.log("Org teams", teams);
      });
      
    }, [authUser.organization, actions, teams]); // Empty array, only runs after the first render
    
    return (
    <div style={{marginLeft: "10px",display: "inline-flex", alignItems: "center", width: "90%"}}>
        <div style={{borderRadius: "8px", display: "block", width: "100%", marginTop: "40px"}}>
            {teams.length !== 0 && (
              JSON.parse(teams).map(array => (
                <div className="row">
                  {array.map(item => (
                    <div className="col s4 m4 l4">
                      <Team name={item.name} hash={item.hash} />
                    </div>
                  ))}
                </div>
              ))
            )}
        </div>
    </div>
 )};

export default Teams;