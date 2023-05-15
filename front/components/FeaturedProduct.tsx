import React from "react";
import Button from "./Button";
import { ProductSchemaType } from "@/models/Product";
import ButtonLink from "./ButtonLink";
import CartIcon from "./CartIcon";
import * as S from "@/styles/Styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, removeItem, addFeaturedItem } from "@/store/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Props = {
    product: ProductSchemaType;
};

const FeaturedProduct = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    return (
        <S.Bg>
            <S.Center>
                <S.Wrapper>
                    <S.Column>
                        <div>
                            <S.FeaturedTitle>{product.title}</S.FeaturedTitle>
                            <S.Desc>{product.description}</S.Desc>
                            <S.ButtonsWrapper>
                                <ButtonLink
                                    href={`/products/${product._id}`}
                                    white={1}
                                    outline={1}
                                >
                                    Read more
                                </ButtonLink>
                                <Button
                                    white={1}
                                    onClick={() =>
                                        dispatch(addFeaturedItem(product))
                                    }
                                >
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </S.ButtonsWrapper>
                        </div>
                    </S.Column>
                    <S.Column>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://marcin-next-ecommerce.s3.amazonaws.com/1683797555237.png"
                            alt=""
                        ></img>
                    </S.Column>
                </S.Wrapper>
            </S.Center>
        </S.Bg>
    );
};

export default FeaturedProduct;
