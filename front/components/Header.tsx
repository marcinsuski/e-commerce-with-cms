import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import Center from "./Center";
import { css, styled } from "styled-components";
import Link from "next/link";
import BurgerButton from "./icons/BurgerButton";
import { useState } from "react";

export const StyledHeader = styled.header`
    background-color: #222;
`;
export const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    z-index: 2;
`;
export const HeaderWrapper = styled.div`
    display: flex;
    padding: 20px 20px;
    @media screen and (max-width: 70px) {
        justify-content: space-between;
    }
`;

interface MobileNavType {
    mobileNavActive: boolean;
}

const StyledMobileNav = css<MobileNavType>`
    display: block;
    gap: 1rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 80px 40px 0 40px;
    background-color: #222;
    z-index: 1;
    @media screen and (min-width: 700px) {
        display: flex;
        position: static;
        padding: 0;
    }
    ${(props) =>
        props.mobileNavActive
            ? `transform: translateX(0);`
            : `transform: translateX(100%);`}
`;

export const StyledNav = styled.nav`
    ${StyledMobileNav}
    transition: 300ms ease;
`;

export const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    margin-bottom: 1rem;
    @media screen and (min-width: 700px) {
        margin-bottom: 0;
    }
`;

export const NavButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: transparent;
    width: 30px;
    height: 1 00px;
    border: 0;
    color: #fff;
    cursor: pointer;
    z-index: 2;
    @media screen and (min-width: 700px) {
        display: none;
    }
`;

const Header = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);
    return (
        <StyledHeader>
            <Center>
                <HeaderWrapper>
                    <Logo href={"/"}>TechStore</Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/products"}>All Products</NavLink>
                        <NavLink href={"/categories"}>Categories</NavLink>
                        <NavLink href={"/account"}>Account</NavLink>
                        <NavLink href={"/cart"}>
                            Cart ({cart.items.length})
                        </NavLink>
                    </StyledNav>
                    <NavButton
                        onClick={() => setMobileNavActive((prev) => !prev)}
                    >
                        <BurgerButton />
                    </NavButton>
                </HeaderWrapper>
            </Center>
        </StyledHeader>
    );
};

export default Header;
