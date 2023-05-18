import Link from "next/link";
import React from "react";
import { styled } from "styled-components";
import { ButtonStyle, StyleButton } from "./Button";

export const StyledLink = styled(Link)<StyleButton>`
    ${ButtonStyle}
    transition: 300ms ease;
    &:hover {
        scale: 1.1;
    }
`;

type Props = {
    children: React.ReactNode;
    outline?: number;
    white?: number;
    primary?: number;
    href: string;
};

const ButtonLink = ({ children, ...rest }: Props) => {
    return <StyledLink {...rest}>{children}</StyledLink>;
};

export default ButtonLink;
