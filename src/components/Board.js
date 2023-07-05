import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client'; 
import { v4 as uuidv4 } from 'uuid';

// App Components
import RetroItem from './RetroItem';
import { GET_ITEMS_BY_ITERATION } from "../constants/Queries";
import { ADD_ITEM } from "../constants/Mutations";
import BoardForm from "./BoardForm";
import { BOARD_ITEMS, BOARD_TITLES } from "../constants/AppConstants";

/**
 * Board component used to render all the items of any Retrospective board by iteration number and team name.
 */
const Board = props => {

  const [itemDescription, setItemDescription] = useState();
  const [itemType, setItemType] = useState("kudos");
  
  /** Gets iteration an team params from the URL to be used in the graphQL query*/
  let { iteration, team } = useParams();
  console.log("Iteration#: ", iteration);

  /** Sets the query to get all board Items by iteration and team*/
  const { loading, error, data } = useQuery(GET_ITEMS_BY_ITERATION, {
    variables: { productTeam: team, iteration: parseInt(iteration) },
  });
  
  /** Sets the mutation to add an Item to the board and sets the query to fecth updated data from the server*/
  const [addItem, { dataMutation, loadingMutation, errorMutation }] = useMutation(ADD_ITEM, {
    refetchQueries: [
       GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
      'allByIterationAndTeam' // Query name
    ],
  });

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;
  if (errorMutation) return <p>{errorMutation}</p>;
  if (loadingMutation) return <p>Loading...</p>;
  console.log(data);
  console.log(dataMutation);

  /** Function used to pass query data and render each item in the RetroItem Component*/
  const renderItems = (data, retroItem, iteration, index) => {
    console.log("data: ", data);
    console.log(retroItem);
    if(iteration>0 && data.retroByIterationAndTeam!=null) {     
      return data?.retroByIterationAndTeam[retroItem].map(item => {
          console.log(item);
          return (<RetroItem key={item.itemId} id={data?.retroByIterationAndTeam?._id} item={item} iteration={iteration} />);
      })
    }
  }

  return (
    <div className="App">
      <div className="tasks">
        <BoardForm
        itemDescription={itemDescription}
        setItemDescription={setItemDescription} 
        itemType={itemType}
        setItemType={setItemType}
        addItem={addItem}
        retroId={data?.retroByIterationAndTeam?._id}
        />
        <div className="task-lists"> 
          {BOARD_TITLES.map((name,index) => (
            <div key={uuidv4()} className="item-col-space">
              <p className="font-header">{name}</p>
              {renderItems(data, BOARD_ITEMS[index], iteration, index)}
            </div>
            )
          )}
        </div>
      </div>
    </div>
    
  );
}

export default Board;
