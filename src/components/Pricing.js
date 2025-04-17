import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons";


/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Pricing = () => {
    const { themeColor } = useContext(ThemeContext);
    const navigate = useNavigate();

    /** Function used to send user to sign up page*/
    const handleUserSignUp = (event) => {
      event.preventDefault();
      navigate("/signup");
    };
    
    return (

            <div className="row" style={{position: "absolute", left: "95px", right: "0", marginInline: "auto", width: "fit-content", top: "15%"}}>
              <div className="col s4 m4 l4" style={{backgroundColor: themeColor, maxWidth: "30%", color: "white", textAlign: "center", padding: "0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px"}}>
                  <ul style={{lineHeight: "28px"}}>
                    <li style={{backgroundColor: "#8634a5", fontWeight: "bold", marginTop: "40px", marginBottom: "40px", width: "100%"}}>
                        <h3 style={{padding: "20px"}}>UP TO <br/>50 TEAMS</h3>
                    </li>
                    <li style={{lineHeight: "35px"}}>                    
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Analysis of team mood in every sprint retro
                    </li>
                    <li style={{lineHeight: "35px"}}> 
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Team engagement and sentiment analysis
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s DashBoard
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s history</li>
                  </ul>
                    <h6 style={{lineHeight: "32px", padding: "0 20px"}}>
                      Get insights at every step of your team, so it can keep doing an awesome job!!
                    </h6>
                    <button
                      className="add-team-btn"
                      style={{ borderRadius: "22px", backgroundColor: "#8634a5", margin: "35px 0 45px 0", lineHeight: "0", fontSize: "22px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px" }}
                      onClick={handleUserSignUp}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} color="white" style={{fontSize: "22px"}} /> $7.99/mo
                    </button>
              </div>
              <div className="col s4 m4 l4" style={{backgroundColor: themeColor, maxWidth: "30%", color: "white", textAlign: "center", margin: "0 20px", padding: "0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px"}}>
                  <ul style={{lineHeight: "28px"}}>
                    <li style={{backgroundColor: "#8634a5", fontWeight: "bold", marginTop: "40px", marginBottom: "40px", width: "100%"}}>
                        <h3 style={{padding: "20px"}}>UP TO <br/>250 TEAMS</h3>
                    </li>
                    <li style={{lineHeight: "35px"}}>                    
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Analysis of team mood in every sprint retro
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Team engagement and sentiment analysis
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s DashBoard
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s history</li>
                  </ul>
                    <h6 style={{lineHeight: "32px", padding: "0 20px"}}>
                      Get insights at every step of your team, so it can keep doing an awesome job!!
                    </h6>
                    <button
                      className="add-team-btn"
                      style={{ borderRadius: "22px", backgroundColor: "#8634a5", margin: "35px 0 45px 0", lineHeight: "0", fontSize: "22px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px" }}
                      onClick={handleUserSignUp}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} color="white" style={{fontSize: "22px"}} /> $14.99/mo
                    </button>
              </div>
              <div className="col s4 m4 l4" style={{backgroundColor: themeColor, maxWidth: "30%", color: "white", textAlign: "center", padding: "0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px"}}>
                  <ul style={{lineHeight: "28px"}}>
                    <li style={{backgroundColor: "#8634a5", fontWeight: "bold", marginTop: "40px", marginBottom: "40px", width: "100%"}}>
                        <h3 style={{padding: "20px"}}>UP TO <br/>500 TEAMS</h3>
                    </li>
                    <li style={{lineHeight: "35px"}}>                    
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Analysis of team mood in every sprint retro
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Team engagement and sentiment analysis
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s DashBoard
                    </li>
                    <li style={{lineHeight: "35px"}}>
                      <FontAwesomeIcon icon={faCheck} color="white" style={{fontSize: "18px"}} /> &nbsp;
                      Your own team’s history</li>
                  </ul>
                    <h6 style={{lineHeight: "32px", padding: "0 20px"}}>
                      Get insights at every step of your team, so it can keep doing an awesome job!!
                    </h6>
                    <button
                      className="add-team-btn"
                      style={{ borderRadius: "22px", backgroundColor: "#8634a5", margin: "35px 0 45px 0", lineHeight: "0", fontSize: "22px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px" }}
                      onClick={handleUserSignUp}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} color="white" style={{fontSize: "22px"}} /> $24.99/mo
                    </button>
              </div>
            </div>
 )};

export default Pricing;