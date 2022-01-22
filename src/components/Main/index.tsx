import styled from "styled-components";
import { isMobile } from "react-device-detect";

const StyleMain = styled.main`
  padding-top: ${(props) =>
    props.path !== "/referral" && (props.isMobile ? "121px" : "136px")};
  min-height: 100vh;
`;

const Main = ({ path, children }) => (
  <StyleMain
    className={`flex flex-col items-center justify-start flex-grow w-full h-full ${
      path !== "/referral" && "container"
    }`}
    style={{ height: "max-content" }}
    isMobile={isMobile}
    path={path}
  >
    {children}
  </StyleMain>
);

export default Main;
