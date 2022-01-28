import React from "react";
import { Button, Box, TokenBadge, useTheme } from "@1hive/1hive-ui";

function VestingInfoBox({ token, startDate, endDate }) {
  return (
    <Box>
      <VestingInfoBoxRow
        primary="Vested Token"
        secondary={<TokenBadge address={token.address} name={token.name} symbol={token.symbol} />}
      />
      <VestingInfoBoxRow primary="Start Date" secondary={startDate} />
      <VestingInfoBoxRow primary="End Date" secondary={endDate} />
      <Button mode="strong" label="Wrap" />
    </Box>
  );
}

function VestingInfoBoxRow({ primary, secondary }) {
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

export default VestingInfoBox;
