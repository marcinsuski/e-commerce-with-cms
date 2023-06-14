import { styled } from "styled-components";

export const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 30px 0;
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
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
