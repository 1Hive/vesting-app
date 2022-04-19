import { useCallback } from "react";
import { IconCross, Button } from "@1hive/1hive-ui";
import { ModalHeader, Row } from "./index.styled";
import { useContractLoader } from "eth-hooks";

const Redeem = ({ contractLoader, vestedId, tx, closeModal, address }) => {
  // Needs to be tested
  
  const contract = useContractLoader(
    contractLoader.userSigner,
    { ...contractLoader.contractConfig, customAddresses: { VestedERC20: vestedId } },
    contractLoader.localChainId,
  );

  const handleReddem = useCallback(async () => {
    const value = await tx(contract.VestedERC20.getRedeemableAmount(address));
    console.log("Redeem::value", value);
  }, [address, contract.VestedERC20, tx]);

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

export default Redeem;
