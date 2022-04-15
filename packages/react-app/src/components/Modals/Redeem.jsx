import { useCallback } from "react";
import { IconCross, Button } from "@1hive/1hive-ui";
import { ModalHeader } from "./index.styled";

const Reddem = ({ writeContracts, tx, closeModal }) => {
  console.log(`writeContracts`, writeContracts);

  // Needs to be tested
  const handleReddem = useCallback(
    async onComplete => {
      tx(writeContracts.VestedERC20.getRedeemableAmount());
      onComplete();
    },
    [tx, writeContracts.VestedERC20],
  );

  return (
    <div>
      <ModalHeader>
        <h1>Reddem vested Token</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <Button onClick={handleReddem}>Claim</Button>
    </div>
  );
};

export default Reddem;
