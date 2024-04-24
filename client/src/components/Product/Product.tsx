import { type FC } from "react";
import { styled } from "styled-components";
import ProductContent from "./ProductContent";
import ProductMedia from "./ProductMedia";

const DivWrapper = styled.div`
  width: 20%;
  display: inline-block;
  margin-bottom: 20px;
  text-align: center;
  vertical-align: top;

  @media screen and (max-width: 1160px) {
    width: 25%;
  }

  @media screen and (max-width: 970px) {
    width: 33%;
  }

  @media screen and (max-width: 740px) {
    width: 50%;
  }

  @media screen and (max-width: 490px) {
    width: 100%;
  }
`;

export type ProductType = {
  id: number;
  category: string;
  name: string;
  price: string;
  image: string;
};

type Props = {
  product: ProductType;
  isLoggedIn: boolean;
  token: string | null;
};

const Product: FC<Props> = ({
  product: { id, name, price, image, category },
  isLoggedIn,
  token,
}) => {
  return (
    <DivWrapper>
      <ProductMedia
        id={id}
        image={`images/${category}/${image}.jpg`}
        isLoggedIn={isLoggedIn}
        token={token}
      />
      <ProductContent>{name}</ProductContent>
      <ProductContent>{price} MXN</ProductContent>
    </DivWrapper>
  );
};

export default Product;
