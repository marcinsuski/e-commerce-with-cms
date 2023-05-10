import React from "react";
import { css, styled } from "styled-components";

interface StyleButton {
    size?: string;
    primary?: boolean;
    white?: boolean;
    outline?: boolean;
}

const StyledButton = styled.button<StyleButton>`
    border-radius: 4px;
    border: 0;
    cursor: pointer;
    ${(props) =>
        props.white &&
        !props.outline &&
        css`
            background-color: #fff;
            color: #000;
        `}
    ${(props) =>
        props.white &&
        props.outline &&
        css`
            background-color: transparent;
            color: #fff;
            border: 1px solid #fff;
        `}
    ${(props) =>
        props.primary &&
        css`
            background-color: rgb(56, 59, 230);
            border: 1px solid rgb(56, 59, 230);
            color: #fff;
        `}
    ${(props) =>
        props.size === "l" &&
        css`
            font-size: 1.2rem;
            padding: 10px 20px;
        `}
`;

type Props = {
    children: React.ReactNode;
    size?: string;
    primary?: boolean;
    white?: boolean;
    outline?: boolean;
};

const Button = ({ children, ...rest }: Props) => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
