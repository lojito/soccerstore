import { type FC } from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { addToCart, removeFromCart } from "../../actions/cart";
import { addFavorite, removeFavorite } from "../../actions/favorite";
import useCreateFavorite from "../../hooks/favorite/useCreateFavorite";
import useDeleteFavorite from "../../hooks/favorite/useDeleteFavorite";
import { RootReducerType } from "../../reducers";

const DivWrapper = styled.div`
  position: relative;
  width: 225px;
  margin: 0 auto;

  & svg.favorite {
    position: absolute;
    right: 15px;
    top: 10px;
    color: red;

    @media screen and (max-width: 1160px) {
      right: 10%;
    }
  }

  & svg.favorite.add {
    color: green;
  }

  & svg.cart {
    position: absolute;
    left: 15px;
    top: 10px;
    color: red;

    @media screen and (max-width: 1160px) {
      left: 10%;
    }
  }

  & svg.cart.added {
    color: green;
  }

  & svg:hover {
    cursor: pointer;
  }

  & image {
    height: 100%;
  }
`;

type Props = {
  id: number;
  image: string;
  isLoggedIn: boolean;
  token: string | null;
};

const ProductMedia: FC<Props> = ({ id, image, isLoggedIn, token }) => {
  const dispatch = useDispatch();

  const productsInFavoritesList = useSelector(
    (state: RootReducerType) => state.favorites
  );
  const isProductInFavoritesList = productsInFavoritesList.includes(id);

  const iconClass = isProductInFavoritesList ? "favorite add" : "favorite";
  const title = isProductInFavoritesList
    ? "Elimina este producto de tu lista de favoritos."
    : "Adiciona este producto a tu lista de favoritos.";

  const { handleCreateFavorite } = useCreateFavorite(token!);
  const { handleDeleteFavorite } = useDeleteFavorite(token!);

  const handleFavorite = async () => {
    if (isProductInFavoritesList) {
      await handleDeleteFavorite(id);
      dispatch(removeFavorite(id));
    } else {
      await handleCreateFavorite(id);
      dispatch(addFavorite(id));
    }
  };

  const productsInCart = useSelector((state: RootReducerType) => state.cart);
  const isProductInCart = productsInCart.includes(id);

  const cartClass = isProductInCart ? "cart added" : "cart";
  const cartTitle = isProductInCart
    ? "Elimina este producto del carrito."
    : "Adiciona este producto al carrito.";

  const handleShoppingCart = async () => {
    if (isProductInCart) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart(id));
    }
  };

  return (
    <DivWrapper>
      {isLoggedIn && (
        <>
          <FaHeart
            className={iconClass}
            onClick={handleFavorite}
            title={title}
            aria-label="favorite-icon"
            role="img"
          />
          <MdOutlineShoppingCart
            onClick={handleShoppingCart}
            className={cartClass}
            title={cartTitle}
            aria-label="cart-icon"
            role="img"
          />
        </>
      )}
      <img src={image} />
    </DivWrapper>
  );
};

export default ProductMedia;
