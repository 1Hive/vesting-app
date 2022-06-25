import styled from 'styled-components';

export const StyledAccordion = styled.div`
  margin-bottom: 16px;

  h2 {
    button {
      border: none;
      box-shadow: none;

      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      text-align: left;

      padding: 24px;

      font-weight: 800;

      & > div {
        max-width: 80%;
      }
    }
  }
`;

export const AccordionContent = styled.div`
  text-align: left;
  padding: 24px;
  line-height: 1.5;

  p:not(:last-child) {
    margin-bottom: 12px;
  }

  a {
    color: #ab54f4;
    text-decoration: none;
    font-weight: 800;
  }

  .exchange-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin: 12px 0;
  }

  .exchange-link {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .img-container {
      width: 38px;
      height: 28px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    span {
      padding-left: 12px;
    }
  }
`;
