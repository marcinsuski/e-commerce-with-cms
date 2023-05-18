import React from "react";
import * as S from "@/styles/Styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import Center from "./Center";
import { styled } from "styled-components";
import Link from "next/link";

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

const Header = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);

    return (
        <StyledHeader>
            <Center>
                <HeaderWrapper>
                    <Logo href={"/"}>TechStore</Logo>
                    <StyledNav>
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/products"}>All Products</NavLink>
                        <NavLink href={"/categories"}>Categories</NavLink>
                        <NavLink href={"/account"}>Account</NavLink>
                        <NavLink href={"/cart"}>
                            Cart ({cart.items.length})
                        </NavLink>
                    </StyledNav>
                </HeaderWrapper>
            </Center>
        </StyledHeader>
    );
};

export default Header;
