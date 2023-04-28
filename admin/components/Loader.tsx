import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader: React.FC = () => {
    return (
        <>
            <ScaleLoader color="rgb(12, 31, 138)" speedMultiplier={0} />
        </>
    );
};

export default Loader;
