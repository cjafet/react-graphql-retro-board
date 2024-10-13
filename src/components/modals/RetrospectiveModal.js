import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { request } from "graphql-request";
import { ADD_RETRO } from "../../constants/Mutations";
import {
  GET_ITEMS_BY_TEAM,
  GET_LAST_ACTION_ITEMS_BY_ITERATION,
} from "../../constants/Queries";

/**
 * RetrospectiveModal component used to render the form to add a new retrospective item to the board.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
class RetrospectiveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamValue: "",
      message: "",
      labels: [],
    };
  }

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
        console.log(this.props.teams);
        console.log(this.props.last_iteration);
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);
  }

  /**
   * Function used to handle team selection change.
   *
   * @param {Object} event - The object passed with the current form target element (select#team)
   * @public
   */
  handleTeamSelection = (event) => {
    console.log("team selection: ", event.target.value);
    this.setState({ teamValue: event.target.value });
  };

  handleLabelSelection = (event) => {
    console.log("lables selection: ", event.target.value);
    let values = event.target.value;
    let labels = values.split(",");
    this.setState({ labels: [...labels] });
  };

  handleActionItems = (actionItems) => {
    actionItems.map(item => item["type"]="lastActionItems")
    return actionItems;
  };

  /**
   * Function used to handle team iteration creation.
   *
   * @param {string} team - The team name
   * @param {string} sprint - The sprint number
   * @param {Object} variables - The object used to send the productTeam and iteration values
   * @public
   */
  handleIterationCreation = (team, sprint, variables) => {
    this.getTeamIterations({ productTeam: team }).then((iterations) => {
      if (!iterations.includes(parseInt(sprint))) {
        this.getLastIterationByTeam(variables).then((res) => {
          this.addRetro({
            input: {
              labels: this.state.labels,
              kudos: [],
              improvements: [],
              actionItems: [],
              lastActionItems: res ? this.handleActionItems(res.actionItems) : [],
              ownedBy: { productTeam: team },
              iteration: parseInt(sprint),
            },
          });
          document.getElementById("retro-modal").click();
          window.location.replace("/dashboard");
        });
      } else {
        this.setState({ message: "Sprint already exists" });
      }
    });
  };

  /**
   * Sets the mutation to add/create a new Retrospective board for the reported sprint iteration.
   *
   * @param {Object} variables - The object used to send the Retrospective value
   * @public
   */
  addRetro(variables) {
    console.log(variables);
    request(process.env.REACT_APP_GRAPHQL_SERVER, ADD_RETRO, variables)
      .then(console.log)
      .catch(console.error);
  }

  /**
   * Sets the query to get all Items from the last iteration to return filter.
   *
   * @param {Object} variables - The object used to send the productTeam and iteration values
   * @public
   */
  getLastIterationByTeam(variables) {
    console.log(variables);
    return request(
      process.env.REACT_APP_GRAPHQL_SERVER,
      GET_LAST_ACTION_ITEMS_BY_ITERATION,
      variables
    )
      .then((res) => {
        console.log("Getting Last iteration: ", res);
        console.log("Getting Last Action Items: ", res.retroByIterationAndTeam);
        return res.retroByIterationAndTeam;
      })
      .catch(console.error);
  }

  /**
   * Sets the query to get all team iterations.
   *
   * @param {Object} variables - The object used to send the productTeam value
   * @public
   */
  getTeamIterations(variables) {
    let arrayIteration = [];
    return request(
      process.env.REACT_APP_GRAPHQL_SERVER,
      GET_ITEMS_BY_TEAM,
      variables
    )
      .then((res) => {
        res.allRetrosByTeam.map((it) => arrayIteration.push(it.iteration));
        return arrayIteration;
      })
      .catch(console.error);
  }

  render() {
    console.log("props", this.props);
    return (
      <React.Fragment>
        {/* <i class="custom-small material-icons">add</i> */}
        <a
          href="modal1"
          className="retrospective-menu waves-light modal-trigger"
          data-target="modal1"
        >
          New Retrospective
        </a>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <nav>
            <div
              className="nav-wrapper"
              style={{ backgroundColor: this.props.color }}
            >
              <h1 className="font-header modal-team-title">
                Create a new retrospective board
              </h1>
              <div style={{ position: "relative" }}>
                <button
                  id="retro-modal"
                  className="modal-action modal-close waves-effect waves-green btn-flat modal-close-position"
                >
                  X
                </button>
              </div>
            </div>
          </nav>
          <div className="modal-team-form">
            <form
              className="new-task-form"
              onSubmit={(e) => {
                e.preventDefault();
                const sprint = document.getElementById("sprint").value;
                let team = document.getElementById("team").value.toLowerCase();
                if (sprint !== undefined && sprint !== "" && team !== "") {
                  const variables = {
                    productTeam: team,
                    iteration: this.props.last_iteration,
                  };
                  if (this.props.teams.length > 0) {
                    this.handleIterationCreation(team, sprint, variables);
                  } else {
                    this.addRetro({
                      input: {
                        kudos: [],
                        improvements: [],
                        actionItems: [],
                        lastActionItems: [],
                        ownedBy: { productTeam: team },
                        iteration: parseInt(sprint),
                      },
                    });
                    document.getElementById("retro-modal").click();
                    window.location.replace("/dashboard");
                  }
                } else {
                  let msg =
                    team === ""
                      ? "Please, add your team name!"
                      : "Please, add a sprint number!";
                  this.setState({ message: msg });
                }
              }}
            >
              <input
                className="modal-width-input"
                type="number"
                id="sprint"
                placeholder="Add your sprint number"
                defaultValue={""}
              />
              {this.props.teams.length > 0 && (
                <select
                  id="team"
                  name="team"
                  style={{ display: "block", maxWidth: "75%" }}
                  onChange={this.handleTeamSelection}
                >
                  <option key={0} value="">
                    Select a team
                  </option>
                  {this.props.teams.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
              <select
                id="labels"
                name="labels"
                style={{ display: "block", maxWidth: "75%" }}
                onChange={this.handleLabelSelection}
              >
                <option key={0} value="">
                  Select title
                </option>
                <option
                  key={"kudos-improvements-action-items"}
                  value="Kudos, Improvements, Action items, Last Action items"
                >
                  Kudos, Improvements, Action Items, Last Action items
                </option>
                <option
                  key={"continue-stop-action-items"}
                  value="Continue, Stop, Action items, Last Action items"
                >
                  Continue, Stop, Action Items, Last Action items
                </option>
                <option
                  key={"wentwell-toimprove-action-items"}
                  value="Went Well, To Improve, Action items, Last Action items"
                >
                  Went well, To Improve, Action Items, Last Action items
                </option>
              </select>
              {this.props.teams.length === 0 && (
                <input
                  className="modal-width-input"
                  type="text"
                  id="team"
                  placeholder="Add your team name"
                  defaultValue={""}
                />
              )}
              <button
                className="waves-effect waves-teal btn-flat"
                type="submit"
              >
                Add
              </button>
              <div className="retro-error-message">{this.state.message}</div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="modal-footer"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RetrospectiveModal;
