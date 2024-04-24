import { type FC } from "react";
import { styled } from "styled-components";

const DivWrapper = styled.div`
  width: 62px;
  display: inline-block;
  padding-top: 5px;
`;

const Logo: FC = () => {
  return (
    <DivWrapper>
      <img src="images/logo.jpg" alt="logo" />
    </DivWrapper>
  );
};

export default Logo;
