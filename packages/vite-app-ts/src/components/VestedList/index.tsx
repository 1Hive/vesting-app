import { memo } from 'react';
import { Skeleton, Empty } from 'antd';
import { Button, TokenBadge } from '@1hive/1hive-ui';
import { dateFormat } from '../../helpers/date-utils';
import { useVestedTokens } from '../../hooks';
import { Wrapper } from './index.styled';

// import { vestedERC20S as mockData } from "../../mocks/vestedERC20S";
import ListItems from '../List/index';

const VestedList = ({ handleWrapVesting }: { handleWrapVesting: any }) => {
  const { loading, error, data } = useVestedTokens();

  if (loading) return <Skeleton paragraph={{ rows: 2 }} />;
  if (error) return <p>Error</p>;

  // const data = mockData;

  return data?.vestedERC20S.length > 0 ? (
    <Wrapper>
      {data.vestedERC20S.map((vestedERC20: any, index: any) => {
        const token = vestedERC20.underlying;
        const startDate = dateFormat(vestedERC20.startTimestamp);
        const endDate = dateFormat(vestedERC20.endTimestamp);
        return (
          <ListItems
            key={index}
            renderHeader={<TokenBadge address={vestedERC20.id} name={vestedERC20.name} symbol={vestedERC20.symbol} />}
            renderContent={
              <>
                <p>
                  <TokenBadge address={token.id} name={token.name} symbol={token.symbol} />
                </p>
                <div>Start Date: {startDate}</div>
                <div>End Date: {endDate}</div>
              </>
            }
            renderAction={<Button label="Wrap" onClick={() => handleWrapVesting(vestedERC20.id)} />}
          />
        );
      })}
    </Wrapper>
  ) : (
    <Empty />
  );
};

export default memo(VestedList);
