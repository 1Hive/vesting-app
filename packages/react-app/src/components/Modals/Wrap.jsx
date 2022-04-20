import { Button, IconCross } from "@1hive/1hive-ui";
import { BigNumber } from "ethers";
import { useCallback, useState } from "react";
import { FieldElement } from "./Add";
import { ModalHeader, Row } from "./index.styled";
import { useContractLoader } from "eth-hooks";
import { toDecimals } from "helpers/math-utils";

const Wrap = ({ contractLoader, accountAddress, vestedId, writeContracts, tx, closeModal }) => {
  // console.log(`writeContracts`, writeContracts);
  const [state, setState] = useState({
    underlyingAmount: "",
    address: "",
  });

  const contract = useContractLoader(
    contractLoader.userSigner,
    { ...contractLoader.contractConfig, customAddresses: { VestedERC20: vestedId } },
    contractLoader.localChainId,
  );

  const handleWrap = useCallback(async () => {
    const amount = BigNumber.from(toDecimals(state.underlyingAmount, 18));
    // allow
    const result = await tx(contract.TestERC20.approve(vestedId, amount));
    console.log("resultApprove", result);
    await tx(contract.VestedERC20.wrap(amount, state.address));
  }, [tx, contract.TestERC20, contract.VestedERC20, vestedId, state.underlyingAmount, state.address]);

  return (
    <div>
      <ModalHeader>
        <h1>Wrap vesting tokens</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      {/*Add fields*/}

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

export default Wrap;
