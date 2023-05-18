import { css, styled } from "styled-components";
import { hoverColor, primary, secondary } from "@/lib/colors";
import Link from "next/link";

export interface StyleButton {
    size?: string;
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
`;

export const StyledButton = styled.button`
    ${ButtonStyle}
    transition: 300ms ease;
    &:hover {
        scale: 1.1;
    }
`;

export const StyledLink = styled(Link)<StyleButton>`
    ${ButtonStyle}
    transition: 300ms ease;
    &:hover {
        scale: 1.1;
    }
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

// cart/index.tsx

export const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 40px;
    margin-top: 40px;
    .infobox {
        height: fit-content;
    }
    @media (max-width: 700px) {
        grid-template-columns: 1fr;
        grid-templte-rows: auto;
        .infobox {
            grid-row: 1;
            height: fit-content;
        }
`;

export const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
 
}

`;

export const StyledTable = styled.table`
    width: 100%;
    th {
        text-align: left;
        text-transform: uppercase;
        color: #aaa;
        font-weight: 600;
        font-size: 0.7rem;
    }
    td {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
`;

export const ProductInfoCell = styled.td`
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ProductImageBox = styled.div`
    width: 80px;
    height: 80px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 70px;
        max-height: 70px;
    }
`;

export const QuantityLabel = styled.span`
    padding: 0 6px;
`;

//Input.tsx

export const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

export const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;
