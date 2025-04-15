import React, { useState } from "react";
import bcrypt from "bcryptjs";

// Craetes a context and returns a Consumer/Provider object
export const ThemeContext = React.createContext();

export const Provider = (props) => {
  const [themeColor, setThemeColor] = useState("#53047c"); // #ed143d
  const [timerColor, setTimerColor] = useState("#7316a1"); // #8e1d1d
  const [authUser, setAuthUser] = useState({name: "", team: "", organization: "", userName: ""});
  const GRAPHQL_SERVER = process.env.REACT_APP_GRAPHQL_SERVER;

    const getTeamsByOrg = async (organization) => {

    let teamsResponse = {};

    let data = {
      query:
        "query allTeams($org: String!) { allTeamsByOrg(org: $org) { name hash } }",
      variables: { org: organization },
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

    console.log("allTeams response", response);
    

    if (response.status === 200) {
      teamsResponse = await response.json();
      console.log("allTeams", teamsResponse.data.allTeamsByOrg);
    }
    
    return teamsResponse.data?.allTeamsByOrg;
  };

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
      localStorage.setItem('loggedUser', JSON.stringify(user.data.user));
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

      if (user !== null) {
        loggedUser = {"name": user.name, "team": user.team, "organization": user.organization, "userName": user.userName};
        setAuthUser({...loggedUser});
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      }

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

    return user.data.userSignUp;
  };

  const userSignIn = async (credentials) => { 

    let user = {};
    let loggedUser = authUser;

    let data = {
      query:
        "query userSignin($userName: String!, $password: String!, $team: String!) { userSignIn(userName: $userName, password: $password, team: $team) { organization team { name users { email name } } } }",
      variables: { userName: credentials.userName, password: credentials.password, team: credentials.team },
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
      let signedUser = user.data.userSignIn;
      if (signedUser !== null) {
        loggedUser = {"name": signedUser.team.users.name, "team": signedUser.team.name, "organization": signedUser.organization, "userName": signedUser.team.users.email};
        setAuthUser({...loggedUser});
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      }
    }
    return loggedUser;
  };

  const logOut = async () => { 
    localStorage.clear();
  }

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
          userSignUp,
          getTeamsByOrg,
          logOut
        },
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
