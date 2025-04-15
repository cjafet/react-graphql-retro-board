import React, {useContext, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import M from "materialize-css";

/**
 * SignUp component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const UserSignUp = () => {
    const { themeColor, actions } = useContext(ThemeContext);
    const userTeam = useRef(null)
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null);
    const userHash = useRef(null);
    let { team, hash } = useParams();
    console.log(team, hash);

    const navigate = useNavigate();

    const handleSignUp = async (event) => {  
        event.preventDefault();

        const credentials = {
            name: name.current.value,
            email: email.current.value,
            team: userTeam.current.value,
            password: password.current.value,
            hash: userHash.current.value
        };

        const user = await actions.userSignUp(credentials);
        if (user.name.length !== 0 && user.email.length !== 0) {
          navigate("/" + credentials.team + "/" + credentials.hash + "/signin");
        } else {
          M.toast({ html: "<span>An unexpected error occurred. Please,<br/>try again later!</span>" });
        } 
    }

    const handleCancel = (event) => {
        event.preventDefault();
        // navigate("/");
    };

    
    return (

    <div style={{display: "inline-flex", alignItems: "center", width: "100%", height: "400px"}}>
        <div style={{borderRadius: "8px", display: "block", width: "100%", marginTop: "100px"}}>
          <form onSubmit={handleSignUp}>
            <div className="row" style={{backgroundColor: "#8634A5", marginBottom: "25px !important", width: "500px", height: "425px", textAlign: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
              <div className="col s12 m12 l12">
                <div className="row" style={{backgroundColor: "#4B0B6D", color: "white", height: "42px", alignContent: "center", marginTop: "0"}}>
                    <div className="col s12 m12 l12">
                        + SIGNUP
                    </div>
                </div>
                <div className="row">
                    <div className="col s1 m1 l1"></div>
                    <div className="col s10 m10 l10" style={{color: "white", textAlign: "center", padding: "0"}}>Welcome back!</div>
                </div>
                <div className="row" style={{color: "white", textAlign: "left"}}>
                  <div className="col s1 m1 l1"></div>
                  <div className="col s10 m10 l10" style={{padding: 0, margin: 0}}>
                    <input
                      type="name"
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
                <input
                    type="hidden"
                    className="form-control login"
                    id="team"
                    aria-describedby="team name"
                    ref={userTeam}
                    defaultValue={team}
                />
                <input
                  type="hidden"
                  className="form-control login"
                  id="hash"
                  aria-describedby="hash"
                  ref={userHash}
                  defaultValue={hash}
                />
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

export default UserSignUp;