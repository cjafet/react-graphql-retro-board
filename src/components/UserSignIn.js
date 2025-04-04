import React, {useContext, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const UserSignIn = () => {
    const { themeColor, actions } = useContext(ThemeContext);
    const username = useRef(null);
    const password = useRef(null);
    let { organization, team } = useParams();
    console.log(organization, team);

    const navigate = useNavigate();

    const handleUserSignIn = async (event) => {  
        event.preventDefault();

        const credentials = {
            userName: username.current.value,
            password: password.current.value,
            organization,
            team
        };

        const user = await actions.userSignIn(credentials);
          if (user) {
            console.log("Logged user", user.data);
            navigate("/" + team + "/dashboard");
          }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        // navigate("/");
    };

    
    return (

    <div style={{display: "inline-flex", alignItems: "center", width: "50%", height: "400px"}}>
        <div style={{borderRadius: "8px", display: "block", width: "50%"}}>
          <form onSubmit={handleUserSignIn}>
            <div className="form-group">
              <input
                type="username"
                className="form-control login"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                ref={username}
                placeholder="Enter email"
              />
            </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control login"
              id="exampleInputPassword1"
              ref={password}
              placeholder="Password"
            />
          </div>
          <div className="pad-bottom mt-3 btn-login">
            <button
              className="button"
              type="submit"
              style={{ backgroundColor: themeColor }}
            >
              Sign in
            </button>
            &nbsp;
            <button
              className="button button-secondary btn-login"
              style={{ backgroundColor: themeColor }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        </div>
    </div>
 )};

export default UserSignIn;