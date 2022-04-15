import { GU, textStyle } from "@1hive/1hive-ui";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${GU}px;
`;

export const Item = styled.div`
  width: 100%;
  border: 1px solid #eee;
  padding: ${2 * GU}px;
  border-radius: ${GU}px;

  display: grid;
  gap: ${GU * 2}px;
  text-align: center;
`;

export const Section = styled.div`
  padding: ${2.5 * GU}px;
  border: 1px solid #f0f0f0;
  border-radius: ${GU}px;
  min-height: 300px;
  background: #fff;
  text-align: initial;
`;

export const SectionTitle = styled.div`
  ${textStyle("title1")};
  margin-bottom: ${2 * GU}px;
  ${props => props.small && `font-size: 26px;`};
`;
