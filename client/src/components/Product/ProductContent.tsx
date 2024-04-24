import { type FC, type ReactNode } from "react";
import { styled } from "styled-components";

const DivWrapper = styled.div`
  color: #2d2f31;
  font-weight: bold;
  font-size: 1.6rem;
  margin-bottom: 5px;
  text-align: left;
  width: 225px;
  margin: 0 auto;
`;

type Props = {
  children: ReactNode;
};

const ProductContent: FC<Props> = ({ children }) => {
  return <DivWrapper>{children}</DivWrapper>;
};

export default ProductContent;
