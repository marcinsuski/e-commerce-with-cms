import React from "react";
import * as S from "@/styles/Styles";

type Props = {
    children: React.ReactNode;
    outline?: number;
    white?: number;
    black?: number;
    primary?: number;
    block?: number;
    size?: string;
    onClick?: (e?: any) => void;
    style?: {};
};

const Button = ({ children, ...rest }: Props) => {
    return <S.StyledButton {...rest}>{children}</S.StyledButton>;
};

export default Button;
