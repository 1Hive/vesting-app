import { Skeleton } from 'antd';
import { useMemo } from 'react';
import { truncateAddress } from '~~/helpers';
import { dateFormat } from '~~/helpers/date-utils';
import { useVestedTokens } from '~~/hooks';
import { Wrapper } from './index.styled';

const History = () => {
  const { loading, error, data } = useVestedTokens();

  const isEmpty = useMemo(() => {
    return data?.vestedERC20S === undefined || data?.vestedERC20S?.length === 0;
  }, [data?.vestedERC20S]);

  return (
    <Wrapper>
      <h1 className="mb-0 text-3xl tracking-tight">History</h1>

      <div className="mt-6">
        <div className="p-4">
          {loading ? (
            <Skeleton />
          ) : error ? (
            <p>Error...</p>
          ) : isEmpty ? (
            <p>No results to show...</p>
          ) : (
            <>
              <div className="grid grid-cols-5">
                <p className="uppercase">Address</p>
                <p className="uppercase">Start/End</p>
                <p className="uppercase">Streaming</p>
                <p className="uppercase">Token</p>
                <p className="uppercase">$</p>
              </div>
              <div className="mb-4">
                {data?.vestedERC20S?.map((vest, index: number) => {
                  const startDate = dateFormat(vest.startTimestamp);
                  const endDate = dateFormat(vest.endTimestamp);

                  return (
                    <div className="grid grid-cols-5" key={index}>
                      <p className="mb-0 text-base">{truncateAddress(vest.id)}</p>
                      <p className="mb-0 text-base">
                        {startDate} - {endDate}
                      </p>
                      <p className="mb-0 text-base">Incoming</p>
                      <p className="mb-0 text-base">{vest.underlying.symbol}</p>
                      <p className="mb-0 text-base">$12.20</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default History;
