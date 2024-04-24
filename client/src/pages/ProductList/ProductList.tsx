import { type FC } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import Product, { ProductType } from "../../components/Product/Product";
import { RootReducerType } from "../../reducers";

export const DivWrapper = styled.div`
  margin-top: 170px;
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 720px) {
    margin-top: 210px;
  }

  @media screen and (max-width: 410px) {
    margin-top: 240px;
  }

  @media screen and (max-width: 310px) {
    margin-top: 310px;
  }
`;

export const TextCentered = styled.div`
  text-align: center;
  margin-bottom: 5px;
`;

type Props = {
  searchTerm: string;
  filterCategory: string;
  isLoggedIn: boolean;
  name?: string | null;
  products: ProductType[];
  token: string | null;
  errorFetchingFavorites: boolean;
};

const ProductList: FC<Props> = ({
  searchTerm,
  filterCategory,
  isLoggedIn,
  token,
  products,
  errorFetchingFavorites,
}) => {
  const favoritesProducts = useSelector(
    (state: RootReducerType) => state.favorites
  );

  if (searchTerm) {
    searchTerm = searchTerm!.toLowerCase().trim();
  }

  const filteredProducts = products.filter((product) => {
    const matchProductName =
      searchTerm !== "" && product.name.toLowerCase().includes(searchTerm);
    const matchFavoriteProduct =
      filterCategory === "favorites" && favoritesProducts.includes(product.id);
    const matchProductCategory =
      filterCategory === "todos" ||
      matchFavoriteProduct ||
      filterCategory === product.category;

    return (
      (matchProductName && matchProductCategory) ||
      (searchTerm === "" && matchProductCategory)
    );
  });

  const renderProducts = filteredProducts.length ? (
    filteredProducts.map((product) => (
      <Product
        key={product.name}
        product={product}
        isLoggedIn={isLoggedIn}
        token={token}
      />
    ))
  ) : (
    <TextCentered>
      Lo sentimos, no pudimos encontrar ningún producto asociado con su
      búsqueda.
    </TextCentered>
  );

  return (
    <DivWrapper>
      {errorFetchingFavorites && (
        <TextCentered>
          Un error se produjo al recuperar la lista de favoritos.
        </TextCentered>
      )}
      {renderProducts}
    </DivWrapper>
  );
};

export default ProductList;
