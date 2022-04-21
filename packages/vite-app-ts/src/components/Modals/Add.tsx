import { Button, DateRangePicker, Field, Help, IconCross, TextInput } from '@1hive/1hive-ui';
import dayjs from 'dayjs';
import { useEthersContext } from 'eth-hooks/context';
import { ethers } from 'ethers';
import React, { useCallback, useState } from 'react';
import { useAppContracts } from '~~/config/contractContext';

import { ModalHeader, Row } from './index.styled';

export const FieldElement = ({ name, element, hint, state, setState, ...rest }: any) => {
  return (
    <Field
      label={
        <React.Fragment>
          {name}
          {hint}
        </React.Fragment>
      }>
      {({ id }: any) => (
        <TextInput
          id={id}
          onChange={(e: any) => setState((prev: any) => ({ ...prev, [element]: e.target.value }))}
          value={state[element]}
          wide
          placeholder={element === 'address' ? '0x00...' : ''}
          {...rest}
        />
      )}
    </Field>
  );
};

const formatStringToBytes32 = (fromString: string) => ethers.utils.formatBytes32String(fromString);
const formatStringDateToUnixstamp = (fromStringDate: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(fromStringDate).unix();

export const Add = ({ closeModal }: { closeModal: any }) => {
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

  const deployVestedToken = useCallback(() => {
    // await tx(
    void vestedERC20Factory?.createVestedERC20(
      formatStringToBytes32(state.name),
      formatStringToBytes32(state.symbol),
      18,
      state.tokenAddress,
      formatStringDateToUnixstamp(range.start),
      formatStringDateToUnixstamp(range.end)
    );
    // );
  }, [vestedERC20Factory, state.name, state.symbol, state.tokenAddress, range.start, range.end]);

  return (
    <div>
      <ModalHeader>
        <h1>Add new vesting</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <FieldElement
        name="Vested token"
        hint={<Help hint="What is Vested Token?">Address of underlying token that will be vested.</Help>}
        element="tokenAddress"
        state={state}
        setState={setState}
        placeholder="0x00..."
      />

      <FieldElement name="Name" element="name" state={state} setState={setState} />
      <FieldElement name="Symbol" element="symbol" state={state} setState={setState} />

      <Field label="Vesting duration">
        <Row>
          <DateRangePicker startDate={range.start} endDate={range.end} onChange={setRange} />
        </Row>
      </Field>

      <Row>
        <Button mode="strong" onClick={deployVestedToken}>
          Create
        </Button>
      </Row>
    </div>
  );
};
