import { Button, IconCross } from "@1hive/1hive-ui";
import { useCallback } from "react";
import { ModalHeader } from "./index.styled";

const Wrap = ({ writeContracts, tx, closeModal }) => {
  console.log(writeContracts);

  const handleWrap = useCallback(
    async onComplete => {
      tx(writeContracts.VestedERC20Factory.createVestedERC20());
      onComplete();
    },
    [tx, writeContracts.VestedERC20Factory],
  );

  return (
    <div>
      <ModalHeader>
        <h1>Wrap Token</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <Button onClick={handleWrap}>Wrap</Button>
    </div>
  );
};

export default Wrap;
