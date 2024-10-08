import React, {useContext} from "react";
import { ThemeContext } from "./context/ThemeContext";

/**
 * NotFound component used when a route is not found.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const NotFound = () => {
    const { themeColor } = useContext(ThemeContext);
    
    return (

    <div style={{display: "inline-flex", alignItems: "center", height: "400px"}}>
        <div style={{backgroundColor: themeColor, borderRadius: "8px", display: "flex", maxWidth: "581px"}}>
            <ul style={{display: "flex", color: "white", padding: "10px 20px"}}>
            <li>
            <i className="material-icons icn-error" style={{fontSize: "51px", marginRight: "10px"}}>error_outline</i>
            </li>
            <li style={{marginTop: "7px"}}>
            <h4 style={{margin: "0"}}>Page Not Found</h4>
            </li>
            </ul>
        </div>
    </div>
 )};

export default NotFound;