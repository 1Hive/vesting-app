import React, { useState } from "react";
import { Main, Tag, Button, IconPlus, GU, Modal, textStyle, EmptyStateCard, Split } from "@1hive/1hive-ui";
import styled from "styled-components";
import VestedList from "../components/VestedList";
import UserVestingList from "../components/UserVestingList";
import { Add, Wrap, Redeem } from "../components/Modals";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export const SectionTitle = styled.div`
  ${textStyle("title1")};
  margin-bottom: ${2 * GU}px;
  ${props => props.small && `font-size: 26px;`};
`;

const modalWidth = {
  deploy: "500px",
  redeem: "350px",
  wrap: "350px",
};

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ address, chainId, signer, yourLocalBalance, readContracts, writeContracts, tx }) {
  const [opened, setOpened] = useState(false);
  const [modalMode, setModalMode] = useState(null); // deploy, redeem, wrap

  const handleShowModal = mode => {
    setOpened(true);
    setModalMode(mode);
  };
  const handleHideModal = () => {
    setOpened(false);
    setModalMode(null);
  };
  const handleDeployVestedToken = () => handleShowModal("deploy");
  const handleRedeemVesting = () => handleShowModal("redeem");
  const handleWrapVesting = () => handleShowModal("wrap");

  return (
    <Main assetsUrl="/aragon-ui/">
      <Row>
        <SectionTitle>
          Vestings <Tag mode="identifier">🦺</Tag>
        </SectionTitle>
        <Button onClick={handleDeployVestedToken} label="Add vested token" icon={<IconPlus />} />
      </Row>

      <Split
        primary={<VestedList handleWrapVesting={handleWrapVesting} />}
        secondary={<UserVestingList address={address} onRedeemVesting={handleRedeemVesting} />}
      />

      <Modal visible={opened} closeButton={false} width={modalWidth[modalMode]}>
        {modalMode === "deploy" && <Add writeContracts={writeContracts} tx={tx} closeModal={handleHideModal} />}
        {modalMode === "redeem" && <Redeem writeContracts={writeContracts} tx={tx} closeModal={handleHideModal} />}
        {modalMode === "wrap" && <Wrap writeContracts={writeContracts} tx={tx} closeModal={handleHideModal} />}
      </Modal>
    </Main>
  );
}

export default Home;
