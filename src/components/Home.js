import React, {useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";


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

    /** Function used to send user to sign up page*/
    const handleUserSignUp = (event) => {
      event.preventDefault();
      navigate("/signup");
    };

    
    return (

    <div style={{alignItems: "center", width: "100%", height: "330px", textAlign: "center", margin: "0"}}>
        <div style={{borderRadius: "8px", display: "inline-grid", width: "100%", height: "100%", margin: "0", textAlign: "center", alignItems: "center"}}>
            <div className="row" style={{marginTop: "70px", width: "100%", height: "600px", textAlign: "center"}}>
              <div className="col s1 m1 l1" style={{width: "6.3333333333%", paddingLeft: "15px"}}></div>
              <div className="col s5 m5 l5" style={{textAlign: "left", width: "43.6666666667%"}}>
                  <h3 style={{fontWeight: "bold", color: "#53047c"}}>Everything your team need <br/>and even more!!</h3>
                  <ul style={{lineHeight: "28px"}}>
                    <li>                    
                      <FontAwesomeIcon icon={faCheck} color="#53047c" style={{fontSize: "18px"}} /> &nbsp;
                      Analysis of team mood in every sprint retro
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} color="#53047c" style={{fontSize: "18px"}} /> &nbsp;
                      Team engagement and sentiment analysis
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} color="#53047c" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s DashBoard
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} color="#53047c" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s history</li>
                  </ul>
                    <h5 style={{marginTop: "30px", lineHeight: "32px"}}>
                      Get insights at every step of your team, so it can <br/>keep doing an awesome job!!
                    </h5>
                    <button
                      className="add-team-btn"
                      style={{ borderRadius: "22px", backgroundColor: themeColor, margin: "15px 0", lineHeight: "0", fontSize: "18px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px" }}
                      onClick={handleUserSignUp}
                    >
                      Start your 30 days free trial!
                    </button>
              </div>
              <div className="col s6 m6 l6" style={{margin: "0", padding: "0"}}>
                <img src="/images/oneretro-board.png" width="100%" height="100%" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 15px"}}/>
              </div>
            </div>
        </div>
    </div>
 )};

export default Home;