import React from "react";
import * as S from "@/styles/Styles";
import { css, styled } from "styled-components";
import { secondary } from "@/lib/colors";

export interface StyleButton {
    size?: "s" | "m" | "l";
    primary?: number;
    white?: number;
    black?: number;
    outline?: number;
    block?: number;
}

export const ButtonStyle = css<StyleButton>`
    border-radius: 4px;
    border: 0;
    padding: 6px 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    svg {
        height: 18px;
        margin-right: 5px;
    }
    ${(props) =>
        props.block &&
        css`
            display: block;
            width: 100%;
        `}
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
        props.black &&
        !props.outline &&
        css`
            background-color: #000;
            color: #fff;
        `}
    ${(props) =>
        props.black &&
        props.outline &&
        css`
            background-color: transparent;
            color: #000;
            border: 1px solid #000;
        `}
  ${(props) =>
        props.primary &&
        !props.outline &&
        css`
            background-color: ${secondary};
            border: 1px solid ${secondary};
            color: #fff;
        `}
          ${(props) =>
        props.primary &&
        props.outline &&
        css`
            background-color: transparent;
            border: 1px solid ${secondary};
            color: ${secondary};
            &:hover {
                background-color: ${secondary};
                color: #fff;
            }
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
        ${(props) =>
        props.size === "m" &&
        css`
            font-size: 1.2rem;
            padding: 6px 4px 6px 8px;

            svg {
                height: 15px;
            }
        `}
`;

export const StyledButton = styled.button`
    ${ButtonStyle}
    transition: 300ms ease;
    &:hover {
        scale: 1.1;
    }
`;

type Props = {
    children?: React.ReactNode;
    outline?: number;
    white?: number;
    black?: number;
    primary?: number;
    block?: number;
    size?: "s" | "m" | "l";
    type?: "button" | "submit" | "reset";
    onClick?: (e?: any) => void;
    style?: {};
};

const Button = ({ children, ...rest }: Props): JSX.Element => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
