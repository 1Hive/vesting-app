import { Skeleton } from 'antd';
import { useMemo } from 'react';
import { truncateAddress } from '~~/helpers';
import { useVestedTokens } from '~~/hooks';

type VestingList = {
  handleWrapVesting: (vestedAddress: string, underTokenAddress: string) => void;
};

const VestingList = ({ handleWrapVesting }: VestingList) => {
  const { loading, error, data } = useVestedTokens();

  const isEmpty = useMemo(() => {
    return data?.vestedERC20S === undefined || data?.vestedERC20S?.length === 0;
  }, [data?.vestedERC20S]);

  console.log({ data, isEmpty, loading, error });

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
        <div className="grid grid-cols-4 gap-5">
          {data?.vestedERC20S.map((vest, index: number) => {
            const token = vest.underlying;
            // const startDate = dateFormat(vestedERC20.startTimestamp);
            // const endDate = dateFormat(vestedERC20.endTimestamp);

            return (
              <div className="p-8 shadow grid gap-2 rounded-xl" key={index}>
                <p className="flex mb-0 text-lg font-bold text-right text-black">{vest.name}</p>
                <div>
                  <p className="mb-0">
                    <strong className="text-sky-500 dark:text-sky-400 ">Start:</strong> {vest.startTimestamp}
                  </p>
                  <p className="mb-0">
                    <strong className="text-sky-500 dark:text-sky-400">End</strong> {vest.endTimestamp}
                  </p>
                </div>

                <p className="mb-0 text-slate-700 dark:text-slate-500">{truncateAddress(vest.id)}</p>

                <button
                  onClick={() => handleWrapVesting(vest.id, token.id)}
                  className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
                  Wrap
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VestingList;
