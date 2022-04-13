import { Button, DateRangePicker, Field, GU, Help, IconCross, TextInput, textStyle } from "@1hive/1hive-ui";
import React, { useCallback, useState } from "react";
import { RangeElement, ModalHeader } from "./index.styled";

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

function AddVestedToken({ writeContracts, tx, closeModal }) {
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

  const deployVestedToken = useCallback(
    async onComplete => {
      tx(
        writeContracts.VestedERC20Factory.createVestedERC20(
          state.name,
          state.symbol,
          state.decimals,
          state.tokenAddress,
          range.start,
          range.end,
        ),
      );
      onComplete();
    },
    [state, range, tx, writeContracts.VestedERC20Factory],
  );

  console.log(`state`, state);
  console.log(`range`, range);

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

export default AddVestedToken;
