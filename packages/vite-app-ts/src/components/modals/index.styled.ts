import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: start;
`;

export const StyledDatePicker = styled.div`
  position: relative;
  z-index: 1031;

  button > div {
    border-color: rgb(55 65 81 / var(--tw-border-opacity));
    border-radius: 0.375rem;
    z-index: 1031;
  }
`;
