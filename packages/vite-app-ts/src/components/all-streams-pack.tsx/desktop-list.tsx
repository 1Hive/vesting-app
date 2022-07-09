import { TokenBadge } from '@1hive/1hive-ui';
import { dateFormat } from '~~/helpers/date-utils';
import { RoutesPath } from '~~/main';
import { VestedErc20 } from '~~/types-and-hooks';
import { getStatusStreamPack, StreamPackStatus, WrapButton } from '.';

type StreamPackListDesktopProps = {
  isComplete?: boolean;
  streams: VestedErc20[] | undefined;
  handleWrap: (underlyingTokenAddress: string, vestedAdress: string) => void;
  blockTimestamp: number | undefined;
};

const StreamPackListDesktop = ({ isComplete, streams, handleWrap, blockTimestamp }: StreamPackListDesktopProps) => {
  return (
    <>
      {isComplete ? (
        <div className="mb-4 grid grid-cols-5">
          <p className="uppercase">Vesting Token</p>
          <p className="uppercase">Start/End</p>
          <p className="uppercase">Status</p>
          <p className="uppercase">Wrap Token</p>
          <p className="uppercase"></p>
        </div>
      ) : null}

      <div className="mt-4 grid gap-2">
        {streams?.map((vestedERC20, index: number) => {
          const token = vestedERC20.underlying;
          const startDate = dateFormat(vestedERC20.startTimestamp);
          const endDate = dateFormat(vestedERC20.endTimestamp);

          return isComplete ? (
            <div className="items-center grid grid-cols-5" key={index}>
              {/* <p className="mb-0 text-base">{vestedERC20.name}</p> */}
              <p className=" mb-0 text-base">
                <TokenBadge address={vestedERC20.id} name={vestedERC20.name} symbol={vestedERC20.symbol} />
              </p>
              <p className="mb-0 text-base">
                {startDate} - {endDate}
              </p>
              <p className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vestedERC20, blockTimestamp)]}</p>
              {/* <p className="mb-0 text-base">{vestedERC20.symbol}</p> */}
              <p className="mb-0 text-base">
                <TokenBadge address={token.id} name={token.name} symbol={token.symbol} />
              </p>
              <p>
                {getStatusStreamPack(vestedERC20, blockTimestamp) === StreamPackStatus.OPEN &&
                  WrapButton(() => handleWrap(vestedERC20.id, token.id))}
              </p>
            </div>
          ) : (
            <div className="items-center grid grid-cols-4 gap-2" key={index}>
              <p className="mb-0 text-base">
                <TokenBadge address={vestedERC20.id} name={vestedERC20.name} symbol={vestedERC20.symbol} />
              </p>
              <p className="mb-0 text-base">
                <TokenBadge address={token.id} name={token.name} symbol={token.symbol} />
              </p>
              <p className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vestedERC20, blockTimestamp)]}</p>
              <p>
                {getStatusStreamPack(vestedERC20, blockTimestamp) === StreamPackStatus.OPEN &&
                  WrapButton(() => handleWrap(vestedERC20.id, token.id))}
              </p>
            </div>
          );
        })}
      </div>

      {!isComplete ? (
        <div className="mt-4">
          <a
            href={RoutesPath.STREAMS_PACK}
            className="flex-none px-2 font-medium bg-white pointer-events-auto rounded-md py-[0.3125rem] text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
            View all packs
          </a>
        </div>
      ) : null}
    </>
  );
};

export default StreamPackListDesktop;
