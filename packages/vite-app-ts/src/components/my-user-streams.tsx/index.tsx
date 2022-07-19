import { Empty, Skeleton } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useAppContracts } from '~~/config/contract-context';
import { getBlockTimestamp, getContractERC20 } from '~~/helpers/contract';
import { useUserVestings } from '~~/hooks';
import { useIsMounted } from '~~/hooks/use-is-mounted';
import useResponsive from '~~/hooks/use-responsive';
import { Vesting } from '~~/types-and-hooks';
import UserStreamListDesktop from './desktop-list';
import UserStreamListMobile from './mobile-list';

const INTERVAL = 1000;

enum StreamPackStatus {
  NOT_INITIALIAZED, // Current block timestamp LOWER than start-end timestamp
  OPEN, // Current block timestamp BETWEEN start-end timestamp
  CLOSED, // Current block timestamp GREATER than start-end timestamp
  CAN_BE_WRAPPED, // only IF NOT StreamPackStatus.CLOSED.
  UNKNOWN,
}

enum StreamingStatus {
  NOT_ACTIVE, // same as StreamPackStatus.NOT_INITIALIAZED AND not have any destination address (receipt)
  ACTIVE, // StreamPackStatus.OPEN AND have at least one receipt
  FINISHED, // same as StreamPackStatus.CLOSED (maybe not necessary)
  UNKNOWN,
}

export enum MyStreamingStatus {
  NOT_ACTIVE, // same as StreamPackStatus.NOT_INITIALIAZED AND not have any destination address (receipt)
  OPEN, // Current block timestamp BETWEEN start-end timestamp
  CLOSED, // Current block timestamp GREATER than start-end timestamp

  STREAMING, // StreamPackStatus.OPEN AND have at least me as receipt
  CAN_BE_WRAPPED, // same as StreamPackStatus.CAN_BE_WRAPPED
  FINISHED, // same as StreamPackStatus.CLOSED (maybe not necessary)
  CAN_BE_CLAIMED, // anytime have redeemableAmount available.
  UNKNOWN,
}

export const getStatusStream = (vest: Vesting, blockTimestamp: number | undefined) => {
  if (!blockTimestamp) {
    return MyStreamingStatus.UNKNOWN;
  }
  if (blockTimestamp < vest.token.startTimestamp) {
    return MyStreamingStatus.NOT_ACTIVE;
  } else if (blockTimestamp > vest.token.endTimestamp) {
    return MyStreamingStatus.CLOSED;
  } else {
    return MyStreamingStatus.OPEN;
  }
};

