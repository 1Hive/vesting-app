import { memo } from 'react';
import { Skeleton, Empty } from 'antd';
import { Button, TokenBadge } from '@1hive/1hive-ui';
import { dateFormat } from '../../helpers/date-utils';
import { Wrapper } from './index.styled';
import { useUserVestings } from '../../hooks';

import ListItems from '../List';

type UserVestingListProps = {
  address: string;
  onRedeemVesting: (id: string) => void;
};

const UserVestingList = ({ address, onRedeemVesting }: UserVestingListProps) => {
  const { loading, error, data } = useUserVestings(address);

  if (!address) {
    return <p>No address provided</p>;
  }

  if (loading) return <Skeleton paragraph={{ rows: 2 }} />;
  if (error) return <p>Error...</p>;

  return data?.vestings !== undefined && data?.vestings.length > 0 ? (
    <Wrapper>
      {data?.vestings.map((vest, index: number) => {
        const token = vest.token;
        const createdAt = dateFormat(vest.createdAt);

        return (
          <ListItems
            key={index}
            renderHeader={<TokenBadge address={token.id} name={token.name} symbol={token.symbol} />}
            renderContent={
              <>
                <p>
                  Underlying:{' '}
                  <TokenBadge
                    address={token.underlying.id}
                    name={token.underlying.name}
                    symbol={token.underlying.symbol}
                  />
                </p>
                <p>Created At: {createdAt}</p>
              </>
            }
            renderAction={<Button label="Redeem" onClick={() => onRedeemVesting(token.id)} />}
          />
        );
      })}
    </Wrapper>
  ) : (
    <Empty />
  );
};

export default memo(UserVestingList);
