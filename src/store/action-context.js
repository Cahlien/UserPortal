  
import React, { useState } from "react";

const ActionContext = React.createContext({
    targetId: '',
    action: (targetId) => {}
    
});

export const ActionContextProvider = (props) => {
    const initialTarget = localStorage.getItem('target');
    const [targetId, setTargetId] = useState(initialTarget);

    const handleAction = (targetId) => {
        console.log("Action setting target to: " + targetId);
        setTargetId(targetId);
    }

    const contextValue = {
        targetId: targetId,
        action: handleAction
    };

    return <ActionContext.Provider value={contextValue}>{props.children}</ActionContext.Provider>;
}

export default ActionContext;