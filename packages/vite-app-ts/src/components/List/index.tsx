import { Box } from '@1hive/1hive-ui';

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
    <div>
      <Box>
        {renderHeader && <div>{renderHeader}</div>}
        {renderContent && <div>{renderContent}</div>}
        {renderAction && <div>{renderAction}</div>}
      </Box>
    </div>
  );
};

export default ListItems;
