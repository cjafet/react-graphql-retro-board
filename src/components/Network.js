import React from "react";

const Network = (props) => {
  if (props.networkError) {
    throw new Error(props.networkError);
  }
  return (<></>);
};

export default Network;
