import React from "react";
import * as S from "@/styles/Styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

const Header = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    console.log(cart.items);
    return (
        <S.StyledHeader>
            <S.Center>
                <S.HeaderWrapper>
                    <S.Logo href={"/"}>TechStore</S.Logo>
                    <S.StyledNav>
                        <S.NavLink href={"/"}>Home</S.NavLink>
                        <S.NavLink href={"/products"}>All Products</S.NavLink>
                        <S.NavLink href={"/categories"}>Categories</S.NavLink>
                        <S.NavLink href={"/account"}>Account</S.NavLink>
                        <S.NavLink href={"/cart"}>
                            Cart ({cart.items.length})
                        </S.NavLink>
                    </S.StyledNav>
                </S.HeaderWrapper>
            </S.Center>
        </S.StyledHeader>
    );
};

export default Header;
