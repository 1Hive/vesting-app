import { TokenBadge } from '@1hive/1hive-ui';
import { useAccount } from 'wagmi';
import { dateFormat } from '~~/helpers/date-utils';
import { useCurrentChainId } from '~~/hooks/use-chain-id';
import { RoutesPath } from '~~/main';
import { VestedErc20 } from '~~/types-and-hooks';
import { MyStreamingStatus, RedeemValue, getStatusStream } from '.';

export type UserStreamListDesktopProps = {
  isComplete?: boolean;
  list:
    | {
        __typename?: 'Vesting' | undefined;
        claimedUnderlyingAmount: any;
        createdAt: number;
        id: string;
        recipient: any;
        underlyingAmount: any;
        wrappedTokenAmount: any;
        token: VestedErc20;
      }[]
    | undefined;
  blockTimestamp?: number | undefined;
};

const UserStreamListDesktop = ({ isComplete, list, blockTimestamp }: UserStreamListDesktopProps) => {
  const { isConnected, address } = useAccount();

  const { chainId } = useCurrentChainId();

  return (
    <>
      {isComplete ? (
        <div className="mb-4 grid grid-cols-5">
          <p className="uppercase">Vesting Token</p>
          <p className="uppercase">Start/End</p>
          <p className="uppercase">Streaming</p>
          <p className="uppercase">Wrapped Token</p>
          <p className="uppercase">$</p>
        </div>
      ) : null}
      <div className="mt-4 grid gap-2">
        {list?.map((vest, index: number) => {
          const vestToken = vest.token;
          const wrappedToken = vest.token.underlying;
          const startDate = dateFormat(vestToken.startTimestamp);
          const endDate = dateFormat(vestToken.endTimestamp);

          return isComplete ? (
            <div className="grid grid-cols-5" key={index}>
              <p className="mb-0 text-base">
                <TokenBadge address={vestToken.id} name={vestToken.name} symbol={vestToken.symbol} />
              </p>
              <p className="mb-0 text-base">
                {startDate} - {endDate}
              </p>
              <p className="mb-0 text-base">{MyStreamingStatus[getStatusStream(vest, blockTimestamp)]}</p>
              <p className="mb-0 text-base">
                <TokenBadge address={wrappedToken.id} name={wrappedToken.name} symbol={wrappedToken.symbol} />
              </p>
              <p className="mb-0 text-base">
                $
                {isConnected && address && chainId ? (
                  <RedeemValue vesting={vest} accountHolder={address} chainId={chainId} />
                ) : (
                  'Loading...'
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3" key={index}>
              <p className="mb-0 text-base">
                <TokenBadge address={vestToken.id} name={vestToken.name} symbol={vestToken.symbol} />
              </p>
              <p className="mb-0 text-base">
                <TokenBadge address={wrappedToken.id} name={wrappedToken.name} symbol={wrappedToken.symbol} />
              </p>
              <p className="mb-0 text-base">$12.20</p>
            </div>
          );
        })}
      </div>
      {!isComplete ? (
        <div className="mt-4">
          <a
            href={RoutesPath.MY_STREAMS}
            className="flex-none px-2 font-medium bg-white pointer-events-auto rounded-md py-[0.3125rem] text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
            View all streams
          </a>
        </div>
      ) : null}
    </>
  );
};

export default UserStreamListDesktop;
