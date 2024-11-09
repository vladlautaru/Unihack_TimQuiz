import React from "react";
import '../css/Welcome.css';
import {Link} from "react-router-dom";

function Welcome () {
    return(
        <div>
            <h1> Welcome </h1>
            <Link to='/questions'>
                <button>Question</button>
            </Link>
        </div>
    );
}

export default Welcome;