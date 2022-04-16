import { GU } from "@1hive/1hive-ui";
import styled from "styled-components";

export const Item = styled.div`
  width: 100%;
  border: 1px solid #eee;
  padding: ${3 * GU}px ${2 * GU}px;
  border-radius: ${GU}px;

  display: grid;
  gap: ${GU * 2}px;
  text-align: center;
`;

const ListItems = ({ renderHeader, renderContent, renderAction }) => {
  return (
    <Item>
      {renderHeader && <div>{renderHeader}</div>}
      {renderContent && <div>{renderContent}</div>}
      {renderAction && <div>{renderAction}</div>}
    </Item>
  );
};

export default ListItems;
