import React, { useState } from "react";
import { Main, Button, IconPlus, Modal, Split } from "@1hive/1hive-ui";
import VestedList from "../components/VestedList";
import UserVestingList from "../components/UserVestingList";
import { Add, Wrap, Redeem } from "../components/Modals";
import { Row, SectionTitle, Section } from "./home.styled";

const MODAL_WIDTH = {
  deploy: "500px",
  redeem: "350px",
  wrap: "450px",
};

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ contractLoader, address, chainId, signer, yourLocalBalance, readContracts, writeContracts, tx }) {
  const [opened, setOpened] = useState(false);
  const [modalMode, setModalMode] = useState(null); // deploy, redeem, wrap
  const [wrapContract, setWrapContract] = useState(null);

  const handleShowModal = mode => {
    setOpened(true);
    setModalMode(mode);
  };
  const handleHideModal = () => {
    setOpened(false);
    setModalMode(null);
    setWrapContract(null);
  };
  const handleDeployVestedToken = () => handleShowModal("deploy");
  const handleRedeemVesting = () => handleShowModal("redeem");
  const handleWrapVesting = id => {
    setWrapContract(id);
    handleShowModal("wrap");
  };

  return (
    <Main assetsUrl="/aragon-ui/">
      <Row>
        <SectionTitle>Vestings</SectionTitle>
        <Button onClick={handleDeployVestedToken} label="Add vested token" icon={<IconPlus />} />
      </Row>

      <Split
        primary={
          <Section>
            <SectionTitle small>Vesting tokens</SectionTitle>
            <VestedList handleWrapVesting={handleWrapVesting} />
          </Section>
        }
        secondary={
          <Section>
            <SectionTitle small>My vesting</SectionTitle>
            <UserVestingList address={address} onRedeemVesting={handleRedeemVesting} />
          </Section>
        }
      />

      <Modal visible={opened} closeButton={false} width={MODAL_WIDTH[modalMode]}>
        {modalMode === "deploy" && <Add writeContracts={writeContracts} tx={tx} closeModal={handleHideModal} />}
        {modalMode === "redeem" && (
          <Redeem writeContracts={writeContracts} tx={tx} closeModal={handleHideModal} address={address} />
        )}
        {modalMode === "wrap" && (
          <Wrap
            contractLoader={contractLoader}
            vestedId={wrapContract}
            writeContracts={writeContracts}
            tx={tx}
            closeModal={handleHideModal}
            accountAddress={address}
          />
        )}
      </Modal>
    </Main>
  );
}

export default Home;
