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
        console.log("Redeem::value", value);
      }
    };
    void loadAmount();
  }, [address, contract.VestedERC20, isMounted, tx]);

  const handleReddem = useCallback(async () => {
    // const value = await tx(contract.VestedERC20.getRedeemableAmount(address));
    // console.log("Redeem::value", value);
  }, []);

  return (
    <div>
      <ModalHeader>
        <h1>Reddem vested Token</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <Field label={"Redeemable Amount"} required={false}>
        {redeemableAmount}
      </Field>

      <Row>
        <Button onClick={handleReddem}>Claim</Button>
      </Row>
    </div>
  );
};

export default Redeem;
