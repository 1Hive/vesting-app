import { GU } from '@1hive/1hive-ui';
import { Card } from 'antd';
import styled from 'styled-components';

export const Item = styled(Card)`
  > div {
    display: grid;
    gap: ${GU * 2}px;
  }
`;

const ListItems = ({
  renderHeader,
  renderContent,
  renderAction,
}: {
  renderHeader: any;
  renderContent: any;
  renderAction: any;
}) => {
  return (
    <Item>
      {renderHeader && <div>{renderHeader}</div>}
      {renderContent && <div>{renderContent}</div>}
      {renderAction && <div>{renderAction}</div>}
    </Item>
  );
};

export default ListItems;
