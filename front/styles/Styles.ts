import { css, styled } from "styled-components";
import { primary } from "@/lib/colors";
import Link from "next/link";

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
    font-weight: 700;
    font-family: "Poppins", sans-serif;
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
        !props.outline &&
        css`
            background-color: ${primary};
            border: 1px solid ${primary};
            color: #fff;
        `}
          ${(props) =>
        props.primary &&
        props.outline &&
        css`
            background-color: transparent;
            border: 1px solid ${primary};
            color: ${primary};
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

export const StyledButton = styled.button`
    ${ButtonStyle}
    transition: 300ms ease;
    &:hover {
        background-color: ${primary};
        color: white;
    }
`;

export const StyledLink = styled(Link)<StyleButton>`
    ${ButtonStyle}
    transition: 300ms ease;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const Center = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
`;

export const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 30px 0;
`;

export const FeaturedTitle = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`;

export const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
    text-align: justify;
    @media (max-width: 700px) {
        text-align: center;
    }
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    img {
        max-width: 100%;
    }
    @media (max-width: 700px) {
        gap: 0px;
        text-align: center;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;

export const Column = styled.div`
    display: flex;
    align-items: center;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 24px;
    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
    }
`;

export const StyledHeader = styled.header`
    background-color: #222;
`;
export const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`;
export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
`;
export const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;
`;
export const StyledNav = styled.nav`
    display: flex;
    gap: 1rem;
`;

export const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 40px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const NewTitle = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px;
`;

export const ProductWrapper = styled.div``;

export const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    aspect-ratio: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;
    img {
        max-width: 100%;
        max-height: 100px;
    }
`;

export const ProductBoxTitle = styled(Link)`
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    color: inherit;
    text-decoration: none;
`;

export const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

export const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

export const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`;
