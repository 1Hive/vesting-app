import React, { useState } from "react";
import {
  Main,
  Header,
  Modal,
  Tag,
  Button,
  IconPlus,
  textStyle,
  Split,
  DataView,
  Box,
  EmptyStateCard,
  GU,
} from "@1hive/1hive-ui";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import UserVestings from "../components/UserVestings";
import VestingInfoBox from "../components/VestingInfoBox";

import { dateFormat } from "../helpers/date-utils";

// Some demo data
const token = {
  name: "Honey",
  symbol: "HNY",
  address: "0x…",
};

const vestings = [
  { token: token.address, startDate: "1643336653", endDate: "1643336653" },
  { token: token.address, startDate: "1643336653", endDate: "1643336653" },
  { token: token.address, startDate: "1643336653", endDate: "1643336653" },
].map(vesting => {
  return {
    ...vesting,
    startDate: dateFormat(vesting.startDate, "onlyDate"),
    endDate: dateFormat(vesting.endDate, "onlyDate"),
  };
});

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ yourLocalBalance, readContracts }) {
  // Modal
  const [opened, setOpened] = useState(false);
  const open = () => setOpened(true);
  const close = () => setOpened(false);

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
        secondary={<Button onClick={open} mode="strong" label="Add vesting" icon={<IconPlus />} />}
      />
      <Split
        invert="horizontal"
        primary={<UserVestings vestings={vestings} />}
        secondary={
          <>
            {vestings.length ? (
              <div>
                <div
                  css={`
                    display: grid;
                    grid-gap: ${2 * GU}px;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    margin-bottom: ${2 * GU}px;
                  `}
                >
                  {vestings.map(vesting => (
                    <VestingInfoBox token={token} startDate={vesting.startDate} endDate={vesting.endDate} />
                    // <GardenCard key={garden.id} garden={garden} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyStateCard text="No vesting found" />
            )}
          </>
        }
      />
      <Modal visible={opened} onClose={close}>
        {/* modal content */}
      </Modal>
    </Main>
  );
}

export default Home;
