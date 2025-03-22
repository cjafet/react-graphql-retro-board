import React, {useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

/**
 * SignUp component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const UserSignUp = () => {
    const { themeColor, actions } = useContext(ThemeContext);
    const team = useRef(null)
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null);

    const navigate = useNavigate();

    const handleSignUp = async (event) => {  
        event.preventDefault();

        const credentials = {
            name: name.current.value,
            email: email.current.value,
            team: team.current.value,
            password: password.current.value,
        };

        const user = await actions.signUp(credentials);
          if (user) {
            navigate("/");
          }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        // navigate("/");
    };

    
    return (

    <div style={{display: "inline-flex", alignItems: "center", width: "50%", height: "400px"}}>
        <div style={{borderRadius: "8px", display: "block", width: "50%", marginTop: "100px"}}>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <input
                type="name"
                className="form-control login"
                id="name"
                aria-describedby="name"
                ref={name}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control login"
                id="email"
                aria-describedby="email"
                ref={email}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <input
                type="hidden"
                className="form-control login"
                id="team"
                aria-describedby="team name"
                ref={team}
                placeholder="Enter team name"
              />
            </div>
            <div className="form-group mt-3">
                <input
                type="password"
                className="form-control login"
                id="password"
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
                Sign up
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

export default UserSignUp;