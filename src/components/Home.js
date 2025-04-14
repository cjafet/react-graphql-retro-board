import React, {useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Home = () => {
    const { themeColor, timerColor, actions } = useContext(ThemeContext);
    const username = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    const handleLogin = async (event) => {  
        event.preventDefault();

        const credentials = {
            userName: username.current.value,
            password: password.current.value,
        };

        const user = await actions.signIn(credentials);
          if (user) {
            console.log("Logged user", user.data);
            // navigate("/" + user.team + "/dashboard");
            navigate("/admin");
          }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        // navigate("/");
    };

    
    return (

    <div style={{alignItems: "center", width: "100%", height: "330px", textAlign: "center", margin: "0"}}>
        <div style={{borderRadius: "8px", display: "inline-grid", width: "100%", height: "100%", margin: "0", textAlign: "center", alignItems: "center"}}>
          <form onSubmit={handleLogin}>
            <div className="row" style={{backgroundColor: "#8634A5", marginBottom: "25px !important", width: "500px", height: "325px", textAlign: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
              <div className="col s12 m12 l12">
                <div className="row" style={{backgroundColor: "#4B0B6D", color: "white", height: "42px", alignContent: "center", marginTop: "0"}}>
                    <div className="col s12 m12 l12">
                        + LOGIN
                    </div>
                </div>
                <div className="row">
                    <div className="col s1 m1 l1"></div>
                    <div className="col s6 m6 l6" style={{color: "white", textAlign: "left", padding: "0"}}>Welcome back!</div>
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

export default Home;