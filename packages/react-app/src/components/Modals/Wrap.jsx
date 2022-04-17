import { Button, IconCross } from "@1hive/1hive-ui";
import { useCallback, useState } from "react";
import { ModalHeader } from "./index.styled";

const Wrap = ({ writeContracts, tx, closeModal }) => {
  console.log(`writeContracts`, writeContracts);
  const [underlyingAmount, setUnderlyingAmount] = useState(10);
  const [recipientAddress, setRecipientAddress] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  // Needs to be tested
  const handleWrap = useCallback(async () => {
    tx(writeContracts.VestedERC20.wrap(underlyingAmount, recipientAddress)); // need to check what the real method is
  }, [tx, writeContracts.VestedERC20, underlyingAmount, recipientAddress]);

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
