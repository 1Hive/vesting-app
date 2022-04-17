import { Button, IconCross } from "@1hive/1hive-ui";
import { useCallback, useState } from "react";
import { ModalHeader, Row } from "./index.styled";

const Wrap = ({ address, writeContracts, tx, closeModal }) => {
  console.log(`writeContracts`, writeContracts);
  const [underlyingAmount, setUnderlyingAmount] = useState(10); // this need to be a field

  // Needs to be tested
  const handleWrap = useCallback(async () => {
    tx(writeContracts.VestedERC20.wrap(underlyingAmount, address));
  }, [tx, writeContracts.VestedERC20, underlyingAmount, address]);

  return (
    <div>
      <ModalHeader>
        <h1>Wrap Token</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <Row>
        <Button onClick={handleWrap}>Wrap</Button>
      </Row>
    </div>
  );
};

export default Wrap;
