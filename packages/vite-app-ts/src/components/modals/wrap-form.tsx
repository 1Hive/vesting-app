// import { BigNumber } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEthersContext } from 'eth-hooks/context';
import { useAppContracts } from '~~/config/contract-context';
import { BigNumber } from 'ethers';
import { toDecimals } from '~~/helpers/math-utils';
import { WrapType } from '.';
import { useContractExistsAtAddress } from 'eth-hooks';
import { getContractERC20 } from '~~/helpers/contract';
import { TransactionBadge } from '@1hive/1hive-ui';
import { getNetworkInfo } from '~~/functions';
import { useIsMounted } from '~~/hooks';
import { useAccount, useSigner } from 'wagmi';
import { useCurrentChainId } from '~~/hooks/use-chain-id';

export const Wrap = ({ vestedAdress, underlyingTokenAddress }: WrapType) => {
  const [state, setState] = useState({
    underlyingAmount: '',
    address: '',
  });

  const isMounted = useIsMounted();

  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  // const ethersContext = useEthersContext();

  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { chainId } = useCurrentChainId();
  const network = getNetworkInfo(chainId);
  const vestedERC20 = useAppContracts('VestedERC20', chainId);
  const underlyingTokenERC20 = getContractERC20({ signer, contractAddress: underlyingTokenAddress });

  const [isErcExist, _update, queryStatus] = useContractExistsAtAddress(underlyingTokenERC20);

  useEffect(() => {
    console.log('isErcExist', isErcExist);
    console.log('queryStatus', queryStatus);
  }, [isErcExist, queryStatus]);

  const handleWrap = useCallback(async () => {
    if (isErcExist && queryStatus === 'success') {
      const amount = BigNumber.from(toDecimals(state.underlyingAmount, 18));
      console.log('before approve');
      const r = await underlyingTokenERC20.approve(vestedAdress, amount); // TODO Check with Gabi if need use approve(0) here first
      console.log('tx approve', r);
      await r?.wait(); // TODO we should handle errors/cancel before try wrap.
      console.log('tx success approve');
      console.log('start wrap');
      const tx = await vestedERC20?.attach(vestedAdress).wrap(amount, state.address, { gasLimit: 150000 });
      if (isMounted()) {
        setTxHash(tx?.hash);
      }
      console.log('wait wrap');
      await tx?.wait();
      console.log('end wrap');
    } else {
      console.log('Do something if it not exist, or not found if without internet'); // TODO: Replace for propper Logger.
    }
  }, [
    isErcExist,
    queryStatus,
    state.underlyingAmount,
    state.address,
    underlyingTokenERC20,
    vestedAdress,
    vestedERC20,
    isMounted,
  ]);

  const inputAdress = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e: any) => setState((prev: any) => ({ ...prev, underlyingAmount: e.target.value }))}
      />
      <input
        ref={inputAdress}
        type="text"
        name="address"
        placeholder="Receipt Address (0x000...)"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e: any) => setState((prev: any) => ({ ...prev, address: e.target.value }))}
      />
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => {
          setState((prev: any) => ({ ...prev, address }));
          if (inputAdress.current && address) {
            inputAdress.current.value = address;
          }
        }}
        className="px-3 py-2 font-semibold text-white bg-black pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-gray-500">
        Me
      </button>

      <div className="mt-4">
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleWrap}
          className="px-3 py-2 font-semibold text-white bg-black pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-gray-500">
          Wrap
        </button>
      </div>
      <div className="mt-4">
        {txHash && network && (
          <TransactionBadge
            transaction={txHash}
            networkType={network.name}
            // explorerProvider={network.blockExplorer}
          />
        )}
      </div>
    </div>
  );
};
