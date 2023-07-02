import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client'; 

// App Components
import RetroItem from './RetroItem';
import { GET_ITEMS_BY_ITERATION } from "../constants/Queries";
import { ADD_ITEM } from "../constants/Mutations";
import BoardForm from "./BoardForm";
import { BOARD_ITEMS, BOARD_TITLES } from "../constants/AppConstants";

let i = 1;

function renderItems(data, retroItem, iteration) {
  console.log("data: ", data);
  console.log(retroItem);
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
        <BoardForm 
        itemDescription={itemDescription}
        setItemDescription={setItemDescription} 
        itemType={itemType}
        setItemType={setItemType}
        addItem={addItem}
        data={data}
        />
        <div className="task-lists"> 
          {BOARD_TITLES.map((name,index) => (
            <div className="item-col-space">
              <p className="font-header">{name}</p>
              {renderItems(data, BOARD_ITEMS[index], iteration)}
            </div>
            )
          )}
        </div>
      </div>
    </div>
    
  );
}

export default Board;