export const RedeemValue = ({ vesting, accountHolder }: { vesting: Vesting; accountHolder: string }) => {
  const [redeemableAmountBN, setRedeemableAmountBN] = useState<BigNumber | undefined>();
  const [claimedUnderlyingAmount, setClaimedUnderlyingAmount] = useState<BigNumber | undefined>();
  const [startTimestamp] = useState<BigNumber | undefined>(BigNumber.from(vesting.token.startTimestamp));
  const [endTimestamp] = useState<BigNumber | undefined>(BigNumber.from(vesting.token.endTimestamp));
  const [blockTimestamp, setBlockTimestamp] = useState<BigNumber | undefined>();
  const [balanceClaimable, setBalanceClaimable] = useState<BigNumber | undefined>();
  const ethersContext = useEthersContext();

  const vestedERCAddress = vesting.id;

  const vestedERC20Contract = useAppContracts('VestedERC20', ethersContext.chainId)?.attach(vestedERCAddress);

  const isMounted = useIsMounted();

  // TODO that use intervalpool maybe its that we dont want, if we want manually initialize
  // const [redeemableAmountBN, _updateRedeemableAmount] = useContractReader(
  //   vestedERC20Contract,
  //   vestedERC20Contract?.getRedeemableAmount,
  //   [_accountHolder]
  //   // vestedERC20Contract?.filters.Transfer()
  // );

  useEffect(() => {
    const some = async () => {
      if (isMounted()) {
        console.log('vesting', vesting);

        console.log('accountHolder', accountHolder);

        const blockTimestamp = await getBlockTimestamp(ethersContext);
        if (blockTimestamp) {
          setBlockTimestamp(BigNumber.from(blockTimestamp));
          console.log('blockTimestamp', blockTimestamp);
        }

        const balanceAbleClaim = await vestedERC20Contract?.getRedeemableAmount(accountHolder);
        const balanceClaimable = await vestedERC20Contract?.balanceOf(accountHolder);
        const claimedWrappedAmount = await vestedERC20Contract?.claimedUnderlyingAmount(accountHolder); // TODO could now be get for subgraph
        const underlyingToken = await vestedERC20Contract?.underlying(); // TODO could now be get for subgraph
        if (underlyingToken) {
          console.log('underlyingToken', underlyingToken);
          const erc20 = getContractERC20({ ethersContext, contractAddress: underlyingToken });
          const balanceToBeStreamed = await erc20.balanceOf(vestedERCAddress);
          if (balanceToBeStreamed) console.log('balanceToBeStreamed', ethers.utils.formatEther(balanceToBeStreamed));
        }
        if (balanceClaimable) {
          console.log('balanceClaimable', ethers.utils.formatEther(balanceClaimable));
          setBalanceClaimable(balanceClaimable);
        }
        setRedeemableAmountBN(balanceAbleClaim);
        if (balanceAbleClaim) console.log('balanceAbleClaim', ethers.utils.formatEther(balanceAbleClaim));
        if (claimedWrappedAmount) console.log('claimedWrappedAmount', ethers.utils.formatEther(claimedWrappedAmount));
        setClaimedUnderlyingAmount(claimedWrappedAmount);
      }
    };

    void some();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountHolder, vestedERCAddress]);

  useEffect(() => {
    if (blockTimestamp && startTimestamp && endTimestamp && balanceClaimable && claimedUnderlyingAmount) {
      if (blockTimestamp.lte(startTimestamp)) {
        console.log('Status Stream: Not initiated');
      } else if (blockTimestamp.gte(endTimestamp)) {
        console.log('Status Stream: Finished');
        const value = balanceClaimable.sub(claimedUnderlyingAmount);
        if (value) console.log('value', ethers.utils.formatEther(value));
        if (isMounted()) {
          setRedeemableAmountBN(value);
        }
      }
    }
  }, [balanceClaimable, blockTimestamp, claimedUnderlyingAmount, endTimestamp, isMounted, startTimestamp]);

  useEffect(() => {
    let intervalId: number = -1;
    if (
      redeemableAmountBN &&
      blockTimestamp &&
      startTimestamp &&
      endTimestamp &&
      claimedUnderlyingAmount &&
      balanceClaimable &&
      !balanceClaimable.isZero()
    ) {
      intervalId = window.setInterval(() => {
        if (isMounted()) {
          if (
            redeemableAmountBN &&
            blockTimestamp &&
            startTimestamp &&
            endTimestamp &&
            claimedUnderlyingAmount &&
            balanceClaimable &&
            !balanceClaimable.isZero()
          ) {
            if (blockTimestamp.lte(endTimestamp)) {
              const sub1 = blockTimestamp.sub(startTimestamp);
              const sub2 = endTimestamp.sub(startTimestamp);
              console.log('sub1', sub1.toNumber());
              console.log('sub2', sub2.toNumber());
              console.log('balanceClaimable', ethers.utils.formatEther(balanceClaimable));

              const subTotal = balanceClaimable.mul(sub1).div(sub2);
              console.log('subTotal', subTotal.toNumber());
              console.log('claimedUnderlyingAmount', claimedUnderlyingAmount.toNumber());
              const flow = subTotal.sub(claimedUnderlyingAmount);

              if (flow) console.log('flow', ethers.utils.formatEther(flow));
              if (!flow.isZero()) {
                setRedeemableAmountBN((current) => current?.add(flow));
              }
            }
          }
        }
      }, INTERVAL);
    }
    return () => {
      if (intervalId > 0) clearInterval(intervalId);
    };
  }, [
    blockTimestamp,
    claimedUnderlyingAmount,
    endTimestamp,
    balanceClaimable,
    isMounted,
    redeemableAmountBN,
    startTimestamp,
  ]);

  return <>{redeemableAmountBN ? ethers.utils.formatEther(redeemableAmountBN) : null}</>;
};

const MyUserVestings = ({ account, isComplete }: { account: string; isComplete?: boolean }) => {
  const { loading, error, data } = useUserVestings(account);
  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>();
  const ethersContext = useEthersContext();
  const isMounted = useIsMounted();
  const { isMobile } = useResponsive();

  useEffect(() => {
    const updateBlocktimestamp = async () => {
      const blockTimestamp = await getBlockTimestamp(ethersContext);
      if (blockTimestamp) {
        if (isMounted()) {
          setBlockTimestamp(blockTimestamp);
        }
      }
    };
    void updateBlocktimestamp();
  }, [ethersContext, isMounted, setBlockTimestamp]);

  const isEmpty = useMemo(() => {
    return data?.vestings === undefined || data?.vestings?.length === 0;
  }, [data?.vestings]);

  const streams = useMemo(() => {
    return isComplete ? data?.vestings : data?.vestings.slice(0, 5);
  }, [data?.vestings, isComplete]);

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
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No streams… yet. Send your first stream!" />
      ) : isMobile ? (
        <UserStreamListMobile list={streams} />
      ) : (
        <UserStreamListDesktop list={streams} isComplete={isComplete} blockTimestamp={blockTimestamp} />
      )}
    </div>
  );
};

export default MyUserVestings;
