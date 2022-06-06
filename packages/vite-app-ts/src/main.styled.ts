import { GU, textStyle } from '@1hive/1hive-ui';
import styled from 'styled-components';

export const MainWrapper = styled.main`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-areas:
    'nav head'
    'nav main';

  grid-template-rows: 80px 1fr;
  grid-template-columns: 80px 1fr;
`;

export const Header = styled.header`
  grid-area: head;
  background-color: #fff;
  box-shadow: rgb(224 232 248) 0px -1px 0px 0px inset, rgb(224 232 248) -1px 0px 0px 0px inset;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

export const Sidebar = styled.nav`
  grid-area: nav;
  box-shadow: rgb(224 232 248) -1px 0px 0px 0px inset;
`;

export const Content = styled.div`
  grid-area: main;
  background-color: #fff;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export const SectionTitle = styled.div<{ small?: boolean }>`
  ${textStyle('title1')};
  ${(props) => props.small && `font-size: 20px; text-transform: uppercase; margin-bottom: ${4 * GU}px`};
`;

export const Section = styled.div`
  padding: ${2.5 * GU}px;
  border-radius: ${GU}px;
  min-height: 300px;
`;
