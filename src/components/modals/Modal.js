import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { request } from 'graphql-request'
import { ADD_RETRO } from "../../constants/Mutations";
import { GET_ITEMS_BY_ITERATION } from "../../constants/Queries";
import { GRAPHQL_SERVER } from '../../constants/AppConstants';


class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    console.log("team selection: ", event.target.value);
    this.setState({value: event.target.value});
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
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  addRetro(variables) {
    console.log(variables);
    request(GRAPHQL_SERVER, ADD_RETRO, variables)
      .then(console.log)
      .catch(console.error)
  }

  getLastIterationByTeam(variables) {
    console.log(variables);
    return request(GRAPHQL_SERVER, GET_ITEMS_BY_ITERATION, variables)
    .then(res => {
      console.log("Getting Last iteration: ", res);
      console.log("Getting Last Action Items: ", res.retroByIterationAndTeam.lastActionItems);
      return res.retroByIterationAndTeam.lastActionItems;
    })
    .catch(console.error)
  }

  render() {
    console.log("props", this.props);
    return (
        <React.Fragment>
        <a href="modal1" className="waves-light modal-trigger" data-target="modal1">
          <span style={{fontSize: "28px", position: "absolute", left: "0"}}>+</span> New Retrospective &nbsp;
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <nav>
            <div className="nav-wrapper">
              <h1 className="font-header modal-team-title">Create a new retrospective board</h1>
              <div style={{position: "relative"}}><a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat modal-close-position">X</a></div>
            </div>
          </nav>
          <div className="modal-team-form">
            <form className="new-task-form" onSubmit={e => {
              e.preventDefault();
              const sprint = document.getElementById("sprint").value;
              let team;
              if(this.props.teams.length>0) {
                team = document.getElementById("team");
                let value = team.options[team.selectedIndex].value;
                console.log(sprint, value);
              } else {
                team = document.getElementById("team").value;
                console.log(team);
              }
              if(sprint !== undefined && sprint !== '') {
                // const variables = {productTeam: this.props.teams[0], iteration: this.props.last_iteration};
                const variables = {productTeam: team, iteration: this.props.last_iteration};
                console.log(variables);
                if(this.props.teams.length>0) {
                  this.getLastIterationByTeam(variables).then(res =>{
                    console.log("Last Action Items", res);
                    this.addRetro({ input: { kudos: [], improvements: [], actionItems: [], lastActionItems: res, ownedBy: { productGroup: this.state.value, productTeam: this.state.value }, iteration: parseInt(sprint) } } );
                    var toastHTML = '<span>Retro board for sprint #' + sprint + ' added !</span>';
                    M.toast({html: toastHTML})
                  });
                } else {
                  this.addRetro({ input: { kudos: [], improvements: [], actionItems: [], lastActionItems: [], ownedBy: { productGroup: team, productTeam: team }, iteration: parseInt(sprint) } } );
                  var toastHTML = '<span>Retro board for sprint #' + sprint + ' added !</span>';
                  M.toast({html: toastHTML})
                }
              } else {
                var toast = '<span>Add a description!</span>';
                M.toast({html: toast, classes: 'toast-color'})
              }
            }}>
              <input
                className="modal-width-input"
                type="text"
                id="sprint"
                placeholder="Add your sprint #"
                defaultValue={""}
              />
              {this.props.teams.length>0 && (
              <select id="team" name="team" style={{display: "block", maxWidth: "75%"}} onChange={this.handleChange}>
                <option key={this.state.value} value={this.state.value}>Select a team</option>
                {this.props.teams.map((t) => <option key={this.state.value} value={t}>{t}</option>)}
              </select>
              )}
              {this.props.teams.length===0 && (
                <input
                className="modal-width-input"
                type="text"
                id="team"
                placeholder="Add your team name"
                defaultValue={""}
              />
              )}
              <button className="waves-effect waves-teal btn-flat" type="submit">Add</button>
            </form>
          </div>
          <div className="modal-footer">
          <div className="modal-footer">
          </div>
          </div>
        </div>
        </React.Fragment>
    );
  }
}

export default Modal;