import React, { useCallback, useState } from "react";
import { Main, Header, Modal, Tag, Button, IconPlus, textStyle, Split, EmptyStateCard, GU } from "@1hive/1hive-ui";
import UserVestings from "../components/UserVestings";
import VestedTokenInfoBox from "../components/VestedTokenInfoBox";

import { dateFormat } from "../helpers/date-utils";
import { useUserVestings, useVestedTokens } from "../hooks";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ address, yourLocalBalance, readContracts }) {
  // Modal
  const [opened, setOpened] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const { loading: loadingVestedTokens, data: vestedTokenData } = useVestedTokens();

  const { loading: loadingUserVestings, data: userVestingsData } = useUserVestings(address?.toLowerCase());

  const handleShowModal = useCallback(mode => {
    setOpened(true);
    setModalMode(mode);
  }, []);

  const handleHideModal = useCallback(() => {
    setOpened(false);
  }, []);

  const handleDeployVestedToken = useCallback(() => {
    handleShowModal("deploy");
  }, [handleShowModal]);

  const handleRedeemVesting = useCallback(() => {
    handleShowModal("redeem");
  }, [handleShowModal]);

  const handleWrapVesting = useCallback(() => {
    handleShowModal("wrap");
  }, [handleShowModal]);

  return (
    <Main assetsUrl="/aragon-ui/">
      <Header
        primary={
          <div
            css={`
              ${textStyle("title1")};
            `}
          >
            Vestings <Tag mode="identifier">🦺</Tag>
          </div>
        }
        secondary={
          <Button onClick={handleDeployVestedToken} mode="strong" label="Add vested token" icon={<IconPlus />} />
        }
      />
      <Split
        primary={
          !loadingUserVestings && (
            <UserVestings vestings={userVestingsData?.vestings ?? []} onRedeemVesting={handleRedeemVesting} />
          )
        }
        secondary={
          <>
            {!loadingVestedTokens && vestedTokenData.vestedERC20S.length > 0 ? (
              <div>
                <div
                  css={`
                    display: grid;
                    grid-gap: ${2 * GU}px;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    margin-bottom: ${2 * GU}px;
                  `}
                >
                  {vestedTokenData.vestedERC20S.map(vestedERC20 => (
                    <VestedTokenInfoBox
                      token={vestedERC20.underlying}
                      startDate={dateFormat(vestedERC20.startTimestamp)}
                      endDate={dateFormat(vestedERC20.endTimestamp)}
                      onWrapVesting={handleWrapVesting}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyStateCard text="No vested token created" />
            )}
          </>
        }
      />
      <Modal visible={opened} onClose={handleHideModal} onClosed={() => setModalMode(null)}>
        {modalMode === "deploy" && <div />}
        {modalMode === "redeem" && <div />}
        {modalMode === "wrap" && <div />}
      </Modal>
    </Main>
  );
}

export default Home;
