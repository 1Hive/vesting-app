import { TokenBadge } from '@1hive/1hive-ui';
import { Skeleton } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useAppContracts } from '~~/config/contractContext';
import { getContractERC20 } from '~~/helpers/contract';
import { dateFormat } from '~~/helpers/date-utils';
import { useIsMounted } from '~~/hooks/use-is-mounted';
import { useVestedTokens } from '~~/hooks/use-vested-tokens';

const RedeemValue = ({ vestedERCAddress, accountHolder }: { vestedERCAddress: string; accountHolder: string }) => {
  const [redeemableAmountBN, setRedeemableAmountBN] = useState<BigNumber | undefined>();
  const [claimedUnderlyingAmount, setClaimedUnderlyingAmount] = useState<BigNumber | undefined>();
  const [startTimestamp, setStartTimestamp] = useState<BigNumber | undefined>();
  const [blockTimestamp, setBlockTimestamp] = useState<BigNumber | undefined>();
  const [endTimestamp, setEndTimestamp] = useState<BigNumber | undefined>();
  const [initialBalance, setInitialBalance] = useState<BigNumber | undefined>();
  const ethersContext = useEthersContext();
  const vestedERC20Contract = useAppContracts('VestedERC20', ethersContext.chainId)?.attach(vestedERCAddress);

  const isMounted = useIsMounted();

  // console.log('vestedERCAddress', vestedERCAddress);
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
        console.log('accountHolder', accountHolder);

        const vestedStartTimestamp = await vestedERC20Contract?.startTimestamp();
        const vestedEndTimestamp = await vestedERC20Contract?.endTimestamp();
        const blockNumber = ethersContext.provider?.blockNumber;
        if (blockNumber) {
          const block = await ethersContext.provider?.getBlock(blockNumber);

          console.log('block?.timestamp');
          setBlockTimestamp(BigNumber.from(block?.timestamp));
        }

        if (vestedStartTimestamp) {
          setStartTimestamp(vestedStartTimestamp);
          console.log('vestedStartTimestamp', vestedStartTimestamp.toNumber());
        }
        if (vestedEndTimestamp) setEndTimestamp(vestedEndTimestamp);

        const balanceAbleClaim = await vestedERC20Contract?.getRedeemableAmount(accountHolder);
        const balanceClaimable = await vestedERC20Contract?.balanceOf(accountHolder);
        const claimedWrappedAmount = await vestedERC20Contract?.claimedUnderlyingAmount(accountHolder);
        const underlyingToken = await vestedERC20Contract?.underlying();
        if (underlyingToken) {
          console.log('underlyingToken', underlyingToken);
          const erc20 = getContractERC20({ ethersContext, contractAddress: underlyingToken });
          const balanceToBeStreamed = await erc20.balanceOf(vestedERCAddress);
          if (balanceToBeStreamed) console.log('balanceToBeStreamed', ethers.utils.formatEther(balanceToBeStreamed));
        }
        if (balanceClaimable)
          console.log('balanceClaimable/InitialBalance', ethers.utils.formatEther(balanceClaimable));
        // if (initialBalance) console.log('initialBalance', ethers.utils.formatEther(initialBalance));
        setInitialBalance(balanceClaimable);
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
    const intervalId = setInterval(() => {
      if (isMounted()) {
        if (
          redeemableAmountBN &&
          blockTimestamp &&
          startTimestamp &&
          endTimestamp &&
          claimedUnderlyingAmount &&
          initialBalance
        ) {
          if (blockTimestamp.lte(endTimestamp)) {
            const flow = initialBalance
              .mul(blockTimestamp.sub(startTimestamp))
              .div(claimedUnderlyingAmount.sub(endTimestamp.sub(startTimestamp)));

            const temp = redeemableAmountBN.add(1);

            if (flow) console.log('flow', ethers.utils.formatEther(flow));
            if (temp) console.log('temp', ethers.utils.formatEther(temp));
            // if (!flow.eq(BigNumber.from(0))) {
            setRedeemableAmountBN(temp);
          }
          // }
        }
      }
    }, 250);

    return () => clearInterval(intervalId);
  }, [
    blockTimestamp,
    claimedUnderlyingAmount,
    endTimestamp,
    initialBalance,
    isMounted,
    redeemableAmountBN,
    startTimestamp,
  ]);

  return <>{redeemableAmountBN ? ethers.utils.formatEther(redeemableAmountBN) : null}</>;
};

const MyUserVestings = ({ isComplete }: { isComplete?: boolean }) => {
  const { loading, error, data } = useVestedTokens();

  const ethersContext = useEthersContext();

  const isEmpty = useMemo(() => {
    return data?.vestedERC20S === undefined || data?.vestedERC20S?.length === 0;
  }, [data?.vestedERC20S]);

  const streams = useMemo(() => {
    return isComplete ? data?.vestedERC20S : data?.vestedERC20S.slice(0, 5);
  }, [data?.vestedERC20S, isComplete]);

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
        <>
          {isComplete ? (
            <div className="mb-4 grid grid-cols-5">
              <p className="uppercase">Vesting Token</p>
              <p className="uppercase">Start/End</p>
              <p className="uppercase">Streaming</p>
              <p className="uppercase">Token</p>
              <p className="uppercase">$</p>
            </div>
          ) : null}
          <div className="flex flex-col mt-4">
            {streams?.map((vest, index: number) => {
              const token = vest.underlying;
              const startDate = dateFormat(vest.startTimestamp);
              const endDate = dateFormat(vest.endTimestamp);

              return isComplete ? (
                <div className="mb-4 grid grid-cols-5" key={index}>
                  <p className="mb-0 text-base">
                    <TokenBadge address={vest.id} name={vest.name} symbol={vest.symbol} />
                  </p>
                  <p className="mb-0 text-base">
                    {startDate} - {endDate}
                  </p>
                  <p className="mb-0 text-base">Incoming</p>
                  {/* <p className="mb-0 text-base">{vest.underlying.symbol}</p> */}
                  <p className="mb-0 text-base">
                    <TokenBadge address={token.id} name={token.name} symbol={token.symbol} />
                  </p>
                  <p className="mb-0 text-base">
                    $
                    {ethersContext.account ? (
                      <RedeemValue vestedERCAddress={vest.id} accountHolder={ethersContext.account} />
                    ) : (
                      'Loading...'
                    )}
                  </p>
                </div>
              ) : (
                <div className="mb-4 grid grid-cols-3" key={index}>
                  <p className="mb-0 text-base">{vest.name}</p>
                  <p className="mb-0 text-base">
                    <>
                      <TokenBadge
                        address={vest.underlying.id}
                        name={vest.underlying.name}
                        symbol={vest.underlying.symbol}
                      />
                    </>
                  </p>
                  <p className="mb-0 text-base">$12.20</p>
                </div>
              );
            })}
          </div>
          {!isComplete ? (
            <div className="mt-4">
              <a
                href="/transactions"
                className="flex-none px-2 font-medium bg-white pointer-events-auto rounded-md py-[0.3125rem] text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
                View all transactions
              </a>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default MyUserVestings;
