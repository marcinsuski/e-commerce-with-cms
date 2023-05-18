import React, { useState } from "react";
import { styled } from "styled-components";

type Props = {
    images: string[];
    title: string;
    id: string;
};

interface ImageProps {
    active: boolean;
}
const ImageWrapper = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
    width: 300px;
    height: 300px;
    text-align: center;
}
`;

const ImageGallery = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-grow: 0;
`;

const BigImage = styled.img`
    margin: auto;
    max-width: 80%;
    max-height: 300px;
    object-fit: contain;
`;

const SmallImage = styled.img`
    margin: auto;
    width: auto;
    height: auto;
    max-height: 80%;
    max-width: 80%;
    object-fit: contain;
`;

const ImageThumbnail = styled.div<ImageProps>`
    transition: 300ms ease;
    ${(props) =>
        props.active
            ? `
            border: 1px solid rgb(100, 100, 100);

`
            : `
            border: transparent;
opacity: 0.7;
`}
    padding: 4px;
    border-radius: 6px;
    height: 40px;
    cursor: pointer;
    img {
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }
`;

const ProductImages = ({ images, title, id }: Props) => {
    const [activeImage, setActiveImage] = useState(images[0]);

    const openBigPicture = () => {};
    return (
        <ImageWrapper>
            <BigImage
                src={activeImage}
                alt={`big-${title ? title : "product-image"}`}
                onClick={openBigPicture}
            />
            <ImageGallery>
                {images.map((image) => (
                    <ImageThumbnail
                        active={image === activeImage}
                        key={id}
                        onClick={() => setActiveImage(image)}
                    >
                        <SmallImage src={image} alt={image} />
                    </ImageThumbnail>
                ))}
            </ImageGallery>
        </ImageWrapper>
    );
};

export default ProductImages;
