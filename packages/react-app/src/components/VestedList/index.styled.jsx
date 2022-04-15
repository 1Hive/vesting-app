import { GU } from "@1hive/1hive-ui";
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
