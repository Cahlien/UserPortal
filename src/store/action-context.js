<<<<<<< HEAD
  
=======
>>>>>>> origin/dev
import React, { useState } from "react";

const ActionContext = React.createContext({
    targetId: '',
    action: (targetId) => {}
<<<<<<< HEAD
    
=======
>>>>>>> origin/dev
});

export const ActionContextProvider = (props) => {
    const initialTarget = localStorage.getItem('target');
    const [targetId, setTargetId] = useState(initialTarget);

    const handleAction = (targetId) => {
<<<<<<< HEAD
        console.log("Action setting target to: " + targetId);
=======
>>>>>>> origin/dev
        setTargetId(targetId);
    }

    const contextValue = {
        targetId: targetId,
        action: handleAction
    };

    return <ActionContext.Provider value={contextValue}>{props.children}</ActionContext.Provider>;
}

export default ActionContext;