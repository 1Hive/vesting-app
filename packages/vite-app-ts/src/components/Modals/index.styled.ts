import { GU, textStyle } from '@1hive/1hive-ui';
import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: start;
  margin-top: ${GU}px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${textStyle('title3')}
  margin-bottom: ${2 * GU}px;

  > svg {
    cursor: pointer;
  }
`;
