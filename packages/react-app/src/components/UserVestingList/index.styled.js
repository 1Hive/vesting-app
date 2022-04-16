import { EmptyStateCard, GU } from "@1hive/1hive-ui";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${GU}px;
`;

export const Empty = styled(EmptyStateCard)`
  padding: 0;
  width: 100%;
  border: none;
  grid-template-rows: auto 40px;
`;
