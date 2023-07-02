import React, { useState } from "react";
import { useParams } from "react-router-dom";
import M from 'materialize-css'
import { useQuery, useMutation } from '@apollo/client'; 

// App Components
import RetroItem from './RetroItem';
import { GET_ITEMS_BY_ITERATION } from "../constants/Queries";
import { ADD_ITEM } from "../constants/Mutations";

let i = 1;

function renderItems(data, retroItem, iteration) {
  console.log("data: ", data);
  if(iteration>0 && data.retroByIterationAndTeam!=null) {
    return data.retroByIterationAndTeam[retroItem].map(item => {
        console.log(item);
        return (<RetroItem key={i++} id={data.retroByIterationAndTeam._id} kudos={item} iteration={iteration} />);
    })
  }
}

const Board = props => {
  let { iteration, team } = useParams();
  console.log("Iteration#: ", iteration);
  const [itemDescription, setItemDescription] = useState();
  const [itemType, setItemType] = useState("kudos");
  const { loading, error, data } = useQuery(GET_ITEMS_BY_ITERATION, {
    variables: { productTeam: team, iteration: parseInt(iteration) },
  });
  const [addItem, { dataMutation, loadingMutation, errorMutation }] = useMutation(ADD_ITEM, {
    refetchQueries: [
       GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
      'allByIterationAndTeam' // Query name
    ],
  });
  console.log(data);

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <div className="tasks">
          <form className="new-task-form" onSubmit={e => {
            e.preventDefault();
            setItemDescription(document.getElementById("description").value);
            console.log(itemDescription,itemType);
            if(itemDescription !== undefined && itemDescription !== '') {
              addItem({ variables: { input: { _id: data.retroByIterationAndTeam._id, description: itemDescription, likes: 0, type: itemType, action: 'add' } } });
              var toastHTML = '<span>' + itemType + ' added !</span>';
              M.toast({html: toastHTML})
            } else {
              var toast = '<span>Add a description!</span>';
              M.toast({html: toast, classes: 'toast-color'})
            }
            
          }}>
            <input
              className="full-width-input"
              type="text"
              id="description"
              placeholder="Add your text"
              defaultValue={""}
              onChange={e => setItemDescription(e.target.value)}
            />
            <button className="waves-effect waves-teal btn-flat" type="submit">Add</button>
            <br/>
          </form>

          <div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => setItemType(e.target.value)}
                          value="kudos"
                          checked={itemType === "kudos"}
                      />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>kudos</div>
                  </label>
              </div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => setItemType(e.target.value)}
                          value="improvements"
                          checked={itemType === "improvements"}
                      />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>improvements</div>
                  </label>
              </div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => setItemType(e.target.value)}
                          value="actionItems"
                          checked={itemType === "actionItems"}
                      />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>actionItems</div>
                  </label>
              </div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => setItemType(e.target.value)}
                          value="lastActionItems"
                          checked={itemType === "lastActionItems"}
                      />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>lastActionItems</div>
                  </label>
              </div>
          </div>
       <div className="task-lists">
          <div className="item-col-space">
          <p className="font-header"> 
            Kudos
          </p>
          {renderItems(data, "kudos", iteration)}
          </div>
          <div className="item-col-space">
          <p className="font-header">Improvements</p>
          {renderItems(data, "improvements", iteration)}
          </div>
          <div className="item-col-space">
          <p className="font-header">Action Items</p>
          {renderItems(data, "actionItems", iteration)}
          </div>
          <div className="item-col-space">
          <p className="font-header">Last Action Items</p>
          {renderItems(data, "lastActionItems", iteration)}
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Board;
