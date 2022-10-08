import { TokenBadge } from '@1hive/1hive-ui';
import { NavLink } from 'react-router-dom';
import { dateFormat } from '~~/helpers/date-utils';
import { RoutesPath } from '~~/main';
import { VestedErc20 } from '~~/types-and-hooks';
import { getStatusStreamPack, StreamPackStatus, WrapButton } from '.';

type StreamPackListDesktopProps = {
  isComplete?: boolean;
  list: VestedErc20[] | undefined;
  handleWrap: (underlyingTokenAddress: string, vestedAdress: string) => void;
  blockTimestamp: number | undefined;
};

const StreamPackListDesktop = ({ isComplete, list, handleWrap, blockTimestamp }: StreamPackListDesktopProps) => {
  return (
    <>
      {isComplete ? (
        <div className="mb-4 grid grid-cols-5">
          <div className="uppercase">Vesting Token</div>
          <div className="uppercase">Start/End</div>
          <div className="uppercase">Status</div>
          <div className="uppercase">Wrap Token</div>
          <div className="uppercase"></div>
        </div>
      ) : null}

      <div className="mt-4 grid gap-2">
        {list?.map((vestedERC20, index: number) => {
          const token = vestedERC20.underlying;
          const startDate = dateFormat(vestedERC20.startTimestamp);
          const endDate = dateFormat(vestedERC20.endTimestamp);

          return isComplete ? (
            <div className="items-center grid grid-cols-5" key={index}>
              {/* <p className="mb-0 text-base">{vestedERC20.name}</p> */}
              <div className=" mb-0 text-base">
                <TokenBadge
                  address={vestedERC20.id}
                  name={vestedERC20.name}
                  symbol={vestedERC20.symbol}
                  networkType="something"
                />
              </div>
              <div className="mb-0 text-base">
                {startDate} - {endDate}
              </div>
              <div className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vestedERC20, blockTimestamp)]}</div>
              {/* <p className="mb-0 text-base">{vestedERC20.symbol}</p> */}
              <div className="mb-0 text-base">
                <TokenBadge address={token.id} name={token.name} symbol={token.symbol} networkType="something" />
              </div>
              <div>
                {getStatusStreamPack(vestedERC20, blockTimestamp) === StreamPackStatus.OPEN &&
                  WrapButton(() => handleWrap(token.id, vestedERC20.id))}
              </div>
            </div>
          ) : (
            <div className="items-center grid grid-cols-4 gap-2" key={index}>
              <div className="mb-0 text-base">
                <TokenBadge
                  address={vestedERC20.id}
                  name={vestedERC20.name}
                  symbol={vestedERC20.symbol}
                  networkType="something"
                />
              </div>
              <div className="mb-0 text-base">
                <TokenBadge address={token.id} name={token.name} symbol={token.symbol} networkType="something" />
              </div>
              <div className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vestedERC20, blockTimestamp)]}</div>
              <div>
                {getStatusStreamPack(vestedERC20, blockTimestamp) === StreamPackStatus.OPEN &&
                  WrapButton(() => handleWrap(token.id, vestedERC20.id))}
              </div>
            </div>
          );
        })}
      </div>

      {!isComplete ? (
        <div className="mt-4">
          <NavLink
            to={RoutesPath.STREAMS_PACK}
            className="flex-none px-2 font-medium bg-white pointer-events-auto rounded-md py-[0.3125rem] text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
            activeClassName="selected">
            View all
          </NavLink>
        </div>
      ) : null}
    </>
  );
};

export default StreamPackListDesktop;
