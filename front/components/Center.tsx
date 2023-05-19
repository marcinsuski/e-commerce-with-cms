import React from "react";
import { styled } from "styled-components";

const CenterDiv = styled.div`
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
`;

type Props = {
    children: React.ReactNode;
};

const Center = ({ children }: Props) => {
    return <CenterDiv>{children}</CenterDiv>;
};

export default Center;
