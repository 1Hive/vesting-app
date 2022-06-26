import { DateRangePicker } from '@1hive/1hive-ui';
import dayjs from 'dayjs';
import { useEthersContext } from 'eth-hooks/context';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { useAppContracts } from '~~/config/contractContext';
import { StyledDatePicker } from './index.styled';

const formatStringToBytes32 = (fromString: string) => ethers.utils.formatBytes32String(fromString);
const formatStringDateToUnixstamp = (fromStringDate: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(fromStringDate).unix();

export const Add = () => {
  const [error, setError] = useState('aa');
  const [success, setSuccess] = useState(null);
  const [state, setState] = useState({
    tokenAddress: '',
    name: '',
    symbol: '',
  });
  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  const ethersContext = useEthersContext();
  const vestedERC20Factory = useAppContracts('VestedERC20Factory', ethersContext.chainId);
  console.log('ethersContext.chainId', ethersContext.chainId);

  const deployVestedToken = useCallback(async () => {
    // console.log(`deployVestedToken`, range, state);

    const tx = await vestedERC20Factory?.createVestedERC20(
      formatStringToBytes32(state.name),
      formatStringToBytes32(state.symbol),
      18,
      state.tokenAddress,
      formatStringDateToUnixstamp(range.start),
      formatStringDateToUnixstamp(range.end)
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
  }, [vestedERC20Factory, state.name, state.symbol, state.tokenAddress, range.start, range.end]);

  return (
    <div style={{ minWidth: '376px' }}>
      <input
        type="text"
        name="token"
        placeholder="Underlying token (0x00...)"
        className="block w-full px-2 py-2 mt-4 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e: any) => setState((prev: any) => ({ ...prev, tokenAddress: e.target.value }))}
      />
      {/* <fieldset>
        <legend>Vested Info:</legend> */}
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
      {/* </fieldset> */}

      <StyledDatePicker className="mt-4">
        <DateRangePicker startDate={range.start} endDate={range.end} onChange={setRange} />
      </StyledDatePicker>

      <div className="mt-4">
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={deployVestedToken}
          className="px-3 py-2 font-semibold text-white bg-black pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-gray-500">
          Create
        </button>
      </div>

      {error !== null ? (
        <div className="mt-2">
          <p className="text-sm font-bold text-red-600">There was an error while making the transaction</p>
        </div>
      ) : null}
    </div>
  );
};
