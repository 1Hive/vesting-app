import React, { useState } from 'react';
import { Wrapper } from './index.styled';
import { useEthersContext } from 'eth-hooks/context';
import MyUserVestings from '~~/components/my-user-streams.tsx';

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
      <div className="flex items-center justify-between text-sm gap-6 space-x-6">
        <h1 className="mb-0 text-3xl tracking-tight">Vesting List</h1>
        <button
          onClick={handleDeployVestedToken}
          className="flex items-center justify-center w-full h-12 px-4 font-semibold text-black bg-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
          Add new vesting
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="p-4">
          <label className="font-bold">Balance</label>
          <div className="mt-4">
            <p className="text-4xl">$25,999</p>
          </div>
        </div>
        <div className="p-4">
          <label className="font-bold">Active vesting</label>
          <div className="mt-4">{ethersContext.account ? <MyUserVestings /> : null}</div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
