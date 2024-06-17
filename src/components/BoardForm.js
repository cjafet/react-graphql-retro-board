import React from 'react';
import M from 'materialize-css'

/**
 * BoardForm component used to render the form that add items to the Retrospective board.
 * 
 * @version 0.0.1
 * @author [Carlos Jafet Neto](https://github.com/cjafet)
 */
const BoardForm = props => {
  console.log("props", props);

    /** Function used to handle adding Items in the board*/
    const handleAddItem = () => {
        props.addItem({ variables: { input: { _id: props.retroId, description: props.itemDescription, likes: 0, type: props.itemType, action: 'add' } } });
        // props.LatestItem()
        return '<span>' + props.itemType + ' added !</span>';
    }

    return (
        <React.Fragment> 
            <form className="new-task-form" onSubmit={e => {
                e.preventDefault();
                props.setItemDescription(document.getElementById("description").value);
                console.log(props.itemDescription,props.itemType);
                let toast = props.itemDescription !== undefined && props.itemDescription !== '' ? handleAddItem() : '<span>Add a description!</span>';
                M.toast({html: toast})
            }}>
                <input
                    className="full-width-input"
                    type="text"
                    id="description"
                    placeholder="Add your text"
                    defaultValue={""}
                    onChange={e => props.setItemDescription(e.target.value)}
                />
                <button className="waves-effect waves-teal btn-flat" type="submit">Add</button>
                <br/>
          </form>

          <div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => props.setItemType(e.target.value)}
                          value="kudos"
                          checked={props.itemType === "kudos"}
                        />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>kudos</div>
                  </label>
              </div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => props.setItemType(e.target.value)}
                          value="improvements"
                          checked={props.itemType === "improvements"}
                        />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>improvements</div>
                  </label>
              </div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => props.setItemType(e.target.value)}
                          value="actionItems"
                          checked={props.itemType === "actionItems"}
                        />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>actionItems</div>
                  </label>
              </div>
              <div className="radio" style={{display: "inline-flex", alignItems: "center"}}>
                  <label style={{display: "inline-flex"}}>
                      <input
                          type="radio"
                          style={{opacity: 100}}
                          name="value"
                          onChange={e => props.setItemType(e.target.value)}
                          value="lastActionItems"
                          checked={props.itemType === "lastActionItems"}
                        />
                      <div style={{marginLeft: "20px", marginRight: "20px"}}>lastActionItems</div>
                  </label>
              </div>
          </div>
        </React.Fragment>  
    );
}

export default BoardForm;