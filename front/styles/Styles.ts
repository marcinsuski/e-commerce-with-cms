import { css, styled } from "styled-components";
import { hoverColor, primary, secondary } from "@/lib/colors";
import Link from "next/link";

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
