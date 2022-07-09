import { RollbackOutlined } from '@ant-design/icons';
import { VestedErc20 } from '~~/types-and-hooks';
import { getStatusStreamPack, StreamPackStatus } from '.';

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
        const status = getStatusStreamPack(vestedERC20, blockTimestamp);
        const statusColor = status === StreamPackStatus.CLOSED ? 'bg-red-600' : 'bg-teal-600';

        return (
          <div className="p-2 mb-2 border" key={index}>
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-lg font-semibold">{vestedERC20.name}</p>
                <p className="text-base">{token.symbol}</p>
              </div>
              <div className="flex">
                <p className={`px-2 py-1 mb-0 text-xs font-bold uppercase rounded-md text-white ${statusColor}`}>
                  {StreamPackStatus[status]}
                </p>
              </div>
            </div>
            {getStatusStreamPack(vestedERC20, blockTimestamp) === StreamPackStatus.OPEN ? (
              <button
                className="flex items-center w-full px-3 py-2 mt-3 font-semibold text-white bg-blue-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-blue-500 gap-2"
                onClick={() => handleWrap(vestedERC20.id, token.id)}>
                <RollbackOutlined />
                Wrap
              </button>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default StreamPackListMobile;
