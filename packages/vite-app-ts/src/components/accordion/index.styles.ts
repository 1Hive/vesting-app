import styled from 'styled-components';

export const StyledAccordion = styled.div`
  h2 {
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;

      & > div {
        max-width: 80%;
      }
    }
  }
`;

export const AccordionContent = styled.div``;
