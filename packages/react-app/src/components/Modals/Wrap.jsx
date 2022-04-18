import { Button, IconCross } from "@1hive/1hive-ui";
import { BigNumber } from "ethers";
import { useCallback, useState } from "react";
import { FieldElement } from "./Add";
import { ModalHeader, Row } from "./index.styled";

const Wrap = ({ vestedId, writeContracts, tx, closeModal }) => {
  console.log(`writeContracts`, writeContracts);
  const [state, setState] = useState({
    underlyingAmount: 10,
    address: "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
  });

  const handleWrap = useCallback(async () => {
    // allow
    await tx(writeContracts.TestERC20.approve(vestedId, BigNumber.from(state.underlyingAmount).pow(18)));

    await tx(writeContracts.VestedERC20.wrap(BigNumber.from(state.underlyingAmount).pow(18), state.address));
  }, [tx, writeContracts.TestERC20, writeContracts.VestedERC20, vestedId, state.underlyingAmount, state.address]);

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
