import React from "react";
import Center from "./Center";
import { styled } from "styled-components";
import Button from "./Button";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    img {
        max-width: 100%;
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

type Props = {};

const FeaturedProduct = (props: Props) => {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                        <div>
                            <Title>Pro anywhere</Title>
                            <Desc>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Consequatur a natus explicabo
                                ea quibusdam quisquam, dolorem rerum repellat
                                perferendis blanditiis tempora harum.
                            </Desc>
                            <ButtonsWrapper>
                                <Button outline={true} white={true} size="l">
                                    Read more
                                </Button>
                                <Button primary={true} size="l">
                                    Add to cart
                                </Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://marcin-next-ecommerce.s3.amazonaws.com/1683718302168.jpg"
                            alt=""
                        ></img>
                    </Column>
                </Wrapper>
            </Center>
        </Bg>
    );
};

export default FeaturedProduct;
