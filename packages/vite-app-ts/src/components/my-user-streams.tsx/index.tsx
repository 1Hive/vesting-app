import { TokenBadge } from '@1hive/1hive-ui';
import { Skeleton } from 'antd';
import { useMemo } from 'react';
import { truncateAddress } from '~~/helpers';
import { dateFormat } from '~~/helpers/date-utils';
import { useVestedTokens } from '~~/hooks';

const MyUserVestings = ({ isComplete }: { isComplete?: boolean }) => {
  const { loading, error, data } = useVestedTokens();

  const isEmpty = useMemo(() => {
    return data?.vestedERC20S === undefined || data?.vestedERC20S?.length === 0;
  }, [data?.vestedERC20S]);

  const streams = useMemo(() => {
    return isComplete ? data?.vestedERC20S : data?.vestedERC20S.slice(0, 5);
  }, [data?.vestedERC20S, isComplete]);

  if (loading)
    return (
      <div className="mt-4">
        <Skeleton />
      </div>
    );

  if (error)
    return (
      <div className="mt-4">
        <p>Error...</p>
      </div>
    );

  return (
    <div className="mt-4">
      {isEmpty ? (
        <p>Is Empty</p>
      ) : (
        <>
          {isComplete ? (
            <div className=" grid grid-cols-5">
              <p className="uppercase">Address</p>
              <p className="uppercase">Start/End</p>
              <p className="uppercase">Streaming</p>
              <p className="uppercase">Token</p>
              <p className="uppercase">$</p>
            </div>
          ) : null}
          <div className="mb-4">
            {streams?.map((vest, index: number) => {
              const token = vest.underlying;
              const startDate = dateFormat(vest.startTimestamp);
              const endDate = dateFormat(vest.endTimestamp);

              return isComplete ? (
                <div className="grid grid-cols-5" key={index}>
                  <p className="mb-0 text-base">
                    <TokenBadge address={token.id} name={token.name} symbol={token.symbol} />
                    {truncateAddress(vest.id)}
                  </p>
                  <p className="mb-0 text-base">
                    {startDate} - {endDate}
                  </p>
                  <p className="mb-0 text-base">Incoming</p>
                  <p className="mb-0 text-base">{vest.underlying.symbol}</p>
                  <p className="mb-0 text-base">$12.20</p>
                </div>
              ) : (
                <div className="grid grid-cols-3" key={index}>
                  <p className="mb-0 text-base">{vest.name}</p>
                  <p className="mb-0 text-base">
                    <>
                      <TokenBadge
                        address={vest.underlying.id}
                        name={vest.underlying.name}
                        symbol={vest.underlying.symbol}
                      />
                    </>
                  </p>
                  <p className="mb-0 text-base">$12.20</p>
                </div>
              );
            })}
          </div>
          {!isComplete ? (
            <a href="/transactions" className="text-lg">
              View all transactions
            </a>
          ) : null}
        </>
      )}
    </div>
  );
};

export default MyUserVestings;
