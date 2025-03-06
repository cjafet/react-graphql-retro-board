import React, {useContext} from "react";
import { ThemeContext } from "./context/ThemeContext";

/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Home = () => {
    const { themeColor, actions } = useContext(ThemeContext);

    const handleLogin = async (credential) => {  
        const credentials = {
          userName: "comms",
          password: "comms",
        };
        const user = await actions.signIn(credentials);
          if (user) {
            console.log("Logged user", user.data);
            // navigate("/me");
          }
      }
    
      handleLogin({});
    
    return (

    <div style={{display: "inline-flex", alignItems: "center", height: "400px"}}>
        <div style={{backgroundColor: themeColor, borderRadius: "8px", display: "flex", maxWidth: "581px"}}>
            
        </div>
    </div>
 )};

export default Home;