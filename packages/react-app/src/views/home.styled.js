import { GU, textStyle } from "@1hive/1hive-ui";
import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export const SectionTitle = styled.div`
  ${textStyle("title1")};
  margin-bottom: ${2 * GU}px;
  ${props => props.small && `font-size: 20px; text-transform: uppercase; margin-bottom: ${4 * GU}px`};
`;
