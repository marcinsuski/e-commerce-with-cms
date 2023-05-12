import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader: React.FC = () => {
    return (
        <>
            <ScaleLoader color="rgb(12, 31, 138)" speedMultiplier={1} />
        </>
    );
};

export default Loader;
