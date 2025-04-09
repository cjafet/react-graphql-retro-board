import React, {useContext, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const UserSignIn = () => {
    const { themeColor, actions } = useContext(ThemeContext);
    const username = useRef(null);
    const password = useRef(null);
    let { team, hash } = useParams();
    console.log(team, hash);

    const navigate = useNavigate();

    const handleUserSignIn = async (event) => {  
        event.preventDefault();

        const credentials = {
            userName: username.current.value,
            password: password.current.value,
            team
        };

        const user = await actions.userSignIn(credentials);
          if (user.team.length !== 0 && user.organization.length !== 0) {
            console.log("Logged user", user.data);
            navigate("/" + team + "/dashboard");
          }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        // navigate("/");
    };

    
    return (

    <div style={{display: "inline-flex", alignItems: "center", width: "100%", height: "400px"}}>
        <div style={{borderRadius: "8px", display: "block", width: "100%"}}>
          <form onSubmit={handleUserSignIn}>
            <div className="row" style={{backgroundColor: "#8634A5", marginBottom: "25px !important", width: "500px", height: "325px", textAlign: "center"}}>
              <div className="col s12 m12 l12">
                <div className="row" style={{backgroundColor: "#4B0B6D", color: "white", height: "42px", alignContent: "center", marginTop: "0"}}>
                    <div className="col s12 m12 l12">
                        + LOGIN
                    </div>
                </div>
                <div className="row">
                    <div className="col s1 m1 l1"></div>
                    <div className="col s6 m6 l6" style={{color: "white", textAlign: "left", padding: "0"}}>Welcome back! This is your team login page.</div>
                    <div className="col s5 m5 l5"></div>
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="username"
                      className="form-control login"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      ref={username}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="password"
                      className="form-control login"
                      id="exampleInputPassword1"
                      ref={password}
                      placeholder="Password"
                    />
                  </div>
                  
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s4 m4 l4"></div>
                  <div className="col s2 m2 l2" style={{padding: 0, margin: 0, textAlign: "left"}}>
                    <button
                        className="add-team-btn"
                        type="submit"
                        style={{ backgroundColor: themeColor }}
                        >
                            LOGIN
                    </button>
                  </div>
                  <div className="col s2 m2 l2">
                    <button
                      className="add-team-btn"
                      style={{ backgroundColor: themeColor }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </form>
        </div>
    </div>
 )};

export default UserSignIn;