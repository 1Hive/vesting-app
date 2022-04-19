import { useCallback } from "react";
import { IconCross, Button } from "@1hive/1hive-ui";
import { ModalHeader, Row } from "./index.styled";

const Reddem = ({ writeContracts, tx, closeModal, address }) => {
  // Needs to be tested
  const handleReddem = useCallback(async () => {
    tx(writeContracts.VestedERC20.getRedeemableAmount(address));
  }, [address, tx, writeContracts.VestedERC20]);

  return (
    <div>
      <ModalHeader>
        <h1>Reddem vested Token</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <Row>
        <Button onClick={handleReddem}>Claim</Button>
      </Row>
    </div>
  );
};

export default Reddem;
