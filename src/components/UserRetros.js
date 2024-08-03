import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS_BY_TEAM } from "../constants/Queries";
import { ThemeContext } from "./context/ThemeContext";

/**
 * UserRetros component used to render(list) all user retrospectives.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const UserRetros = (props) => {
  const { themeColor } = useContext(ThemeContext);
  const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER || 7000;

  console.log("props", props);

  let team = "cjafet";

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
    data.allRetrosByTeam.forEach(async (element) => {
      let data = {
        "query":
          "query allByIterationAndTeam($productTeam: String!, $iteration: Int!) { retroByIterationAndTeam(productTeam: $productTeam, iteration: $iteration) { kudos { description likes } improvements { description likes } actionItems { description likes } lastActionItems { description likes } } }",
        "variables": { "productTeam": team, "iteration": element.iteration },
      };

      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        // mode: "cors",
      };

      const response = await fetch(GRAPHQL_SERVER, fetchOptions);
      console.log("UserRetros fetch", response);
    });
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "400px",
        adding: "0 13%",
      }}
    >
      {error && (
        <div
          style={{
            backgroundColor: "#ed143d",
            borderRadius: "8px",
            display: "flex",
            width: "520px",
            maxWidth: "520px",
          }}
        >
          <ul style={{ display: "flex", color: "white" }}>
            <li>
              <i
                className="material-icons icn-error"
                style={{
                  fontSize: "77px",
                  marginLeft: "10px",
                  marginTop: "2px",
                  marginRight: "6px",
                }}
              >
                info
              </i>
            </li>
            <li style={{ textAlign: "left" }}>
              <h5>
                <strong>Could not fetch data from the server.</strong>
              </h5>
              1. Check if the GraphQL server is up and running.
              <br />
              2. Create a new Retrospective board to get started.
            </li>
          </ul>
        </div>
      )}

      {!error &&
        data?.allRetrosByTeam.map((it) => {
          return (
            <div
              key={it.iteration}
              style={{ margin: "10px 10px", float: "left" }}
            >
              <div
                className="task-header-retros"
                style={{ minHeight: "auto", backgroundColor: themeColor }}
              >
                <div className="task-body">
                  <a
                    href={"/board/" + props.team + "/" + it.iteration}
                    style={{ color: "white" }}
                  >
                    {props.team} - {it.iteration}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserRetros;
