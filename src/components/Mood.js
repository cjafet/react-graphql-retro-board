import React, {useContext, useRef, useState} from "react";
import { useMutation } from "@apollo/client";
import { GET_ITEMS_BY_ITERATION } from "../constants/Queries";
import { ThemeContext } from "./context/ThemeContext";
import { ADD_TODAY_MOOD } from "../constants/Mutations";
import M from "materialize-css";

import "materialize-css/dist/css/materialize.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceTired, faFaceAngry, faFaceSmile, faFaceFrown, faPaperPlane, faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";


/**
 * Home component.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const Mood = (props) => {
    const { themeColor, timerColor, actions } = useContext(ThemeContext);
    const [mood, setMood] = useState();
    console.log("Iteration", props.iteration, "Team", props.team);
    console.log("Mood props", props);
    

    const handleBoardMoodSelection = (event) => {
        console.log("mood selection: ", event.target.id);
        setMood(event.target.id);
        M.toast({ html: "<span style=color: #53047c>Mood <b>" + event.target.id + "</b> selected!</span>" });
    };

    const handleSendMood = () => {
        console.log("Saving user mood");

        // ADD useRef to get value from input or keep using mood
        todayMood({
            variables: {
                id: props.retroId,
                iteration: parseInt(props.iteration),
                key: mood
            },
        });

        M.toast({ html: "<span style=color: #53047c>Mood saved in the current retrospective!</span>" });
        
    }

      /** Sets the mutation to add a like to an Item in the board and sets the query to fecth updated data from the server*/
      const [todayMood, { dataMood, loading, error }] = useMutation(
        ADD_TODAY_MOOD,
        {
          refetchQueries: [
            GET_ITEMS_BY_ITERATION, // DocumentNode object parsed with gql
            "allByIterationAndTeam", // Query name
          ],
        }
      );
      console.log("dataMood", dataMood);
      
    
    return (
        <div className="modal-team-form fa-lg" style={{backgroundColor: timerColor, position: "absolute", left: "0", top: "48px", maxWidth: "70px", height: "100%", color: "purple", fontSize: "4em"}}>     
            <form
                className="new-task-form"
                style={{ marginTop: "0", marginLeft: "0"}}
                onSubmit={(e) => {
                    e.preventDefault();
                    
                }}
            >
                <div className="form-group center">
                    {/* Create mood input component  */}
                    <input
                    id="angry"
                    type="radio"
                    name="mood"
                    checked={mood === "angry"}
                    onChange={handleBoardMoodSelection}
                    />
                    <label
                    htmlFor="angry"
                    style={
                        mood === "angry"
                        ? {fontSize: "0.4em", color: "purple", margin: "20px", lineHeight: "50px"} 
                        : {fontSize: "0.4em", color: themeColor, margin: "20px", lineHeight: "50px"}
                    }
                    title="I am feeling angry today!">            
                    <FontAwesomeIcon icon={faFaceAngry} color={ mood==="angry" ? "#e9d84c" : "white" } />
                    </label>

                    <input
                    id="sad"
                    type="radio"
                    name="mood"
                    checked={mood === "sad"}
                    onChange={handleBoardMoodSelection}
                    />
                    <label
                    htmlFor="sad"
                    style={
                        mood === "sad"
                        ? {fontSize: "0.4em", color: "purple", margin: "20px", lineHeight: "50px"} 
                        : {fontSize: "0.4em", color: themeColor, margin: "20px", lineHeight: "50px"}
                    }           
                    title="I am feeling sad today!">
                    <FontAwesomeIcon icon={faFaceFrown} color={ mood==="sad" ? "#e9d84c" : "white" } />
                    </label>

                    <input
                    id="tired"
                    type="radio"
                    name="mood"
                    checked={mood === "tired"}
                    onChange={handleBoardMoodSelection}
                    />
                    <label
                    htmlFor="tired"
                    style={
                        mood === "tired"
                        ? {fontSize: "0.4em", color: "purple", margin: "20px", lineHeight: "50px"} 
                        : {fontSize: "0.4em", color: themeColor, margin: "20px", lineHeight: "50px"}
                    }                    
                    title="I am feeling tired today!">            
                    <FontAwesomeIcon icon={faFaceTired} color={ mood==="tired" ? "#e9d84c" : "white" } />
                    </label>
                    
                    <input
                    id="happy"
                    type="radio"
                    name="mood"
                    checked={mood === "happy"}
                    onChange={handleBoardMoodSelection}
                    />
                    <label
                    className="tooltipped"
                    dataPosition="right"
                    dataTooltip="I am feeling happy today!"
                    htmlFor="happy"
                    style={
                        mood === "happy"
                        ? {fontSize: "0.4em", color: "purple", margin: "20px", lineHeight: "50px"} 
                        : {fontSize: "0.4em", color: themeColor, margin: "20px", lineHeight: "50px"}
                    }                         
                    title="I am feeling happy today!">            
                    <FontAwesomeIcon icon={faFaceSmile} color={ mood==="happy" ? "#e9d84c" : "white" } />
                    </label>

                    <input
                    id="xhappy"
                    type="radio"
                    name="mood"
                    checked={mood === "xhappy"}
                    onChange={handleBoardMoodSelection}
                    />
                    <label
                    className="tooltipped"
                    dataPosition="right"
                    dataTooltip="I am feeling happy today!"
                    htmlFor="xhappy"
                    style={
                        mood === "xhappy"
                        ? {fontSize: "0.4em", color: "#e9d84c", margin: "20px", lineHeight: "50px"} 
                        : {fontSize: "0.4em", color: themeColor, margin: "20px", lineHeight: "50px"}
                    }                         
                    title="I am feeling extremely happy today!">            
                    <FontAwesomeIcon icon={faFaceSmileWink} color={ mood==="xhappy" ? "#e9d84c" : "white" } />
                    </label>

                    <input
                        id="send"
                        type="radio"
                        name="mood"
                        checked={mood === "send"}
                        onChange={handleSendMood}
                    />
                    <label
                    htmlFor="send"
                    style={
                        mood === "send"
                        ? {fontSize: "0.4em", color: "purple", margin: "20px", lineHeight: "50px"} 
                        : {fontSize: "0.4em", color: themeColor, margin: "20px", lineHeight: "50px"}
                    }                         
                    title="Save your mood!">            
                    <FontAwesomeIcon icon={faPaperPlane} color="white" />
                    </label>
                </div>
            </form>
        </div>
    )};

export default Mood;