import React, { useState } from "react";

// Craetes a context and returns a Consumer/Provider object
export const ThemeContext = React.createContext();

export const Provider = (props) => {
  const [themeColor, setThemeColor] = useState("#6a1cb8"); // #ed143d
  const [timerColor, setTimerColor] = useState("#8922f1"); // #8e1d1d
  const [authUser, setAuthUser] = useState(null);
  const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

  const signIn = async (credentials) => {

    let user = {};

    let data = {
      query:
        "query login($userName: String!, $password: String!) { user(userName: $userName, password: $password) { user { name team userName } } }",
      variables: { userName: credentials.userName, password: credentials.password },
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      GRAPHQL_SERVER,
      fetchOptions
    );

    console.log("login response", response);
    

    if (response.status === 200) {
      user = await response.json();
      setAuthUser(user);
    }

    return user;
  };

  const handleColorSelection = (bgColor) => {
    setThemeColor(bgColor);
    console.log("selectedColor", bgColor);
    console.log("themeColor", themeColor);
  };

  const handleColorTimerSelection = (bgColor) => {
    setTimerColor(bgColor);
    console.log("selectedColor", bgColor);
    console.log("timerColor", themeColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        handleColorSelection,
        timerColor,
        handleColorTimerSelection,
        authUser,
        actions: {
          signIn,
        },
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
