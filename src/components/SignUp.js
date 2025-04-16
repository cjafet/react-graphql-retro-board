import React, {useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import M from "materialize-css";


/**
 * SignUp component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const SignUp = () => {
    const { themeColor, actions } = useContext(ThemeContext);
    const team = useRef(null);
    const organization = useRef(null);
    const name = useRef(null);
    const email = useRef(null);
    const username = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    const handleSignUp = async (event) => {  
        event.preventDefault();

        const credentials = {
            name: name.current.value,
            email: email.current.value,
            userName: username.current.value,
            team: team.current.value,
            organization: organization.current.value,
            password: password.current.value,
        };

        const user = await actions.signUp(credentials);
        if (user !== null && user.team !== "" && user.userName != "" && user.organization !== "") {
          navigate("/" + user.team + "/dashboard");
        } else {
          M.toast({ html: "<span>An unexpected error occurred. Please,<br/>try again later!</span>" });
        } 
          
    }

    const handleCancel = (event) => {
        event.preventDefault();
        // navigate("/");
    };

    
    return (

    <div style={{display: "inline-flex", alignItems: "center", width: "100%", height: "550px"}}>
        <div style={{borderRadius: "8px", display: "block", width: "100%", marginTop: "160px"}}>
          <form onSubmit={handleSignUp}>
            <div className="row" style={{backgroundColor: "#8634A5", marginBottom: "25px !important", width: "500px", height: "640px", textAlign: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
              <div className="col s12 m12 l12">
                <div className="row" style={{backgroundColor: "#4B0B6D", color: "white", height: "42px", alignContent: "center", marginTop: "0"}}>
                    <div className="col s12 m12 l12">
                        + SIGNUP
                    </div>
                </div>
                <div className="row">
                    <div className="col s1 m1 l1"></div>
                    <div className="col s10 m10 l10" style={{color: "white", textAlign: "center", padding: "0"}}>Welcome to your team's new retrospective board!</div>
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="text"
                      className="form-control login"
                      id="name"
                      aria-describedby="name"
                      ref={name}
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="email"
                      className="form-control login"
                      id="email"
                      aria-describedby="email"
                      ref={email}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="text"
                      className="form-control login"
                      id="organization"
                      aria-describedby="organization name"
                      ref={organization}
                      placeholder="Enter organization name"
                    />
                  </div> 
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="text"
                      className="form-control login"
                      id="team"
                      aria-describedby="team name"
                      ref={team}
                      placeholder="Enter team name."
                    />
                  </div> 
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="text"
                      className="form-control login"
                      id="username"
                      aria-describedby="user name"
                      ref={username}
                      placeholder="Enter your username"
                    />
                  </div> 
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="password"
                      className="form-control login"
                      id="password"
                      ref={password}
                      placeholder="Password"
                    />
                  </div> 
                </div>
                <div className="row" style={{color: "white", textAlign: "center"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0, textAlign: "center"}}>
                    <button
                        className="add-team-btn"
                        type="submit"
                        style={{ backgroundColor: themeColor }}
                        >
                            SIGN UP
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </form>
        </div>
    </div>
 )};

export default SignUp;