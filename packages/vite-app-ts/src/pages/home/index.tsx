import React, { useState } from 'react';
import { Wrapper } from './index.styled';
import { useEthersContext } from 'eth-hooks/context';
import VestingList from './vesting-list';

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
    <Wrapper>
      <div className="flex items-center text-sm gap-6 space-x-6">
        <h1 className="mb-0 text-4xl font-extrabold tracking-tight text-center text-slate-500 sm:text-5xl lg:text-6xl dark:text-white">
          Vesting List
        </h1>
        <button
          onClick={handleDeployVestedToken}
          className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
          Add new vesting
        </button>
      </div>

      {ethersContext.account ? <VestingList handleWrapVesting={handleWrapVesting} /> : null}
    </Wrapper>
  );
}

export default Home;
