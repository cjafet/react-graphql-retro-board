import React from 'react';
import { useMutation } from '@apollo/client';  
import M from 'materialize-css'
import { DELETE_ITEM, ADD_ITEM_LIKE } from '../constants/Mutations';
import { GET_ITEMS_BY_ITERATION } from '../constants/Queries';

/**
 * RetroItem component used to render each Item in the board.
 */
const RetroItem = props => {
    console.log(props);
    
    /** Function used to handle deleting Items from the board*/
    const handleDelete = (item) => {
        deleteItem({ variables: { id: props.id, itemId: props.item.itemId, desc: props.item.description, type: props.item.type } });
        var toastHTML = '<span>Item deleted !</span>';
        M.toast({html: toastHTML})
        console.log("Item: ",item);
    }
    
    /** Function used to hanlde likes in the board*/
    const handleLike = (item) => {
        likeItem({ variables: { id: props.id, itemId: props.item.itemId, desc: props.item.description, type: props.item.type } });
        var toastHTML = '<span>You like an Item!</span>';
        M.toast({html: toastHTML})
        console.log("Item: ",item);
    }
    
    /** Sets the mutation to delete an Item from the board and sets the query to fecth updated data from the server*/
    const [deleteItem, { dataMutation, loadingMutation, errorMutation }] = useMutation(DELETE_ITEM, {
        refetchQueries: [
           GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
          'allByIterationAndTeam' // Query name
        ],
    });

    
    /** Sets the mutation to add a like to an Item in the board and sets the query to fecth updated data from the server*/
    const [likeItem, { dataLike, loadingLike, errorLike }] = useMutation(ADD_ITEM_LIKE, {
        refetchQueries: [
           GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
          'allByIterationAndTeam' // Query name
        ],
    });

    if (errorMutation) return <p>{errorMutation}</p>;
    if (loadingMutation) return <p>Loading...</p>;
    if (errorLike) return <p>{errorLike}</p>;
    if (loadingLike) return <p>Loading...</p>;
    console.log(dataMutation);
    console.log(dataLike);
    
    return (
        <div className="task">
            <div className="task-header">
                <input type="hidden" value={props.item.type} />
                <div className="task-body">
                {props.item.description}
                </div>
            </div>
            <div className="like-content">
                <div style={{marginLeft: "5%"}}>
                    <button onClick={() => handleLike(props)} className="btn-secondary like-review" style={{color: "white"}}>+ {props.item.likes}</button>
                </div>
                <div style={{marginLeft: "78%"}}>
                    <button onClick={() => handleDelete(props)} style={{background: "none", border: "0"}}><span style={{color: "white"}}>x</span></button>
                </div>
            </div>
        </div>
    );
}


export default RetroItem;