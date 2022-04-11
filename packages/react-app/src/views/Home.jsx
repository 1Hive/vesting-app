import React, { useState } from "react";
import { Main, Tag, Button, IconPlus, GU, Modal } from "@1hive/1hive-ui";
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
        <VestedList handleWrapVesting={handleWrapVesting} />

        {address?.toLowerCase() && (
          <UserVestingList address={address?.toLowerCase()} onRedeemVesting={handleRedeemVesting} />
        )}
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
