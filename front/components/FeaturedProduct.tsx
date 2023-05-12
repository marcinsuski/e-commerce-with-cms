import React from "react";
import Center from "./Center";
import { styled } from "styled-components";
import Button from "./Button";
import { ProductSchemaType } from "@/models/Product";
import ButtonLink from "./ButtonLink";
import CartIcon from "./CartIcon";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 30px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
    text-align: justify;
    @media (max-width: 700px) {
        text-align: center;
    }
`;

const Wrapper = styled.div`
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

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 24px;
    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
    }
`;

type Props = {
    product: ProductSchemaType;
};

const FeaturedProduct = ({ product }: Props) => {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>{product.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink
                                    href={`/products/${product._id}`}
                                    white={1}
                                    outline={1}
                                >
                                    Read more
                                </ButtonLink>
                                <Button white={1}>
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://marcin-next-ecommerce.s3.amazonaws.com/1683797555237.png"
                            alt=""
                        ></img>
                    </Column>
                </Wrapper>
            </Center>
        </Bg>
    );
};

export default FeaturedProduct;
