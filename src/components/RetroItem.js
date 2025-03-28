import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import M from "materialize-css";
import { DELETE_ITEM, ADD_ITEM_LIKE, MOVE_ITEM } from "../constants/Mutations";
import { GET_ITEMS_BY_ITERATION } from "../constants/Queries";
import { ThemeContext } from "./context/ThemeContext";

/**
 * RetroItem component used to render each Item in the board.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const RetroItem = (props) => {
  const { themeColor, timerColor } = useContext(ThemeContext);
  console.log(props);

  /** Function used to handle deleting Items from the board*/
  const handleDelete = (item) => {
    deleteItem({
      variables: {
        id: props.id,
        itemId: props.item.itemId,
        desc: props.item.description,
        type: props.item.type,
      },
    });
    M.toast({ html: "<span>Item deleted !</span>" });
    console.log("Item: ", item);
  };

  /** Function used to hanlde likes in the board*/
  const handleLike = (item) => {
    likeItem({
      variables: {
        id: props.id,
        itemId: props.item.itemId,
        desc: props.item.description,
        type: props.item.type,
      },
    });
    M.toast({ html: "<span>You like an Item!</span>" });
    console.log("Item: ", item);
  };

  const handleMoveItem = (item, moveTo) => {
    // moveItem({ variables: { id: props.id, itemId: props.item.itemId} });
    moveItemTo({
      variables: {
        input: {
          _id: props.id,
          itemId: props.item.itemId,
          description: props.item.description,
          likes: props.item.likes,
          type: props.item.type,
          action: "move",
        },
        moveTo
      },
    });
    M.toast({ html: "<span>Item moved!</span>" });
    console.log("Item: ", item);
  };

  /** Sets the mutation to delete an Item from the board and sets the query to fecth updated data from the server*/
  const [deleteItem, { dataMutation, loadingMutation, errorMutation }] =
    useMutation(DELETE_ITEM, {
      refetchQueries: [
        GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
        "allByIterationAndTeam", // Query name
      ],
    });

  /** Sets the mutation to add a like to an Item in the board and sets the query to fecth updated data from the server*/
  const [likeItem, { dataLike, loadingLike, errorLike }] = useMutation(
    ADD_ITEM_LIKE,
    {
      refetchQueries: [
        GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
        "allByIterationAndTeam", // Query name
      ],
    }
  );

  /** Sets the mutation to move an Item in the board*/
  const [moveItemTo, { dataItem, loadingItem, errorItem }] = useMutation(
    MOVE_ITEM,
    {
      refetchQueries: [
        GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
        "allByIterationAndTeam", // Query name
      ],
    }
  );

  if (errorMutation) return <p>{errorMutation}</p>;
  if (loadingMutation) return <p>Loading...</p>;
  if (errorLike) return <p>{errorLike}</p>;
  if (loadingLike) return <p>Loading...</p>;
  if (errorItem) return <p>{errorItem}</p>;
  if (loadingItem) return <p>Loading...</p>;
  console.log(dataMutation);
  console.log(dataLike);
  console.log(dataItem);

  return (
    <div className="task col s3 l3">
      <div className="task-header" style={{ backgroundColor: themeColor }}>
        <input type="hidden" value={props.item.type} />
        <div className="task-body">{props.item.description}</div>
      </div>
      <div
        className="like-content"
        style={{ position: "relative", backgroundColor: timerColor }}
      >
        <div style={{ marginLeft: "3%" }}>
          <button
            onClick={() => handleLike(props)}
            className="btn-secondary like-review"
            style={{ color: "white" }}
          >
            + {props.item.likes}
          </button>
        </div>
        {props.item.type !== "actionItems" && props.item.type !== "kudos" && (
          <div
            style={{
              position: "absolute",
              marginLeft: "14%",
              top: "2px",
              right: "5%",
            }}
          >
            <button
              title="Move to Action Items"
              onClick={() => handleMoveItem(props, "actionItems")}
              className="btn-secondary like-review"
              style={{ color: "white" }}
            >
              <i className="material-icons right" style={{ fontSize: "22px" }}>
                swap_horiz
              </i>
            </button>
          </div>
        )}
        {props.item.type === "actionItems" && (
          <div
            style={{
              position: "absolute",
              marginLeft: "14%",
              top: "2px",
              right: "5%",
            }}
          >
            <button
              title="Move back to Improvements"
              onClick={() => handleMoveItem(props, "improvements")}
              className="btn-secondary like-review"
              style={{ color: "white" }}
            >
              <i className="material-icons right" style={{ fontSize: "22px" }}>
                swap_horiz
              </i>
            </button>
          </div>
        )}
        <div style={{ marginLeft: "89%" }}>
          <button
            onClick={() => handleDelete(props)}
            style={{ background: "none", border: "0" }}
          >
            <span style={{ color: "white" }}>x</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetroItem;
