import { type FC } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import Product, { ProductType } from "../../components/Product/Product";
import { RootReducerType } from "../../reducers";
import { DivWrapper } from "../ProductList/ProductList";

export const EmptyCart = styled.div`
  text-align: center;
`;

type Props = {
  products: ProductType[];
  token: string;
};

const Cart: FC<Props> = ({ products, token }) => {
  const cartProducts = useSelector((state: RootReducerType) => state.cart);
  const filteredProducts = products.filter((product) => {
    return cartProducts.includes(product.id);
  });

  const renderProducts = filteredProducts.length ? (
    filteredProducts.map((product) => (
      <Product key={product.name} product={product} isLoggedIn token={token} />
    ))
  ) : (
    <EmptyCart>
      El carrito esta vacío. Continua tu compra de productos relacionados con el
      fútbol, el deporte más popular del mundo.
    </EmptyCart>
  );

  return <DivWrapper>{renderProducts}</DivWrapper>;
};

export default Cart;
