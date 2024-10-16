import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import RetrospectiveModal from "./modals/RetrospectiveModal";
import { ThemeContext } from "./context/ThemeContext";

import { GET_ITEMS_BY_TEAM } from "../constants/Queries";

/**
 * Header component used to render the top navigation menu.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Header = (props) => {
  const { themeColor } = useContext(ThemeContext);
  console.log(props);

  /** Sets the query to get all team retrospectives*/
  const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
    variables: { productTeam: props.team[0] },
  });

  if (error) console.log("Error querying for items");

  if (!loading && data) {
    console.log(
      "last_iteration",
      data?.allRetrosByTeam[data?.allRetrosByTeam.length - 1].iteration
    );
    console.log("all_retros_by_team", data.allRetrosByTeam);
    console.log("Header data: ", data);
  }

  return (
    <React.Fragment>
      <nav style={{ backgroundColor: themeColor }}>
        <div className="nav-wrapper">
          <ul
            id="nav-mobile"
            className="font-header"
            style={{ marginLeft: "9%" }}
          >
            <li>
              <Link reloadDocument to="/" className="logo font-header">
                RetroBoard
              </Link>
            </li>
          </ul>
          <ul id="nav-mobile" className="menu font-header hide-on-med-and-down">
            <li>
              <RetrospectiveModal
                color={themeColor}
                teams={props.team}
                last_iteration={
                  data?.allRetrosByTeam[data?.allRetrosByTeam.length - 1]
                    .iteration
                }
              />
            </li>
            {/* <li style={{position: "relative"}}><Link to="#"><span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Team</Link></li> */}
            <li>
              <Link reloadDocument to="/dashboard">
                Dashboard
              </Link>
            </li>
            {data?.allRetrosByTeam.length > 0 && (
              <li>
                <Link
                  to={
                    "/board/" +
                    props.team[0] +
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
              <Link to="/settings">Settings</Link>
            </li>
            {/* <li><Link to="#">My Teams &nbsp;</Link></li> */}
            {/* {props.team.toString() !== "" && (
              <li style={{ marginLeft: "20px", fontSize: "18px" }}>
                {props.team.toString().toUpperCase()} TEAM
              </li>
            )} */}
          </ul>
          {/* <ul id="nav-mobile" className="font-header hide-on-med-and-down">
            <li>
              <i class="small material-icons">account_circle</i>
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
              <a href="/dashboard">Dashboard</a>
            </li>
            {data?.allRetrosByTeam.length > 0 && (
              <li>
                <a
                  href={
                    "/board/" +
                    props.team +
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
              <Link to="/settings">Settings</Link>
            </li>
            {props.team.toString() !== "" && (
              <li
                style={{
                  marginTop: "5px",
                  paddingLeft: "16px",
                  fontSize: "16px",
                }}
              >
                <strong>{props.team.toString().toUpperCase()} TEAM</strong>
              </li>
            )}
            {/* <li>
              <i class="small material-icons">account_circle</i>
            </li> */}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
