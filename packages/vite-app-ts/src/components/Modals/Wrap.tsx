import { Button, IconCross } from '@1hive/1hive-ui';
// import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { FieldElement } from './Add';
import { ModalHeader, Row } from './index.styled';
import { useEthersContext } from 'eth-hooks/context';
import { useAppContracts } from '~~/config/contractContext';
import { BigNumber, ContractFactory } from 'ethers';
import { toDecimals } from '~~/helpers/math-utils';
import { WrapType } from '.';
import { useContractExistsAtAddress } from 'eth-hooks';
import { ERC20__factory } from '~~/generated/contract-types';

export const Wrap = ({ vestedAdress, closeModal, underlyingTokenAddress }: WrapType) => {
  const [state, setState] = useState({
    underlyingAmount: '',
    address: '',
  });

  const ethersContext = useEthersContext();
  const vestedERC20 = useAppContracts('VestedERC20', ethersContext.chainId);
  const underlyingTokenERC20 = ContractFactory.getContract(
    underlyingTokenAddress,
    ERC20__factory.createInterface(),
    ethersContext.signer
  );

  const [isErcExist, _update, queryStatus] = useContractExistsAtAddress(underlyingTokenERC20);

  useEffect(() => {
    console.log('isErcExist', isErcExist);
    console.log('queryStatus', queryStatus);
  }, [isErcExist, queryStatus]);

  const handleWrap = useCallback(async () => {
    if (isErcExist && queryStatus === 'success') {
      const amount = BigNumber.from(toDecimals(state.underlyingAmount, 18));
      const r = await underlyingTokenERC20.approve(vestedAdress, amount);
      await r?.wait();
      await vestedERC20?.attach(vestedAdress).wrap(amount, state.address);
    } else {
      console.log('Do something if it not exist, or not found if without internet'); // TODO: Replace for propper Logger.
    }
  }, [isErcExist, queryStatus, state.address, state.underlyingAmount, underlyingTokenERC20, vestedERC20, vestedAdress]);

  return (
    <div>
      <ModalHeader>
        <h1>Wrap vesting tokens</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

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
