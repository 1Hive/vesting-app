import React, { useState } from 'react';
import { Main, Button, IconPlus, Modal, Split } from '@1hive/1hive-ui';
import VestedList from '../../VestedList/index';
import { UserVestingList } from '../../UserVestingList';
import { Add, Wrap, Redeem } from '../../Modals';
import { Row, SectionTitle, Section } from './home.styled';
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
  const [wrapContract, setWrapContract] = useState<string | null>(null);

  const ethersContext = useEthersContext();

  const handleShowModal = (mode: MODAL_MODES) => {
    setOpened(true);
    setModalMode(mode);
  };
  const handleHideModal = () => {
    setOpened(false);
    setModalMode(null);
    setWrapContract(null);
  };
  const handleDeployVestedToken = () => handleShowModal('deploy');
  const handleRedeemVesting = (id: string | null) => {
    setWrapContract(id);
    handleShowModal('redeem');
  };
  const handleWrapVesting = (id: string | null) => {
    setWrapContract(id);
    handleShowModal('wrap');
  };

  return (
    <Main assetsUrl="/aragon-ui/">
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
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
        {modalMode === 'redeem' && ethersContext.account && wrapContract && (
          <Redeem vestedId={wrapContract} closeModal={handleHideModal} address={ethersContext.account} />
        )}
        {modalMode === 'wrap' && wrapContract && <Wrap vestedId={wrapContract} closeModal={handleHideModal} />}
      </Modal>
    </Main>
  );
}

export default Home;
