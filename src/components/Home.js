import React, {useContext} from "react";
import { ThemeContext } from "./context/ThemeContext";

/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Home = () => {
    const { themeColor } = useContext(ThemeContext);
    
    return (

    <div style={{display: "inline-flex", alignItems: "center", height: "400px"}}>
        <div style={{backgroundColor: themeColor, borderRadius: "8px", display: "flex", maxWidth: "581px"}}>
            
        </div>
    </div>
 )};

export default Home;