import { Button, IconCross } from '@1hive/1hive-ui';
// import { BigNumber } from 'ethers';
import { useCallback, useState } from 'react';
import { FieldElement } from './Add';
import { ModalHeader, Row } from './index.styled';
import { useEthersContext } from 'eth-hooks/context';
import { useAppContracts } from '~~/config/contractContext';
import { BigNumber } from 'ethers';
import { toDecimals } from '~~/helpers/math-utils';
// import { toDecimals } from '../../helpers/math-utils';

export const Wrap = ({ vestedId, closeModal }: { vestedId: string; closeModal: any }) => {
  const [state, setState] = useState({
    underlyingAmount: '',
    address: '',
  });

  const ethersContext = useEthersContext();
  const vestedERC20 = useAppContracts('VestedERC20', ethersContext.chainId);
  const testERC20 = useAppContracts('TestERC20', ethersContext.chainId);

  const handleWrap = useCallback(async () => {
    const amount = BigNumber.from(toDecimals(state.underlyingAmount, 18));
    const r = await testERC20?.approve(vestedId, amount); // TODO use .attach too to point the other differtent underlying token than default one
    await r?.wait();
    await vestedERC20?.attach(vestedId).wrap(amount, state.address);
  }, [state.address, state.underlyingAmount, testERC20, vestedERC20, vestedId]);

  return (
    <div>
      <ModalHeader>
        <h1>Wrap vesting tokens</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      {/* Add fields*/}

      <FieldElement name="Amount" element="underlyingAmount" state={state} setState={setState} />
      <FieldElement name="Recipient" element="address" state={state} setState={setState} />

      <Row>
        <Button mode="strong" onClick={handleWrap}>
          Wrap
        </Button>
      </Row>
    </div>
  );
};
