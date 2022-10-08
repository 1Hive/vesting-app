import { Empty, Skeleton } from 'antd';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { useProvider, useSigner } from 'wagmi';
import { VestedERC20 } from '~~/generated/contract-types/VestedERC20';
import { truncate } from '~~/helpers';
import { getBlockTimestamp, getContractERC20 } from '~~/helpers/contract';
import { useUserVestings } from '~~/hooks';
import { useBeeContract } from '~~/hooks/use-bee-contract';
import { useIsMounted } from '~~/hooks/use-is-mounted';
import useResponsive from '~~/hooks/use-responsive';
import { getNetworkNameByChainID } from '~~/models/constants/networks';
import { Vesting } from '~~/types-and-hooks';
import UserStreamListDesktop from './desktop-list';
import UserStreamListMobile from './mobile-list';

const INTERVAL = 250;

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

export const getStatusStream = (vest: Vesting, blockTimestamp: number | undefined, address: string | undefined) => {
  if (!blockTimestamp) {
    return MyStreamingStatus.UNKNOWN;
  }
  if (blockTimestamp < vest.token.startTimestamp) {
    return MyStreamingStatus.NOT_ACTIVE;
  } else if (blockTimestamp > vest.token.endTimestamp) {
    return MyStreamingStatus.CLOSED;
  } else {
    if (
      vest.recipient !== undefined &&
      address !== undefined &&
      vest.recipient.toLowerCase() === address.toLowerCase()
    ) {
      return MyStreamingStatus.STREAMING;
    }
    return MyStreamingStatus.OPEN;
  }
};

