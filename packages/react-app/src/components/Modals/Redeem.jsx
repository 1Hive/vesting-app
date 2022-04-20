import { useCallback, useEffect, useState } from "react";
import { IconCross, Button, Field } from "@1hive/1hive-ui";
import { ModalHeader, Row } from "./index.styled";
import { useContractLoader } from "eth-hooks";
import React from "react";
import { ethers } from "ethers";
import useIsMounted from "../../hooks/useIsMounted";

const Redeem = ({ contractLoader, vestedId, tx, closeModal, address }) => {
  // Needs to be tested
  const isMounted = useIsMounted();
  const [redeemableAmount, setRedeemableAmount] = useState();

  console.log("vestedId", vestedId);
  const contract = useContractLoader(
    contractLoader.userSigner,
    { ...contractLoader.contractConfig, customAddresses: { VestedERC20: vestedId } },
    contractLoader.localChainId,
  );

  console.log("contract", contract);
  useEffect(() => {
    const loadAmount = async () => {
      if (contract.VestedERC20) {
        const value = await tx(contract.VestedERC20.getRedeemableAmount(address));
        if (isMounted()) setRedeemableAmount(ethers.utils.formatEther(value));
      }
    };
    void loadAmount();
  }, [address, contract.VestedERC20, isMounted, tx]);

  const handleReddem = useCallback(async () => {
    const result = await tx(contract.VestedERC20.redeem(address));
    if (result && "wait" in result && result.wait) {
      const rc = await result.wait();

      if (rc && "events" in rc && rc.events) {
        const event = rc.events.find(event => event.event === "Redeem");
        // event Redeem(address indexed holder, address indexed recipient, uint256 redeemedAmount);
        const [_holder, _recipient, redeemedAmount] = event.args;
        console.log("Redeem::redeemedAmount", ethers.utils.formatEther(redeemedAmount));
      } else {
        console.log("No Transfer and Redeem event emitted");
      }
    }
  }, [address, contract.VestedERC20, tx]);

  return (
    <div>
      <ModalHeader>
        <h1>Reddem vested tokens</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <Field label={"Redeemable amount"} required={false}>
        {redeemableAmount}
      </Field>

      <Row>
        <Button onClick={handleReddem}>Claim</Button>
      </Row>
    </div>
  );
};

export default Redeem;
