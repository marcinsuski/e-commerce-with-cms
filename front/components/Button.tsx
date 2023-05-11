import React from "react";
import { css, styled } from "styled-components";

export interface StyleButton {
    size?: string;
    primary?: number;
    white?: number;
    outline?: number;
}

export const ButtonStyle = css<StyleButton>`
    border-radius: 4px;
    border: 0;
    padding: 6px 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    svg {
        height: 18px;
        margin-right: 5px;
    }
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
            svg {
                height: 20px;
            }
        `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

type Props = {
    children: React.ReactNode;
    outline?: number;
    white?: number;
    primary?: number;
};

const Button = ({ children, ...rest }: Props) => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
