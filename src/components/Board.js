import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

// App Components
import RetroItem from "./RetroItem";
import BoardForm from "./BoardForm";
import ErrorBoundary from "./ErrorBoundary";
import Timer from "./Timer";
import { GET_ITEMS_BY_ITERATION } from "../constants/Queries";
import { ADD_ITEM } from "../constants/Mutations";
import { ITEMS_SUBSCRIPTION } from "../constants/Subscription";
import { BOARD_ITEMS, BOARD_TITLES } from "../constants/AppConstants";
import Network from "./Network";

/**
 * Board component used to render all the items of any Retrospective board by iteration number and team name.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Board = (props) => {
  const [itemDescription, setItemDescription] = useState();
  const [itemType, setItemType] = useState("kudos");
  const [boardData, setBoardData] = useState();
  const [asyncError, setAsyncError] = useState();
  console.log("Board data", boardData);

  /** Gets iteration and team params from the URL to use in the graphQL query*/
  let { iteration, team } = useParams();
  console.log("Iteration#: ", iteration);

  /** Sets the query to get all board Items by iteration and team*/
  let { loading, error, data, refetch } = useQuery(GET_ITEMS_BY_ITERATION, {
    variables: { productTeam: team, iteration: parseInt(iteration) },
    // onCompleted: setBoardData
  });
  console.log("Data items:", data);

  const { data: dataItems, loadingItems } = useSubscription(ITEMS_SUBSCRIPTION);
  // const { dataItems, loadingItems } = useSubscription(ITEMS_SUBSCRIPTION, {
  //   variables: { input },
  // });
  console.log("loadingItems Subscription", loadingItems);
  console.log("dataItems Subscription", dataItems);
  if (dataItems) {
    refetch({ productTeam: team, iteration: parseInt(iteration) });
    console.log("Data added from pubsub");
  }

  useEffect(() => {
    const onCompleted = (data) => {
      setBoardData(data);
    };
    const onError = (err) => {
      console.log(err);
      setAsyncError(err);
    };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);

  /** Sets the mutation to add an Item to the board and sets the query to fecth updated data from the server*/
  const [addItem, { dataMutation, loadingMutation, errorMutation }] =
    useMutation(ADD_ITEM, {
      refetchQueries: [
        GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
        "allByIterationAndTeam", // Query name
      ],
    });

  // if (error) return <p>{JSON.stringify(error)}</p>;
  if (loading) return <p>Loading...</p>;
  if (errorMutation) return <p>{errorMutation}</p>;
  if (loadingMutation) return <p>Loading...</p>;
  console.log(data);
  console.log(dataMutation);

  /** Function used to pass query data and render each item in the RetroItem Component*/
  const renderItems = (data, retroItem, iteration, index) => {
    console.log("data: ", data);
    console.log(retroItem);
    if (
      iteration > 0 &&
      data?.retroByIterationAndTeam != null &&
      data?.retroByIterationAndTeam[retroItem] != null
    ) {
      return data?.retroByIterationAndTeam[retroItem].map((item) => {
        console.log(item);
        return (
          <RetroItem
            key={item.itemId != null ? item.itemId : uuidv4()}
            id={data?.retroByIterationAndTeam?._id}
            item={item}
            iteration={iteration}
          />
        );
      });
    }
  };

  return (
    <div className="App">
      <div className="tasks">
        <ErrorBoundary>
          <Network networkError={asyncError} />
          <BoardForm
            labels={data?.retroByIterationAndTeam?.labels}
            itemDescription={itemDescription}
            setItemDescription={setItemDescription}
            itemType={itemType}
            setItemType={setItemType}
            addItem={addItem}
            // LatestItem={LatestItem}
            retroId={data?.retroByIterationAndTeam?._id}
          />
          <Timer></Timer>
          {data?.retroByIterationAndTeam?.labels != null && (
            <div className="task-lists">
              {data?.retroByIterationAndTeam?.labels.map((name, index) => (
                <div key={uuidv4()} className="item-col-space">
                  <p className="font-header">{name}</p>
                  {renderItems(boardData, BOARD_ITEMS[index], iteration, index)}
                </div>
              ))}
            </div>
          )}
          {data?.retroByIterationAndTeam?.labels == null && (
            <div className="task-lists">
              {BOARD_TITLES.map((name, index) => (
                <div key={uuidv4()} className="item-col-space">
                  <p className="font-header">{name}</p>
                  {renderItems(boardData, BOARD_ITEMS[index], iteration, index)}
                </div>
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Board;
