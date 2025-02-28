import React, { useState, useEffect } from "react";

const IterationStats = (props) => {
  console.log("statsProps", props);
  const [stats, setStats] = useState("{}");
  const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

  useEffect(() => {
    let data = {
      query:
        "query allByIterationAndTeam($productTeam: String!, $iteration: Int!) { retroByIterationAndTeam(productTeam: $productTeam, iteration: $iteration) { kudos { description likes } improvements { description likes } actionItems { description likes } lastActionItems { description likes } } }",
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
      });
  }, [GRAPHQL_SERVER, props.iteration, props.team]);

  /** Function used to calculate the number of likes per iteration*/
  const handleLikesCount = () => {
    let count = 0;
    
    Object.keys(JSON.parse(stats)).forEach(function(key,index) {
      JSON.parse(stats)[key]?.forEach(function(item, index) {
        count += item["likes"];
        console.log("Item likes: ", item["likes"]);
      });
    });

    console.log("Stats count: ", count);

    return count;
    
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
    </tr>
  );
};

export default IterationStats;
