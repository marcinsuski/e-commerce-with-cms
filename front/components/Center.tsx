import React from "react";
import { styled } from "styled-components";
import * as S from "@/styles/Styles";

type Props = {
    children: React.ReactNode;
};

const Center = ({ children }: Props) => {
    return <S.Center>{children}</S.Center>;
};

export default Center;
