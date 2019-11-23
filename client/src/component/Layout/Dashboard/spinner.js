import React from "react";
import spinner from "../../../image/transparent-gif-spinner-1-original.gif";

const Spinner = () => {
    return (
        <div>
            <img
                src={spinner}
                alt="Loading..."
                style={{ width: "70px", margin: "auto", display: "block" }}
            />
        </div>
    );
};

export default Spinner;
