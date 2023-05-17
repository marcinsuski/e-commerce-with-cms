import React from "react";
import * as S from "@/styles/Styles";

type Props = {
    children?: React.ReactNode;
    outline?: number;
    white?: number;
    black?: number;
    primary?: number;
    block?: number;
    size?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e?: any) => void;
    style?: {};
};

const Button = ({ children, ...rest }: Props): JSX.Element => {
    return <S.StyledButton {...rest}>{children}</S.StyledButton>;
};

export default Button;