export const RedeemValue = ({ vesting, accountHolder }: { vesting: Vesting; accountHolder: string }) => {
  const [redeemableAmountBN, setRedeemableAmountBN] = useState<BigNumber | undefined>();
  const [redeemableAmount, setRedeemableAmount] = useState<string | undefined>();
  const [claimedUnderlyingAmount, setClaimedUnderlyingAmount] = useState<BigNumber | undefined>();
  const [startTimestamp] = useState<BigNumber | undefined>(BigNumber.from(vesting.token.startTimestamp));
  const [endTimestamp] = useState<BigNumber | undefined>(BigNumber.from(vesting.token.endTimestamp));
  const [blockTimestamp, setBlockTimestamp] = useState<BigNumber | undefined>();
  const [balanceClaimable, setBalanceClaimable] = useState<BigNumber | undefined>();

  const vestedERCAddress = vesting.id.split('-')[0];
  const provider = useProvider();

  const isMounted = useIsMounted();

  const { data: signer } = useSigner();

  const vestedERC20 = useBeeContract('VestedERC20') as unknown as VestedERC20 | undefined;

  useEffect(() => {
    const some = async () => {
      if (isMounted()) {
        // console.log('vesting', vesting);
        const vestedERC20Contract = vestedERC20?.attach(vestedERCAddress);

        const blockTimestamp = await getBlockTimestamp(provider);
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
          const erc20 = getContractERC20({ signer, contractAddress: underlyingToken });
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
  }, [accountHolder, isMounted, provider, signer, vestedERC20, vestedERCAddress, vesting]);

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
              const sub2 = endTimestamp.sub(startTimestamp);
              // console.log('sub2', sub2.toNumber());
              // console.log('balanceClaimable', formatEther(balanceClaimable));
              const ratio = balanceClaimable.div(sub2).toNumber() * (INTERVAL / 1000);
              // console.log('ratio', ratio);
              const ratioCountPosition = ratio.toString().length - 2;
              const baseCountPosition = redeemableAmountBN.toString().length;
              const shortRedeeambleAmount = truncate(
                formatEther(redeemableAmountBN.add(ratio)),
                baseCountPosition - ratioCountPosition
              );

              // console.log('shortRedeeambleAmount', shortRedeeambleAmount);

              setRedeemableAmountBN(redeemableAmountBN.add(ratio));
              setRedeemableAmount(shortRedeeambleAmount);
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

  return <>{redeemableAmount ? redeemableAmount : ' Loading...'}</>;
};

export const ClaimedValue = ({ vesting, accountHolder }: { vesting: Vesting; accountHolder: string }) => {
  const [claimedUnderlyingAmount, setClaimedUnderlyingAmount] = useState<BigNumber | undefined>();
  const [balanceClaimable, setBalanceClaimable] = useState<BigNumber | undefined>();

  const vestedERCAddress = vesting.id.split('-')[0];
  const provider = useProvider();

  const isMounted = useIsMounted();

  const { data: signer } = useSigner();

  const vestedERC20 = useBeeContract('VestedERC20') as unknown as VestedERC20 | undefined;

  useEffect(() => {
    const some = async () => {
      if (isMounted()) {
        // console.log('vesting', vesting);
        const vestedERC20Contract = vestedERC20?.attach(vestedERCAddress);

        const balanceAbleClaim = await vestedERC20Contract?.getRedeemableAmount(accountHolder);
        const balanceClaimable = await vestedERC20Contract?.balanceOf(accountHolder);

        const claimedWrappedAmount = BigNumber.from(vesting.claimedUnderlyingAmount);
        // const claimedWrappedAmount = await vestedERC20Contract?.claimedUnderlyingAmount(accountHolder); // TODO could now be get for subgraph
        const underlyingToken = await vestedERC20Contract?.underlying(); // TODO could now be get for subgraph
        // const underlyingToken = await vestedERC20Contract?.underlying(); // TODO could now be get for subgraph

        console.log('underlyingToken', underlyingToken);
        if (underlyingToken) {
          const erc20 = getContractERC20({ signer, contractAddress: underlyingToken });
          const balanceToBeStreamed = await erc20.balanceOf(vestedERCAddress);
          if (balanceToBeStreamed) console.log('balanceToBeStreamed', ethers.utils.formatEther(balanceToBeStreamed));
        }
        if (balanceClaimable) {
          console.log('balanceClaimable', ethers.utils.formatEther(balanceClaimable));
          setBalanceClaimable(balanceClaimable);
        }
        if (balanceAbleClaim) console.log('balanceAbleClaim', ethers.utils.formatEther(balanceAbleClaim));
        if (claimedWrappedAmount) console.log('claimedWrappedAmount', ethers.utils.formatEther(claimedWrappedAmount));
        setClaimedUnderlyingAmount(claimedWrappedAmount);
      }
    };

    void some();
  }, [accountHolder, isMounted, provider, signer, vestedERC20, vestedERCAddress, vesting]);

  return (
    <>
      {claimedUnderlyingAmount ? truncate(ethers.utils.formatEther(claimedUnderlyingAmount), 3) : ' Loading...'} /{' '}
      {balanceClaimable ? truncate(ethers.utils.formatEther(balanceClaimable), 3) : ' Loading...'}
    </>
  );
};

const MyUserStreams = ({
  account,
  isComplete,
  chainId,
}: {
  account: string;
  chainId: number;
  isComplete?: boolean;
}) => {
  const provider = useProvider();
  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>();
  const { loading, error, data } = useUserVestings(account, getNetworkNameByChainID(chainId));
  const isMounted = useIsMounted();
  const { isMobile } = useResponsive();

  useEffect(() => {
    const updateBlocktimestamp = async () => {
      const blockTimestamp = await getBlockTimestamp(provider);
      if (blockTimestamp) {
        if (isMounted()) {
          setBlockTimestamp(blockTimestamp);
        }
      }
    };
    void updateBlocktimestamp();
  }, [isMounted, provider, setBlockTimestamp]);

  const isEmpty = useMemo(() => {
    return data?.vestings === undefined || data?.vestings?.length === 0;
  }, [data]);

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
        <p>{JSON.stringify(error, null, 4)}</p>
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

export default MyUserStreams;
