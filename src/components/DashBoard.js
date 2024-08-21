import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS_BY_TEAM } from "../constants/Queries";
import { ThemeContext } from "./context/ThemeContext";
import IterationStats from "./IterationStats";

/**
 * UserRetros component used to render(list) all user retrospectives.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const DashBoard = (props) => {
  const { themeColor } = useContext(ThemeContext);
  console.log("props", props);

  /** Sets the query to get all team retrospectives*/
  const { loading, error, data } = useQuery(GET_ITEMS_BY_TEAM, {
    variables: { productTeam: props.team[0] },
    refetchQueries: [
      GET_ITEMS_BY_TEAM, // DocumentNode object parsed with gql
      "allByTeam", // Query name
    ],
  });

  if (error) console.log("Error querying items by team");

  if (!loading && data) {
    console.log(data.allRetrosByTeam);
    console.log("UserRetros data: ", data);
  }

  return (
    <div
      style={{
        // display: "inline-flex",
        alignItems: "center",
        height: "400px",
        adding: "0 13%",
        marginLeft: "110px",
        marginTop: "35px",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <canvas id="myChart"></canvas>
      </div>

      <table className="table responsive-table highlight">
        <thead key="00" style={{ color: "white", backgroundColor: themeColor }}>
          <tr key="0">
            <th key="sprint-number" scope="col">
              Sprint
            </th>
            <th key="sprint-kudos" scope="col">
              Kudos
            </th>
            <th key="sprint-improvs" scope="col">
              Improvs
            </th>
            <th key="sprint-actions" scope="col">
              Action Items
            </th>
            <th key="sprint-lactions" scope="col">
              Last Action Items
            </th>
            <th key="sprint-likes" scope="col">
              Likes
            </th>
          </tr>
        </thead>
        <tbody>
          {!error &&
            data?.allRetrosByTeam
              .slice(0)
              .reverse()
              .map((it) => {
                return (
                  <IterationStats
                    color={themeColor}
                    iteration={it.iteration}
                    team={props.team}
                  />
                );
              })}
        </tbody>
      </table>
      {error && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: themeColor,
            borderRadius: "8px",
            display: "flex",
            width: "460px",
            maxWidth: "460px",
          }}
        >
          <div style={{ display: "flex", color: "white", height: "70px" }}>
            <div style={{ lineHeight: "70px" }}>
              <i
                className="material-icons icn-error"
                style={{
                  fontSize: "42px",
                  marginLeft: "10px",
                  marginTop: "14px",
                  marginRight: "6px",
                }}
              >
                info
              </i>
            </div>
            <div
              style={{
                textAlign: "left",
                alignContent: "center",
                fontSize: "23px",
              }}
            >
              Could not fetch data from the server.
              {/* 1. Check if the GraphQL server is up and running.
              <br />
              2. Create a new Retrospective board to get started. */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
