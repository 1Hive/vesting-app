import { VestedErc20 } from '~~/types-and-hooks';
import { getStatusStreamPack, StreamPackStatus, WrapButton } from '.';

type StreamPackListMobileProps = {
  list: VestedErc20[] | undefined;
  handleWrap: (underlyingTokenAddress: string, vestedAdress: string) => void;
  blockTimestamp: number | undefined;
};

const StreamPackListMobile = ({ list, handleWrap, blockTimestamp }: StreamPackListMobileProps) => {
  return (
    <>
      {list?.map((vestedERC20, index: number) => {
        const token = vestedERC20.underlying;
        return (
          <div className="flex items-center justify-between p-2 mb-2 border" key={index}>
            <div>
              <p className="text-lg font-semibold">{vestedERC20.name}</p>
              <p className="text-base">{token.symbol}</p>
            </div>
            <div>
              <div className="flex">
                <p className="px-2 py-1 mb-0 text-xs font-bold text-white uppercase bg-teal-600 rounded-md">
                  {StreamPackStatus[getStatusStreamPack(vestedERC20, blockTimestamp)]}
                </p>
              </div>
              <p>
                {getStatusStreamPack(vestedERC20, blockTimestamp) === StreamPackStatus.OPEN &&
                  WrapButton(() => handleWrap(vestedERC20.id, token.id))}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default StreamPackListMobile;
