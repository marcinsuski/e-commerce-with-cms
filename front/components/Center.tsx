import React from "react";
import { styled } from "styled-components";
import * as S from "@/styles/Styles";

export const CenterDiv = styled.div`
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
