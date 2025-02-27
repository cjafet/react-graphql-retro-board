import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { request } from "graphql-request";
import { GET_ITEMS_BY_TEAM } from "../constants/Queries";
import { ADD_OBJECTIVE } from "../constants/Mutations";
import { ThemeContext } from "./context/ThemeContext";

/**
 * UserRetros component used to render(list) all user retrospectives.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Okr = (props) => {
  const { themeColor } = useContext(ThemeContext);
  console.log("props", props);

  const handleYearSelection = (event) => {
    console.log("team selection: ", event.target.value);
    this.setState({ teamValue: event.target.value });
  };

  const addObjective = (variables) => {
    console.log(variables);
    request(process.env.REACT_APP_GRAPHQL_SERVER, ADD_OBJECTIVE, variables)
      .then(console.log)
      .catch(console.error);
  }

  const handleObjectiveCreation = (team, quarter, e) => {
          addObjective({
            input: {
              year: "2024",
              quarter,
              title: e.target[1].value,
              owner: team,
              dueDate: e.target[3].value,
              status: e.target[4].value,
            },
          });
          window.location.replace("/okrs"); 
  };

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
        marginRight: "110px",
        marginTop: "35px",
      }}
    >
      <ul>
        <li>
          <select
            id="year"
            name="year"
            style={{ display: "block", maxWidth: "100%" }}
            onChange={handleYearSelection}
          >
            <option key={0} value="">
              Select year
            </option>
            <option key={1} value="">
              2024
            </option>
          </select>
        </li>
      </ul>
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">
            <i class="material-icons">menu</i>Q1
          </div>
          <div class="collapsible-body">
            <table className="striped">
              <thead>
                <tr>
                  <th style={{ color: themeColor }}>
                    Objective 1 - PromoCode Endpoint
                  </th>
                  <th style={{ color: themeColor }}>Owner</th>
                  <th style={{ color: themeColor }}>Due Date</th>
                  <th style={{ color: themeColor }}>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>COMMS-13 - Create app template</td>
                  <td>carlos.jafet</td>
                  <td>30/09/2024</td>
                  <td>Done</td>
                </tr>
                <tr>
                  <td>COMMS-31 - Add Schema</td>
                  <td>carlos.jafet</td>
                  <td>30/09/2024</td>
                  <td>In Progress</td>
                </tr>
                <tr>
                  <td>COMMS-33 - Add test data</td>
                  <td>carlos.jafet</td>
                  <td>30/09/2024</td>
                  <td>In Progress</td>
                </tr>
              </tbody>
            </table>
            <form
              className="new-task-form"
              onSubmit={(e) => {
                e.preventDefault();
                let quarter = document
                  .getElementById("quarter")
                  .value.toLowerCase();
                if (props.team[0].length > 0) {
                  handleObjectiveCreation(props.team[0], quarter, e);
                }
              }}
            >
              <table>
                <tr>
                  <td>
                    <input
                      className="modal-width-input"
                      type="hidden"
                      name="quarter"
                      id="quarter"
                      defaultValue={"q1"}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="modal-width-input"
                      type="string"
                      id="title"
                      placeholder="Add objective title"
                      defaultValue={""}
                    />
                  </td>
                  <td>
                    <select
                      id="owner"
                      name="owner"
                      style={{ display: "block", maxWidth: "75%" }}
                    >
                      <option key="ow-0" value="select owner">
                        Select owner
                      </option>
                      <option key="ow-1" value="carlos.jafet">
                        carlos.jafet
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      id="date"
                      name="date"
                      style={{ display: "block", maxWidth: "75%" }}
                    >
                      <option key={0} value="">
                        Select end date
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      id="status"
                      name="status"
                      style={{ display: "block", maxWidth: "75%" }}
                    >
                      <option key="st-0" value="select status">
                        Select status
                      </option>
                      <option key="st-1" value="Backlog">
                        Backlog
                      </option>
                      <option key="st-2" value="In Progress">
                        In Progress
                      </option>
                      <option key="st-3" value="Done">
                        Done
                      </option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="waves-effect waves-teal btn-flat"
                      style={{ color: "white", backgroundColor: themeColor }}
                      type="submit"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </li>
        <li>
          <div class="collapsible-header">
            <i class="material-icons">menu</i>Q2
          </div>
          <div class="collapsible-body">
            <table>
              <thead>
                <tr>
                  <th>Objective 1 - PromoCode Endpoint</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>COMMS-13</td>
                  <td>carlos.jafet</td>
                  <td>Done</td>
                </tr>
                <tr>
                  <td>COMMS-31</td>
                  <td>carlos.jafet</td>
                  <td>In Progress</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li>
          <div class="collapsible-header">
            <i class="material-icons">menu</i>Q3
          </div>
          <div class="collapsible-body">
            <table>
              <thead>
                <tr>
                  <th>Objective 1 - PromoCode Endpoint</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>COMMS-13</td>
                  <td>carlos.jafet</td>
                  <td>Done</td>
                </tr>
                <tr>
                  <td>COMMS-31</td>
                  <td>carlos.jafet</td>
                  <td>In Progress</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li>
          <div class="collapsible-header">
            <i class="material-icons">menu</i>Q4
          </div>
          <div class="collapsible-body">
            <table>
              <thead>
                <tr>
                  <th>Objective 1 - PromoCode Endpoint</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>COMMS-13</td>
                  <td>carlos.jafet</td>
                  <td>Done</td>
                </tr>
                <tr>
                  <td>COMMS-31</td>
                  <td>carlos.jafet</td>
                  <td>In Progress</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>

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

export default Okr;
