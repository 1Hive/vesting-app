import { DateRangePicker, Field, TextInput } from "@1hive/1hive-ui";
import React, { useCallback, useState } from "react";

function AddVestedToken({ writeContracts, tx }) {
  const [tokenAddress, setTokenAddress] = useState();
  const [range, setRange] = useState({
    start: null,
    end: null,
  });
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [decimals, setDecimals] = useState();

  const deployVestedToken = useCallback(
    async onComplete => {
      tx(
        writeContracts.VestedERC20Factory.createVestedERC20(
          name,
          symbol,
          decimals,
          tokenAddress,
          range.start,
          range.end,
        ),
      );
      onComplete();
    },
    [range.end, range.start, tokenAddress, tx, writeContracts.VestedERC20Factory],
  );

  return (
    <>
      <Field
        label={
          <React.Fragment>
            Vested token
            {/* <Help hint="What is Token Address?">
              <strong>Token Address</strong> is the address of an existent ERC-20 token to use within your garden.
            </Help> */}
          </React.Fragment>
        }
      >
        {({ id }) => <TextInput id={id} onChange={setTokenAddress} placeholder="0x00..." value={tokenAddress} wide />}
      </Field>
      {
        // TODO: fetch vested token name, symbol and decimals and diplay a standar name.
        // That can be updated. Like we do on Gardens BYOT
      }
      <Field
        label={
          <React.Fragment>
            Vesting duration
            {/* <Help hint="What is Token Address?">
              <strong>Token Address</strong> is the address of an existent ERC-20 token to use within your garden.
            </Help> */}
          </React.Fragment>
        }
      >
        <DateRangePicker startDate={range.start} endDate={range.end} onChange={setRange} />
      </Field>
    </>
  );
}

export default AddVestedToken;
