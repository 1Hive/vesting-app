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
          {data?.vestedERC20S.map((vest, index: number) => (
            <div className="p-8 shadow space-y-4 rounded-xl" key={index}>
              <div className="flex text-xs font-bold text-right text-black uppercase">{vest.name}</div>
              <div>{truncateAddress(vest.id)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VestingList;
