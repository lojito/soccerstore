import { useState, type FC } from "react";
import { styled } from "styled-components";

const DivWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin-right: 15px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 5px;
  opacity: ${({ className }) => (className === "selected" ? 0.5 : 1)};

  &:hover {
    cursor: pointer;
  }
`;

export type Category =
  | "balones"
  | "tacos"
  | "shorts"
  | "camisetas"
  | "espinilleras"
  | "guantes"
  | "medias"
  | "chaquetas"
  | "todos"
  | "favorites";

type Props = {
  isLoggedIn: boolean;
  onFilterCategory: (filterCategory: Category) => void;
};

const Filter: FC<Props> = ({ onFilterCategory, isLoggedIn }) => {
  const [categorySelected, setCategorySelected] = useState<Category>("todos");

  const handleClick = (category: Category) => {
    onFilterCategory(category);
    setCategorySelected(category);
  };

  const categories: Array<Category> = [
    "balones",
    "tacos",
    "shorts",
    "camisetas",
    "espinilleras",
    "guantes",
    "medias",
    "chaquetas",
    "todos",
  ];

  if (isLoggedIn) {
    categories.push("favorites");
  }

  const renderCategories = categories.map((category) => {
    return (
      <Button
        key={category}
        className={categorySelected === category ? "selected" : ""}
        type="button"
        onClick={() => {
          handleClick(category);
        }}
      >
        {category[0].toUpperCase() + category.substring(1)}
      </Button>
    );
  });

  return <DivWrapper>{renderCategories}</DivWrapper>;
};

export default Filter;
