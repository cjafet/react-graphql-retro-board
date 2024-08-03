import React, { useState, useEffect } from "react";

const IterationStats = (props) => {
  console.log("statsProps", props);
  const [stats, setStats] = useState("{}");
  const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

  useEffect(() => {
    let data = {
      query:
        "query allByIterationAndTeam($productTeam: String!, $iteration: Int!) { retroByIterationAndTeam(productTeam: $productTeam, iteration: $iteration) { kudos { description likes } improvements { description likes } actionItems { description likes } lastActionItems { description likes } } }",
      variables: { productTeam: props.team[0], iteration: props.iteration },
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

  return (
    <div className="stats-width">
      <div className="stats">
        <div>
          <span className="stats-padding">
            Kudos: {JSON.parse(stats).kudos?.length}
          </span>
          <span className="stats-padding">
            &nbsp;&nbsp; Action Items: {JSON.parse(stats).actionItems?.length}
          </span>
        </div>
        <div>
          <span className="stats-padding">
            Improvs: {JSON.parse(stats).improvements?.length}
          </span>
          <span className="stats-padding">
            LA Items: {JSON.parse(stats).lastActionItems?.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IterationStats;
