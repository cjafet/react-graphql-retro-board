import React, { useState, useEffect } from "react";

const IterationStats = (props) => {
  console.log("statsProps", props);
  const [stats, setStats] = useState("{}");
  const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

  useEffect(() => {
    let data = {
      query:
        "query allByIterationAndTeam($productTeam: String!, $iteration: Int!) { retroByIterationAndTeam(productTeam: $productTeam, iteration: $iteration) { kudos { description likes } improvements { description likes } actionItems { description likes } lastActionItems { description likes } moods { angry sad tired happy xhappy } } }",
      variables: { productTeam: props.team, iteration: props.iteration },
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // mode: "cors",
    };

    fetch(GRAPHQL_SERVER, fetchOptions)
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((response) => {
        console.log("Response", response);
        setStats(JSON.stringify(response?.data.retroByIterationAndTeam));
        console.log("Stats detail", response?.data.retroByIterationAndTeam);
        if (props.lastIteration) {
          props.handleLastSprintSentiment(response?.data.retroByIterationAndTeam);
        }
      });
  }, [GRAPHQL_SERVER, props]);

  /** Function used to calculate the number of likes per iteration*/
  const handleLikesCount = () => {
    let count = 0;
    
    Object.keys(JSON.parse(stats)).forEach(function(key,index) {
      if(key !== "moods") {
        JSON.parse(stats)[key]?.forEach(function(item, index) {
          count += item["likes"];
          console.log("Item likes: ", item["likes"]);
        });
      }
    });

    console.log("Stats count: ", count);

    return count;
    
  };

  /** Function used to calculate iteration sentiment*/
  const handleSentimentAnalysis = () => {
    let sentiment = 
    (
      (JSON.parse(stats).kudos?.length-(JSON.parse(stats).improvements?.length+JSON.parse(stats).actionItems?.length))
      /(JSON.parse(stats).kudos?.length+JSON.parse(stats).improvements?.length+JSON.parse(stats).actionItems?.length)
    );

    if(sentiment>0) props.handleLowestSprintSentiment(sentiment);    

    return sentiment.toFixed(2);
  };

  return (
    <tr key={props.iteration}>
      <th scope="row">
        <a href={"/board/" + props.team + "/" + props.iteration} style={{color: props.color}}>
          {props.iteration}
        </a>
      </th>
      <td>{JSON.parse(stats).kudos?.length}</td>
      <td>{JSON.parse(stats).improvements?.length}</td>
      <td>{JSON.parse(stats).actionItems?.length}</td>
      <td>{JSON.parse(stats).lastActionItems?.length}</td>
      <td>{handleLikesCount()}</td>
      <td>{handleSentimentAnalysis()}</td>
      <td>{JSON.parse(stats)?.moods?.angry}</td>
      <td>{JSON.parse(stats)?.moods?.sad}</td>
      <td>{JSON.parse(stats)?.moods?.tired}</td>
      <td>{JSON.parse(stats)?.moods?.happy}</td>
      <td>{JSON.parse(stats)?.moods?.xhappy}</td>
    </tr>
  );
};

export default IterationStats;
