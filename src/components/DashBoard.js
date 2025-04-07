import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_ITEMS_BY_TEAM } from "../constants/Queries";
import { ThemeContext } from "./context/ThemeContext";
import IterationStats from "./IterationStats";
import ChartBar from "./ChartBar";
import Analysis from "./Analysis";

/**
 * DashBoard component used to render(list) all user retrospectives.
 *
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const DashBoard = (props) => {
  const { themeColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  if (authUser.team.length === 0) {
    navigate("/");
  }

  const [lastTeamSentiment, setLastTeamSentiment] = useState(0);
  const [lowestTeamSentiment, setLowestTeamSentiment] = useState(1);
  console.log("props", props);
  console.log("authUser", authUser);

  /** Gets team param from the URL to use in the graphQL query*/
  let { team } = useParams();
  console.log("Dashboard for team: ", team);

  let kudosCounter = 0, improvementsCounter = 0, actionItemsCounter = 0, 
  lastActionItemsCounter = 0, totalLikesCounter = 0, totalItemsCounter = 0;

  /** Sets the query to get all team retrospectives*/
  const { loading, error, data } = useQuery(GET_ALL_ITEMS_BY_TEAM, {
    variables: { productTeam: team },
    refetchQueries: [
      GET_ALL_ITEMS_BY_TEAM, // DocumentNode object parsed with gql
      "allByTeam", // Query name
    ],
  });

  /** Sets last sprint team sentiment*/
  const handleLastSprintSentiment = (stats) => {
    let lastSentiment = ((stats.kudos?.length-(stats.improvements?.length+stats.actionItems?.length))/(stats.kudos?.length+stats.improvements?.length+stats.actionItems?.length));
    console.log("lastSentiment", lastSentiment);
    setLastTeamSentiment(lastSentiment);
  };

  /** Sets lowest team sentiment*/
  const handleLowestSprintSentiment = (lowest) => {
    console.log("Lowest", lowest);
    if (lowest < lowestTeamSentiment) {
      setLowestTeamSentiment(() => lowest);
    }
  };

  if (error) console.log("Error querying items by team");

  if (!loading && data) {
    console.log(data.allRetrosByTeam);
    console.log("UserRetros data: ", data);
    data.allRetrosByTeam.forEach(el => {
      console.log("elemento", el);
      ["kudos", "improvements", "actionItems", "lastActionItems"]?.forEach(function(key,index) {
        el[key].forEach(function(item, index) {
          totalLikesCounter += item.likes;
          console.log("Item likes: ", item.likes);
        });
      });
      console.log("total likes:", totalLikesCounter);
      kudosCounter += el.kudos.length;
      improvementsCounter += el.improvements.length;
      actionItemsCounter += el.actionItems.length;
      lastActionItemsCounter += el.lastActionItems.length;
      totalItemsCounter = kudosCounter + improvementsCounter + actionItemsCounter + lastActionItemsCounter;
    });
  }

  return (
    <div
      style={{
        // display: "inline-flex",
        alignItems: "center",
        height: "600px",
        adding: "0 13%",
        marginLeft: "110px",
        marginTop: "35px",
      }}
    >

      {/* <div style={{backgroundColor: "#faebd7", maxWidth: "300px"}}> */}
        <div className="row" style={{alignItems: "center"}}>
          <div className="col" style={{backgroundColor: "#b326ef", width: "335px", margin: "10px", height: "100px"}}>
            <Analysis title={"General Sentiment Analysis"} data={(kudosCounter-improvementsCounter)/(kudosCounter+improvementsCounter)} />
          </div>
          <div className="col" style={{backgroundColor: "#b326ef", width: "335px", margin: "10px", height: "100px"}}>
            <Analysis title="Last Sentiment Analysis" data={lastTeamSentiment} />
          </div>
          <div className="col" style={{backgroundColor: "#b326ef", width: "335px", margin: "10px", height: "100px"}}>
            <Analysis title={"Lowest Sentiment Analysis"} data={lowestTeamSentiment} />
          </div>
          <div className="col" style={{backgroundColor: "#268def", width: "335px", margin: "10px", height: "100px"}}>
            <Analysis title={"Team Engagement"} data={totalLikesCounter/totalItemsCounter} />
          </div>
        </div>
      {/* </div> */}

      <div style={{width: "90%"}}>
        <ChartBar 
            kudos={kudosCounter} 
            improvements={improvementsCounter} 
            actionItems={actionItemsCounter}  
            lastActionItems={lastActionItemsCounter}
            totalLikeCount={totalLikesCounter}
        />
      </div>

      <table key="sprint-table" className="table responsive-table highlight">
        <thead key="t-head" style={{ color: "white", backgroundColor: themeColor }}>
          <tr key="t-row">
            <th key="sprint-number" scope="col">
              Sprint
            </th>
            <th key="sprint-kudos" scope="col">
              Kudos
            </th>
            <th key="sprint-improvs" scope="col">
              Improvs
            </th>
            <th key="sprint-actions" scope="col">
              Action Items
            </th>
            <th key="sprint-lactions" scope="col">
              Last Action Items
            </th>
            <th key="sprint-likes" scope="col">
              Likes
            </th>
            <th key="sprint-sentiment" scope="col">
              Sentiment
            </th>
          </tr>
        </thead>
        <tbody>
          {(!error && team !== "") &&
            data?.allRetrosByTeam
              .slice(0)
              .reverse()
              .map((it) => {
                return (
                  <IterationStats
                    color={themeColor}
                    iteration={it.iteration}
                    lastIteration={(it.iteration === data?.allRetrosByTeam.length) ? true : false}
                    team={team}
                    handleLastSprintSentiment={handleLastSprintSentiment}
                    handleLowestSprintSentiment={handleLowestSprintSentiment}
                  />
                );
              })}
        </tbody>
      </table>
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
          <div style={{ display: "flex", color: "#53047c", height: "70px" }}>
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
                color: "#53047c",
                textAlign: "left",
                alignContent: "center",
                fontSize: "23px",
              }}
            >
              Could not fetch data from server.
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

export default DashBoard;
