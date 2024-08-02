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
          <a href="/" className="logo font-header">
            RetroBoard
          </a>
          <ul
            id="nav-mobile"
            className="right app-nav font-header hide-on-med-and-down"
          >
            <li style={{ position: "relative" }}>
              <RetrospectiveModal
                color={themeColor}
                teams={props.team}
                last_iteration={
                  data?.allRetrosByTeam[data?.allRetrosByTeam.length - 1]
                    .iteration
                }
              />{" "}
            </li>
            {/* <li style={{position: "relative"}}><Link to="#"><span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Team</Link></li> */}
            <li>
              <Link to="/retros">My Retros</Link>
            </li>
            {data?.allRetrosByTeam.length > 0 && (
              <li>
                <Link
                  to={
                    "/board/" +
                    props.team +
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
              <a href="/retros">My Retros</a>
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
            {/* <li><Link to="#">My Teams &nbsp;</Link></li> */}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
