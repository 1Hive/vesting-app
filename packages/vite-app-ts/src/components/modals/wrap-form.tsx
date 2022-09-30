// import { BigNumber } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { toDecimals } from '~~/helpers/math-utils';
import { WrapType } from '.';
import { getContractERC20 } from '~~/helpers/contract';
import { TransactionBadge } from '@1hive/1hive-ui';
import { getNetworkInfo } from '~~/functions';
import { useIsMounted } from '~~/hooks';
import { useAccount, useSigner } from 'wagmi';
import { useCurrentChainId } from '~~/hooks/use-chain-id';
import { VestedERC20 } from '~~/generated/contract-types';
import { useBeeContract } from '~~/hooks/use-bee-contract';

export const Wrap = ({ vestedAdress, underlyingTokenAddress }: WrapType) => {
  const [state, setState] = useState({
    underlyingAmount: '',
    address: '',
    underlyingBalance: BigNumber.from(0),
  });

  const isMounted = useIsMounted();

  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  // const ethersContext = useEthersContext();

  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { chainId } = useCurrentChainId();
  const network = getNetworkInfo(chainId);
  const vestedERC20 = useBeeContract('VestedERC20') as unknown as VestedERC20 | undefined;
  // const vestedERC20 = useAppContracts('VestedERC20', chainId);
  const underlyingTokenERC20 = getContractERC20({ signer, contractAddress: underlyingTokenAddress });

  const inputAdress = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    void (async () => {
      if (underlyingTokenERC20 && address) {
        const underlyingBalance = await underlyingTokenERC20.balanceOf(address);
        setState((prev: any) => ({ ...prev, underlyingBalance }));
      }
    })();
  }, [address, underlyingTokenERC20]);

  const handleWrap = useCallback(async () => {
    try {
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
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`Error:${error}`); // TODO: Replace for propper Logger.
    }
  }, [state.underlyingAmount, state.address, underlyingTokenERC20, vestedAdress, vestedERC20, isMounted]);

  const handleAmountOnChange = (e: any) => {
    setState((prev: any) => ({ ...prev, underlyingAmount: e.target.value }));
  };

  return (
    <div>
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleAmountOnChange}
      />
      <span>Balance: ${utils.formatEther(state.underlyingBalance)}</span>
      <input
        ref={inputAdress}
        type="text"
        name="address"
        placeholder="Receipt Address (0x000...)"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e: any) => setState((prev: any) => ({ ...prev, address: e.target.value }))}
      />
      <button
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
          disabled={state.underlyingBalance.lte(0)}
          className={`px-3 py-2 font-semibold text-white bg-black rounded-md text-[0.8125rem] leading-5 hover:bg-gray-500 ${
            state.underlyingBalance.gt(0) ? 'pointer-events-auto' : 'opacity-50 cursor-not-allowed'
          }`}>
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
