import { GU, textStyle } from '@1hive/1hive-ui';
import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: start;
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

export const StyledDatePicker = styled.div`
  button > div {
    border-color: rgb(55 65 81 / var(--tw-border-opacity));
    border-radius: 0.375rem;
  }
`;
