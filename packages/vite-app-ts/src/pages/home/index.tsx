import React, { useState } from 'react';
import { Main, Button, IconPlus, Modal, Split } from '@1hive/1hive-ui';
import VestedList from '../../components/VestedList/index';
import UserVestingList from '../../components/UserVestingList';
import { Add, Wrap, Redeem } from '../../components/Modals';
import { Row, SectionTitle, Section } from './index.styled';
import { useEthersContext } from 'eth-hooks/context';

const MODAL_WIDTH = {
  deploy: '500px',
  redeem: '350px',
  wrap: '450px',
};

export type MODAL_MODES = 'deploy' | 'wrap' | 'redeem' | null;

function Home() {
  const [opened, setOpened] = useState(false);
  const [modalMode, setModalMode] = useState<MODAL_MODES>(null); // deploy, redeem, wrap
  const [vestedAddress, setVestedAddress] = useState<string | null>(null);
  const [underTokenAddress, setUnderTokenAddress] = useState<string | null>(null);

  const ethersContext = useEthersContext();

  const handleShowModal = (mode: MODAL_MODES) => {
    setOpened(true);
    setModalMode(mode);
  };
  const handleHideModal = () => {
    setOpened(false);
    setModalMode(null);
    setVestedAddress(null);
    setUnderTokenAddress(null);
  };
  const handleDeployVestedToken = () => handleShowModal('deploy');
  const handleRedeemVesting = (id: string | null) => {
    setVestedAddress(id);
    handleShowModal('redeem');
  };
  const handleWrapVesting = (vestedAddress: string, underTokenAddress: string) => {
    setVestedAddress(vestedAddress);
    setUnderTokenAddress(underTokenAddress);
    handleShowModal('wrap');
  };

  return (
    <Main assetsUrl="/aragon-ui/">
      <Row>
        <Button mode="strong" onClick={handleDeployVestedToken} label="Add new vesting" icon={<IconPlus />} />
      </Row>

      {ethersContext.account ? (
        <Split
          primary={
            <Section>
              <SectionTitle small>My vestings</SectionTitle>
              <UserVestingList address={ethersContext.account} onRedeemVesting={handleRedeemVesting} />
            </Section>
          }
          secondary={
            <Section>
              <SectionTitle small>Vesting tokens</SectionTitle>
              <VestedList handleWrapVesting={handleWrapVesting} />
            </Section>
          }
        />
      ) : (
        <Section>
          <SectionTitle small>Vesting tokens</SectionTitle>
          <VestedList handleWrapVesting={handleWrapVesting} />
        </Section>
      )}

      <Modal visible={opened} closeButton={false} width={modalMode && MODAL_WIDTH[modalMode]}>
        {modalMode === 'deploy' && <Add closeModal={handleHideModal} />}
        {modalMode === 'redeem' && ethersContext.account && vestedAddress && (
          <Redeem vestedAdress={vestedAddress} closeModal={handleHideModal} address={ethersContext.account} />
        )}
        {modalMode === 'wrap' && vestedAddress && underTokenAddress && (
          <Wrap underlyingTokenAddress={underTokenAddress} vestedAdress={vestedAddress} closeModal={handleHideModal} />
        )}
      </Modal>
    </Main>
  );
}

export default Home;
