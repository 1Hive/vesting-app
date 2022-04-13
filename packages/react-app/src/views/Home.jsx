import React, { useState } from "react";
import { Main, Tag, Button, IconPlus, GU, Modal, textStyle } from "@1hive/1hive-ui";
import styled from "styled-components";
import AddVestedToken from "../components/AddVestedToken";
import VestedList from "../components/VestedList";
import UserVestingList from "../components/UserVestingList";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${2 * GU}px;
  transition: all 0.2s ease-in-out;
`;

export const Section = styled.div`
  padding: ${2 * GU}px;
  border: 1px solid #f0f0f0;
  border-radius: ${GU}px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  ${textStyle("title1")};
`;

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ address, chainId, signer, yourLocalBalance, readContracts, writeContracts, tx }) {
  const [opened, setOpened] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const handleShowModal = mode => {
    setOpened(true);
    setModalMode(mode);
  };

  const handleHideModal = () => setOpened(false);
  const handleDeployVestedToken = () => handleShowModal("deploy");
  const handleRedeemVesting = () => handleShowModal("redeem");
  const handleWrapVesting = () => handleShowModal("wrap");

  return (
    <Main assetsUrl="/aragon-ui/">
      <Row>
        <h1>
          Vestings <Tag mode="identifier">🦺</Tag>
        </h1>
        <Button onClick={handleDeployVestedToken} mode="strong" label="Add vested token" icon={<IconPlus />} />
      </Row>

      <LayoutWrapper>
        <Section>
          <SectionTitle>Vested list</SectionTitle>
          <VestedList handleWrapVesting={handleWrapVesting} />
        </Section>
        <Section>
          <SectionTitle>User vesting list</SectionTitle>
          <UserVestingList address={address} onRedeemVesting={handleRedeemVesting} />
        </Section>
      </LayoutWrapper>

      <Modal visible={opened} onClose={handleHideModal} onClosed={() => setModalMode(null)}>
        {modalMode === "deploy" && <AddVestedToken writeContracts={writeContracts} tx={tx} />}
        {modalMode === "redeem" && <div />}
        {modalMode === "wrap" && <div />}
      </Modal>
    </Main>
  );
}

export default Home;
