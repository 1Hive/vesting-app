import { Button, DateRangePicker, Field, Help, IconCross, TextInput } from "@1hive/1hive-ui";
import React, { useCallback, useState } from "react";
import { RangeElement, ModalHeader } from "./index.styled";
import { ethers } from "ethers";
import dayjs from "dayjs";

const FieldElement = ({ name, element, hint, state, setState, ...rest }) => {
  return (
    <Field
      label={
        <React.Fragment>
          {name}
          {hint}
        </React.Fragment>
      }
    >
      {({ id }) => (
        <TextInput
          id={id}
          onChange={e => setState(prev => ({ ...prev, [element]: e.target.value }))}
          value={state[element]}
          wide
          {...rest}
        />
      )}
    </Field>
  );
};

const formatStringToBytes32 = fromString => ethers.utils.formatBytes32String(fromString);
const formatStringDateToUnixstamp = fromStringDate => dayjs(fromStringDate).unix();

function Add({ writeContracts, tx, closeModal }) {
  const [state, setState] = useState({
    tokenAddress: "",
    name: "",
    symbol: "",
    decimals: "",
  });
  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  console.log(`writeContracts`, writeContracts);

  // Needs to be tested
  const deployVestedToken = useCallback(async () => {
    tx(
      writeContracts.VestedERC20Factory.createVestedERC20(
        formatStringToBytes32(state.name),
        formatStringToBytes32(state.symbol),
        state.decimals,
        state.tokenAddress,
        formatStringDateToUnixstamp(range.start),
        formatStringDateToUnixstamp(range.end),
      ),
    );
  }, [state, range, tx, writeContracts.VestedERC20Factory]);

  return (
    <div>
      <ModalHeader>
        <h1>Add vested Token</h1>
        <IconCross onClick={closeModal} />
      </ModalHeader>

      <FieldElement
        name="Vested token"
        hint={
          <Help hint="What is Token Address?">
            <strong>Token Address</strong> is the address of an existent ERC-20 token to use within your garden.
          </Help>
        }
        element="tokenAddress"
        state={state}
        setState={setState}
        placeholder="0x00..."
      />

      <FieldElement name="Name" element="name" state={state} setState={setState} />
      <FieldElement name="Symbol" element="symbol" state={state} setState={setState} />
      <FieldElement name="Decimals" element="decimals" state={state} setState={setState} />

      <Field label="Vesting duration">
        <RangeElement>
          <DateRangePicker startDate={range.start} endDate={range.end} onChange={setRange} />
        </RangeElement>
      </Field>
      <Button onClick={deployVestedToken}>Create</Button>
    </div>
  );
}

export default Add;
