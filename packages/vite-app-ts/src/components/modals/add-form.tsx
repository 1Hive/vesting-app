/* eslint-disable @typescript-eslint/no-misused-promises */
import { DatePicker, notification, Spin } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumberish, ethers } from 'ethers';
import { Moment } from 'moment';
import React from 'react';
import { useAppContracts } from '~~/config/contract-context';
import { StyledDatePicker } from './index.styled';

const { RangePicker } = DatePicker;

type RangeValue = [Moment | null, Moment | null] | null;

import { LoadingOutlined } from '@ant-design/icons';

const formatStringToBytes32 = (fromString: string) => ethers.utils.formatBytes32String(fromString);

export const Add = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [state, setState] = React.useState({
    tokenAddress: '',
    name: '',
    symbol: '',
  });
  const [dates, setDates] = React.useState<RangeValue>(null);

  const ethersContext = useEthersContext();
  const vestedERC20Factory = useAppContracts('VestedERC20Factory', ethersContext.chainId);

  const deployVestedToken = React.useCallback(async () => {
    const tx = await vestedERC20Factory?.createVestedERC20(
      formatStringToBytes32(state.name),
      formatStringToBytes32(state.symbol),
      18,
      state.tokenAddress,
      dates?.[0]?.unix() as BigNumberish,
      dates?.[1]?.unix() as BigNumberish
    );

    console.log(tx);
    // TODO that is way to wait for transaction success or fail and get the event to see the address.
    const receipt = await tx?.wait();

    const deployedEvent = receipt?.events?.find((ev) => {
      console.log('ev:', ev);
      return ev.event === 'DeployVestedERC20';
    });

    console.log('deployedEvent:', deployedEvent);
    const newVestedERCAddress = deployedEvent?.args?.['vestedERC0'] as string | undefined;
    console.log('newVestedERCAddress:', newVestedERCAddress);

    if (newVestedERCAddress !== undefined) {
      notification.open({
        message: 'Add vesting',
        description: 'Vesting created with success',
      });
    } else {
      notification.open({
        message: 'Add vesting',
        description: 'There was an error while creating stream',
      });
    }
  }, [vestedERC20Factory, state.name, state.symbol, state.tokenAddress, dates]);

  return isLoading ? (
    <div className="flex items-center justify-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  ) : (
    <div>
      <input
        type="text"
        name="token"
        placeholder="Underlying token (0x00...)"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e: any) => setState((prev: any) => ({ ...prev, tokenAddress: e.target.value }))}
      />

      <input
        type="text"
        name="name"
        placeholder="Name Vested Token (StreamingTKN)"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e: any) => setState((prev: any) => ({ ...prev, name: e.target.value }))}
      />

      <input
        type="text"
        name="symbol"
        placeholder="Symbol Vested Token (sTKN)"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e: any) => setState((prev: any) => ({ ...prev, symbol: e.target.value }))}
      />

      <StyledDatePicker className="mt-4">
        <RangePicker onCalendarChange={(val) => setDates(val)} />
      </StyledDatePicker>

      <div className="mt-4">
        <button
          onClick={deployVestedToken}
          className="px-3 py-2 font-semibold text-white bg-black pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-gray-500">
          Create
        </button>
      </div>
    </div>
  );
};
