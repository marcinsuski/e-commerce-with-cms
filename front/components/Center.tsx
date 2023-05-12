import React from "react";
import { styled } from "styled-components";

type Props = {
    children: React.ReactNode;
};

const StyledDiv = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Center = ({ children }: Props) => {
    return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
