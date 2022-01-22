import { X } from "react-feather";
import styled from "styled-components";

const CloseIcon = styled(X)`
  cursor: pointer;
  stroke: ${({theme}) => theme.text6}
`;

export default CloseIcon;
