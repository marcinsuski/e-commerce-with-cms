import Link from "next/link";
import React from "react";
import { styled } from "styled-components";
import { ButtonStyle, StyleButton } from "@/styles/Styles";
import * as S from "@/styles/Styles";

type Props = {
    children: React.ReactNode;
    outline?: number;
    white?: number;
    primary?: number;
    href: string;
};

const ButtonLink = ({ children, ...rest }: Props) => {
    return <S.StyledLink {...rest}>{children}</S.StyledLink>;
};

export default ButtonLink;
