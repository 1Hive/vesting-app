import { Button, IconCross } from "@1hive/1hive-ui";
import { BigNumber } from "ethers";
import { useCallback, useState } from "react";
import { FieldElement } from "./Add";
import { ModalHeader, Row } from "./index.styled";
import { useBalance, useContractLoader, useGasPrice, useUserProviderAndSigner } from "eth-hooks";

const Wrap = ({contractLoader, accountAddress, vestedId, writeContracts, tx, closeModal }) => {
  console.log(`writeContracts`, writeContracts);
  const [state, setState] = useState({
    underlyingAmount: 10,
    address: accountAddress,
  });

  const contract = useContractLoader(
    contractLoader.userSigner,
    { ...contractLoader.contractConfig, customAddresses: { VestedERC20: vestedId } },
    contractLoader.localChainId,
  );

  const handleWrap = useCallback(async () => {
    // allow
    await tx(writeContracts.TestERC20.approve(vestedId, BigNumber.from(state.underlyingAmount).pow(18)));

    await tx(contract.VestedERC20.wrap(BigNumber.from(state.underlyingAmount).pow(18), state.address));
  }, [tx, writeContracts.TestERC20, vestedId, state.underlyingAmount, state.address, contract.VestedERC20]);

  return (
    <div>
      <ModalHeader>
        <h1>Wrap Token</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      {/*Add fields*/}

      <FieldElement name="Amount" element="underlyingAmount" state={state} setState={setState} />
      <FieldElement name="Address" element="address" state={state} setState={setState} />

      <Row>
        <Button onClick={handleWrap}>Wrap</Button>
      </Row>
    </div>
  );
};

export default Wrap;
