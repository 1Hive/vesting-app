import { GU, textStyle } from '@1hive/1hive-ui';
import styled from 'styled-components';

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
  border: 1px solid #f0f0f0;
  border-radius: ${GU}px;
  min-height: 300px;
  background: #fff;
`;
