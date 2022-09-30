import { useCallback, useEffect, useState } from 'react';
import { Field } from '@1hive/1hive-ui';
import { ethers } from 'ethers';
import { RedeemType } from '.';
import { useIsMounted } from '~~/hooks/use-is-mounted';
import { VestedERC20 } from '~~/generated/contract-types';
import { useBeeContract } from '~~/hooks/use-bee-contract';

export const Redeem = ({ vestedAdress, address }: RedeemType) => {
  const isMounted = useIsMounted();
  const [redeemableAmount, setRedeemableAmount] = useState('');

  const vestedERC20 = useBeeContract('VestedERC20') as unknown as VestedERC20 | undefined;
  // const vestedERC20 = useAppContracts('VestedERC20', ethersContext.chainId);

  useEffect(() => {
    const loadAmount = async () => {
      if (vestedERC20) {
        const value = await vestedERC20.attach(vestedAdress).getRedeemableAmount(address);
        if (isMounted()) setRedeemableAmount(ethers.utils.formatEther(value));
      }
    };
    void loadAmount();
  }, [address, isMounted, vestedERC20, vestedAdress]);

  const handleReddem = useCallback(async () => {
    if (vestedERC20) {
      const result = await vestedERC20.attach(vestedAdress).redeem(address);
      if (result?.wait) {
        const rc = await result.wait();
        if (rc?.events) {
          const event = rc.events.find((event: ethers.Event) => event.event === 'Redeem');
          if (event?.args) {
            // event Redeem(address indexed holder, address indexed recipient, uint256 redeemedAmount);
            const [_holder, _recipient, redeemedAmount] = event.args;
            console.log('Redeem::redeemedAmount', ethers.utils.formatEther(redeemedAmount));
          }
        } else {
          console.log('No Transfer and Redeem event emitted');
        }
      }
    }
  }, [address, vestedERC20, vestedAdress]);

  return (
    <div>
      <Field label={'Redeemable amount'} required={false}>
        {redeemableAmount}
      </Field>

      <div className="mt-4">
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleReddem}
          className="px-3 py-2 font-semibold text-white bg-black pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-gray-500">
          Claim
        </button>
      </div>
    </div>
  );
};
