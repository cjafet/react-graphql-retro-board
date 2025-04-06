import React, { useState } from "react";
import bcrypt from "bcryptjs";

// Craetes a context and returns a Consumer/Provider object
export const ThemeContext = React.createContext();

export const Provider = (props) => {
  const [themeColor, setThemeColor] = useState("#53047c"); // #ed143d
  const [timerColor, setTimerColor] = useState("#7316a1"); // #8e1d1d
  const [authUser, setAuthUser] = useState({name: "", team: "", organization: "", userName: ""});
  const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

  const signIn = async (credentials) => {

    let user = {};

    let data = {
      query:
        "query login($userName: String!, $password: String!) { user(userName: $userName, password: $password) { name team organization userName } }",
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
      console.log("userResponse", user.data.user);
      setAuthUser({...user.data.user});
    }
    
    console.log("AuthUser", authUser);  
    return user.data.user;
  };

  const signUp = async (credentials) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(credentials.password, salt);

    credentials.password = hash;

    let user = {};

    let data = {
      query:
        "mutation userSignup($input: SignUp!) { signUp(input: $input) { name email team userName organization } }",
      variables: { input: credentials },
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

    console.log("signup response", response);

    if (response.status === 200) {
      user = await response.json();
      console.log("signUpResponse", user.data.signUp); 
    }

    return user.data.signUp;
  };

  const userSignUp = async (credentials) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(credentials.password, salt);

    credentials.password = hash;

    let user = {};

    let data = {
      query:
        "mutation userSignup($input: SignUp!) { userSignUp(input: $input) { name email } }",
      variables: { input: credentials },
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

    console.log("signup response", response);
    

    if (response.status === 200) {
      user = await response.json();
      console.log("signUpResponse", user.data); 
    }

    return user.data;
  };

  const userSignIn = async (credentials) => { 

    let user = {};

    let data = {
      query:
        "query userSignin($userName: String!, $password: String!, $organization: String!, $team: String!) { userSignIn(userName: $userName, password: $password, organization: $organization, team: $team) { organization team { name users { email name } } } }",
      variables: { userName: credentials.userName, password: credentials.password, organization: credentials.organization, team: credentials.team },
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

    console.log("userSignin response", response);
    

    if (response.status === 200) {
      user = await response.json();
      console.log("userSignin", user.data); 
      let loggedUser = {name: user.team.users.name, team: user.team.name, organization: user.organization, userName: user.team.users.name};
      setAuthUser({...loggedUser});
    }

    return user.data;
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
          signUp,
          userSignIn,
          userSignUp
        },
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
