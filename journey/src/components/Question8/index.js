import React from 'react';

function Question8 (props) {
    if (props.currentQuestion !== 8) {
        return null;
    }
    return(
        <div>
            <h3>How do you prefer to stay the night?</h3>
        </div>
    );
}

export default Question8;