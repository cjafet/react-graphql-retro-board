import React from 'react';
import { useMutation } from '@apollo/client';  
import M from 'materialize-css'
import { DELETE_ITEM, ADD_ITEM_LIKE } from '../constants/Mutations';
import { GET_ITEMS_BY_ITERATION } from '../constants/Queries';

const RetroItem = props => {
    console.log(props);
    const handleDelete = (item) => {
        deleteItem({ variables: { id: props.id, desc: props.kudos.description, type: props.kudos.type } });
        var toastHTML = '<span>Item deleted !</span>';
        M.toast({html: toastHTML})
        console.log("Item: ",item);
    }
    const handleLike = (item) => {
        likeItem({ variables: { id: props.id, desc: props.kudos.description, type: props.kudos.type } });
        var toastHTML = '<span>You like an Item!</span>';
        M.toast({html: toastHTML})
        console.log("Item: ",item);
    }
    const [deleteItem, { dataMutation, loadingMutation, errorMutation }] = useMutation(DELETE_ITEM, {
        refetchQueries: [
           GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
          'allByIterationAndTeam' // Query name
        ],
    });
    const [likeItem, { dataLike, loadingLike, errorLike }] = useMutation(ADD_ITEM_LIKE, {
        refetchQueries: [
           GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
          'allByIterationAndTeam' // Query name
        ],
    });
    return (
        <div className="task">
            <div className="task-header">
                <input type="hidden" value={props.kudos.type} />
                <div id={props.kudos.like} className="task-body">
                {props.kudos.description}
                </div>
            </div>
            <div className="like-content">
                <div style={{marginLeft: "5%"}}>
                    <a href="#" onClick={() => handleLike(props)} className="btn-secondary like-review" style={{color: "white"}}>+ {props.kudos.likes}</a>
                </div>
                <div style={{marginLeft: "78%"}}>
                    <a href="#" onClick={() => handleDelete(props)}><span style={{color: "white"}}>x</span></a>
                </div>
            </div>
        </div>
    );
}


export default RetroItem;