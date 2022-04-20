import { Button, DateRangePicker, Field, Help, IconCross, TextInput } from "@1hive/1hive-ui";
import React, { useCallback, useState } from "react";
import { ModalHeader, Row } from "./index.styled";
import { ethers } from "ethers";
import dayjs from "dayjs";

export const FieldElement = ({ name, element, hint, state, setState, ...rest }) => {
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
          placeholder={element === "address" ? "0x00..." : ""}
          {...rest}
        />
      )}
    </Field>
  );
};

const formatStringToBytes32 = fromString => ethers.utils.hexlify(ethers.utils.toUtf8Bytes(fromString));
const formatStringDateToUnixstamp = fromStringDate => dayjs(fromStringDate).unix();

function Add({ writeContracts, tx, closeModal }) {
  const [state, setState] = useState({
    tokenAddress: "",
    name: "",
    symbol: "",
  });
  const [range, setRange] = useState({
    start: null,
    end: null,
  });

  const deployVestedToken = useCallback(async () => {
    tx(
      writeContracts.VestedERC20Factory.createVestedERC20(
        formatStringToBytes32(state.name),
        formatStringToBytes32(state.symbol),
        18,
        state.tokenAddress,
        formatStringDateToUnixstamp(range.start),
        formatStringDateToUnixstamp(range.end),
      ),
    );
  }, [state, range, tx, writeContracts.VestedERC20Factory]);

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
}

export default Add;
