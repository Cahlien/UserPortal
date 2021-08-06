import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import ActionContext from "../../store/action-context";

function CardSignUp(props){
    const actionContext = useContext(ActionContext);
    const history = useHistory();

    return(
      <div>
          <p>
              Card Id: {actionContext.targetId}
          </p>
      </div>
    );
}

export default CardSignUp;