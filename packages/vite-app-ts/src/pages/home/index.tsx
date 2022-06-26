import React, { useState } from 'react';
import { Wrapper } from './index.styled';
import { useEthersContext } from 'eth-hooks/context';
import MyUserVestings from '~~/components/my-user-streams.tsx';
import { PageTitle } from '~~/components/page-title';
import AllStreamsPack from '~~/components/all-streams-pack.tsx';

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
      <PageTitle title="Dashboard" />

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <label className="text-base font-bold text-black">Balance</label>
          <div className="mt-4">
            <p className="text-4xl">$25,999</p>
          </div>
          <div className="mt-4">Show all balances</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <label className="text-base font-bold text-black">My Active Streams</label>
          <div className="mt-4">
            {ethersContext.account ? <MyUserVestings account={ethersContext.account} /> : 'Connect you wallet'}
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <label className="text-base font-bold text-black">Stream Pack</label>
          <div className="mt-4">{ethersContext.account ? <AllStreamsPack /> : 'Connect you wallet'}</div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
