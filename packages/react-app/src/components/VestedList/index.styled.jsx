import { EmptyStateCard, GU, textStyle } from "@1hive/1hive-ui";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${GU}px;
`;

export const Section = styled.div`
  padding: ${2.5 * GU}px;
  border: 1px solid #f0f0f0;
  border-radius: ${GU}px;
  min-height: 300px;
  background: #fff;
`;

export const SectionTitle = styled.div`
  ${textStyle("title1")};
  margin-bottom: ${GU}px;
  ${props => props.small && `font-size: 26px;`};
`;

export const Empty = styled(EmptyStateCard)`
  border: none;
  width: 100%;
  grid-template-rows: auto 40px;
  border: none;
`;
