import { GU } from '@1hive/1hive-ui';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-gap: ${2 * GU}px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  margin-bottom: ${2 * GU}px;
`;
