import React from "react";
import * as S from "@/styles/Styles";

type Props = {
    children: React.ReactNode;
    outline?: number;
    white?: number;
    primary?: number;
    onClick: (e?: any) => void;
};

const Button = ({ children, ...rest }: Props) => {
    return <S.StyledButton {...rest}>{children}</S.StyledButton>;
};

export default Button;
