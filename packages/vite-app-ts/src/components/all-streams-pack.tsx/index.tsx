import { Empty, Skeleton } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { useEffect, useMemo, useState } from 'react';
import { getBlockTimestamp } from '~~/helpers/contract';
import { dateFormat } from '~~/helpers/date-utils';
import { useVestedTokens } from '~~/hooks';
import { VestedErc20 } from '~~/types-and-hooks';

enum StreamPackStatus {
  NOT_INITIALIAZED,
  OPEN,
  CLOSED,
  UNKNOWN,
}

function getStatusStreamPack(vest: VestedErc20, blockTimestamp: number | undefined) {
  if (!blockTimestamp) {
    return StreamPackStatus.UNKNOWN;
  }
  if (blockTimestamp < vest.startTimestamp) {
    return StreamPackStatus.NOT_INITIALIAZED;
  } else if (blockTimestamp > vest.endTimestamp) {
    return StreamPackStatus.CLOSED;
  } else {
    return StreamPackStatus.OPEN;
  }
}

const AllStreamsPack = ({ isComplete }: { isComplete?: boolean }) => {
  const { loading, error, data } = useVestedTokens();

  const ethersContext = useEthersContext();

  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>();

  useEffect(() => {
    const getBlock = async () => {
      const blockTimestamp = await getBlockTimestamp(ethersContext);
      setBlockTimestamp(blockTimestamp);
    };

    void getBlock();
  }, []);

  const isEmpty = useMemo(() => {
    return data?.vestedERC20S === undefined || data?.vestedERC20S?.length === 0;
  }, [data?.vestedERC20S]);

  const streams = useMemo(() => {
    return isComplete ? data?.vestedERC20S : data?.vestedERC20S.slice(0, 5);
  }, [data?.vestedERC20S, isComplete]);

  console.log({ streams });

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
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          {isComplete ? (
            <div className="mb-4 grid grid-cols-4">
              <p className="uppercase">Vesting Token</p>
              <p className="uppercase">Start/End</p>
              <p className="uppercase">Status</p>
              <p className="uppercase">Wrap Token</p>
            </div>
          ) : null}
          <div className="flex flex-col mt-4">
            {streams?.map((vest, index: number) => {
              const vestToken = vest;
              const startDate = dateFormat(vestToken.startTimestamp);
              const endDate = dateFormat(vestToken.endTimestamp);

              return isComplete ? (
                <div className="mb-4 grid grid-cols-4" key={index}>
                  <p className="mb-0 text-base">{vestToken.name}</p>
                  <p className="mb-0 text-base">
                    {startDate} - {endDate}
                  </p>
                  <p className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vest, blockTimestamp)]}</p>
                  <p className="mb-0 text-base">{vestToken.symbol}</p>
                </div>
              ) : (
                <div className="mb-4 grid grid-cols-3" key={index}>
                  <p className="mb-0 text-base">{vestToken.name}</p>
                  <p className="mb-0 text-base">
                    {vestToken.underlying.name} - {vestToken.underlying.symbol}
                  </p>
                  <p className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vest, blockTimestamp)]}</p>
                  {/* <p className="mb-0 text-base">$12.20</p> */}
                </div>
              );
            })}
          </div>

          {!isComplete ? (
            <div className="mt-4">
              <a
                href="/transactions"
                className="flex-none px-2 font-medium bg-white pointer-events-auto rounded-md py-[0.3125rem] text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
                View all packs
              </a>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default AllStreamsPack;
