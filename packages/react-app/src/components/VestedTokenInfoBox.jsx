import React from "react";
import { Button, Box, TokenBadge, useTheme } from "@1hive/1hive-ui";

function VestedTokenInfoBox({ name, token, startDate, endDate, onWrapVesting }) {
  return (
    <Box>
      <VestedTokenInfoBoxRow
        primary={`${name ?? "Vested Token"}`}
        secondary={<TokenBadge address={token.id} name={token.name} symbol={token.symbol} />}
      />
      <VestedTokenInfoBoxRow primary="Start Date" secondary={startDate} />
      <VestedTokenInfoBoxRow primary="End Date" secondary={endDate} />
      <Button label="Wrap" onClick={onWrapVesting} />
    </Box>
  );
}

function VestedTokenInfoBoxRow({ primary, secondary }) {
  const theme = useTheme();
  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={`
          color: ${theme.surfaceContentSecondary};
        `}
      >
        {primary}
      </div>
      <div>{secondary}</div>
    </div>
  );
}

export default VestedTokenInfoBox;
