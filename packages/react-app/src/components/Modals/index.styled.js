import { GU, textStyle } from "@1hive/1hive-ui";
import styled from "styled-components";

export const RangeElement = styled.div`
  display: flex;
  align-items: start;
  margin-top: ${GU}px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${textStyle("title3")}

  > svg {
    cursor: pointer;
  }
`;
