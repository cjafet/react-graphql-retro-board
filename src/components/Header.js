import React, { useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import RetrospectiveModal from "./modals/RetrospectiveModal";
import { ThemeContext } from "./context/ThemeContext";

import { GET_ITEMS_BY_TEAM } from "../constants/Queries";
// import MoodModal from "./modals/MoodModal";

/**
 * Header component used to render the top navigation menu.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Header = (props) => {
  const { themeColor, actions } = useContext(ThemeContext);
  const authUser = JSON.parse(localStorage.getItem('loggedUser'));
  let userTeam = "";
  if (authUser !== null && authUser.team !== null && authUser.team?.length !== 0) {
    userTeam = authUser.team;
  }
  console.log(props);
  const navigate = useNavigate();

  /** Gets team param from the URL to use in the graphQL query*/
  let params = useParams();
  console.log("Header for team: ", params.team);

  const location = useLocation();
  console.log(location.pathname);

  /** Sets the query to get all team retrospectives*/
  const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
    variables: { productTeam: userTeam },
  });

  if (error) console.log("Error querying for items");

  if (!loading && data && authUser !== null && authUser.team !== null && authUser?.team.length !== 0) {
    console.log(
      "last_iteration",
      data?.allRetrosByTeam[data?.allRetrosByTeam.length - 1]?.iteration
    );
    console.log("all_retros_by_team", data.allRetrosByTeam);
    console.log("Header data: ", data);
  }

  /** Function used to calculate the number of likes per iteration*/
  const truncate = (username) => {
    if(username.length > 10 ) {
      return username.substring(0,10) + "...";
    }
    return username;
  };

  /** Function used to logOut user*/
  const handleLogout = () => {
    actions.logOut();
    navigate("/");
  };

  /** Function used to send user to sign up page*/
  const handleUserSignUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <React.Fragment>
      <ul id="dropdown2" className="dropdown-content">
          <li><a href="/settings">Settings</a></li>
          { authUser !== null && authUser?.organization !== "" && authUser?.userName !== "" && (
            <li><a href="/admin">Add team</a></li>
          )}
          { authUser !== null && authUser?.organization !== "" && authUser?.userName !== "" && (
            <li><a href="/admin/teams">View teams</a></li>
          )}
          <li><a href="#" onClick={handleLogout}>Log Out</a></li>
      </ul>
      <nav style={{ backgroundColor: themeColor }}>
        <div className="nav-wrapper">
          <ul
            id="nav-mobile"
            className="font-header"
            style={{ marginLeft: "6%" }}
          >
            <li>
              <Link reloadDocument to="/" className="logo font-header">
                <img src="/oneretro-white-logo-transp.png" alt="oneretro-logo" style={{marginTop: "13px", maxHeight: "38px"}} />
              </Link>
            </li>
          </ul>
          <ul id="nav-mobile" className="menu font-header hide-on-med-and-down">
            {authUser && data?.allRetrosByTeam && (            
              <li>
                <RetrospectiveModal
                  color={themeColor}
                  teams={userTeam}
                  last_iteration={
                    data?.allRetrosByTeam[data?.allRetrosByTeam.length - 1]
                      ?.iteration
                  }
                />
              </li>
            )}
            <li>
              {/* <MoodModal /> */}
            </li>
            {/* <li style={{position: "relative"}}><Link to="#"><span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Team</Link></li> */}
            {authUser && (  
            <li>
              <Link reloadDocument to={userTeam + '/dashboard'}>
                Dashboard
              </Link>
            </li>
            )}
            {data?.allRetrosByTeam.length > 0 && (
              <li>
                <Link
                  to={
                    "/board/" +
                    userTeam +
                    "/" +
                    data?.allRetrosByTeam[data?.allRetrosByTeam.length - 1]
                      .iteration
                  }
                >
                  Board
                </Link>
              </li>
            )}
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            {!authUser && (
              <li
                style={{
                  marginTop: "5px",
                  paddingLeft: "16px",
                  fontSize: "16px",
                  position: "absolute", top: "-7px", right: "12%"
                }}
              >
                  <button
                    className="signup-btn"
                    style={{ borderRadius: "22px", backgroundColor: "white", color: themeColor, margin: "15px 0", padding: "0 30px", lineHeight: "0", fontSize: "18px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 15px" }}
                    onClick={handleUserSignUp}
                  >
                    sign up
                  </button>
              </li>
            )}
            {authUser && (
            <li>
              <a className="dropdown-trigger" href="#!" data-target="dropdown2">
                  <div style={{position: "absolute", top: "0", right: "12%",marginRight: "100px",}}>
                    { !location.pathname.includes("/board/") && 
                      !location.pathname.includes("settings") && (
                      <i className="tiny material-icons">person_outline</i>
                    )}
                    {userTeam?.toString() !== undefined && !location.pathname.includes("/board/") && 
                      !location.pathname.includes("settings") && (
                        <span style={{position: "absolute", top: "1px",left: "30px", textTransform: "capitalize", width: "max-content"}}>
                          {truncate(userTeam + " Team")} <span style={{position: "absolute", top: "-1px",left: "85px"}}><i className="material-icons right">arrow_drop_down</i></span>
                        </span>
                    )}
                  </div>
                </a>
            </li>
            )}
            {/* <li><Link to="#">My Teams &nbsp;</Link></li> */}
            {/* {props.team.toString() !== "" && (
              <li style={{ marginLeft: "20px", fontSize: "18px" }}>
                {props.team.toString().toUpperCase()} TEAM
              </li>
            )} */}
          </ul>
          {/* <ul id="nav-mobile" className="font-header hide-on-med-and-down">
            <li>
              <i className="small material-icons">account_circle</i>
            </li>
          </ul> */}
          <ul className="right font-header hide-on-med-and-up show-on-medium-and-down">
            <li className="show-on-medium-and-down">
              <a
                className="dropdown-trigger show-on-medium-and-down"
                href="#!"
                data-target="dropdown1"
              >
                <i className="material-icons right">menu</i>
              </a>
            </li>
          </ul>
          <ul
            id="dropdown1"
            className="dropdown-content show-on-medium-and-down"
          >
            {/* <li style={{position: "relative"}}><RetrospectiveModal teams={props.team} last_iteration={data?.allRetrosByTeam[data?.allRetrosByTeam.length-1].iteration} /> </li> */}
            {/* <li style={{position: "relative"}}><Link to="#"><span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Team</Link></li> */}
            <li>
              <a href={userTeam + '/dashboard'}>Dashboard</a>
            </li>
            {data?.allRetrosByTeam.length > 0 && (
              <li>
                <a
                  href={
                    "/board/" +
                    userTeam +
                    "/" +
                    data?.allRetrosByTeam[data?.allRetrosByTeam.length - 1]
                      .iteration
                  }
                >
                  Board
                </a>
              </li>
            )}
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            {userTeam?.toString() === "" && authUser !== null && authUser?.organization !== "" && (
              <li
                style={{
                  marginTop: "5px",
                  paddingLeft: "16px",
                  fontSize: "16px",
                }}
              >
                <strong>{userTeam.toString().toUpperCase()} TEAM</strong>
              </li>
            )}
            {userTeam?.toString() === "" && authUser !== null && authUser?.organization !== "" && (
              <li
                style={{
                  marginTop: "5px",
                  paddingLeft: "16px",
                  fontSize: "16px",
                }}
              >
                <strong>{authUser.organization.toString().toUpperCase()} TEAM</strong>
              </li>
            )}
            {/* <li>
              <i className="small material-icons">account_circle</i>
            </li> */}
          </ul>
        </div>
        
      </nav>
    </React.Fragment>
  );
};

export default Header;
