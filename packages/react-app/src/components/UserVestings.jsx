import React from "react";
import { formatUnits } from "ethers/lib/utils";
import { Button, DataView, IdentityBadge, ContextMenu, ContextMenuItem } from "@1hive/1hive-ui";

import { dateFormat } from "../helpers/date-utils";

function UserVestings({ vestings, onRedeemVesting }) {
  return (
    <DataView
      display="list"
      fields={["Token Vested", "Start Date", "End Date", "Claimed", ""]}
      entries={vestings}
      renderEntry={({ token, claimedUnderlyingAmount }) => {
        return [
          <IdentityBadge entity={token.symbol} />,
          dateFormat(token.startTimestamp),
          dateFormat(token.endTimestamp),
          formatUnits(claimedUnderlyingAmount),
          <Button label="Redeem" onClick={onRedeemVesting} />,
        ];
      }}
      emptyState={{
        default: {
          title: "No vestings available",
        },
      }}
    />
  );
}

// Return the contextual menu for an entry (no interaction behavior defined).
// function entryActions([token, startDate, endDate]) {
//   return (
//     <ContextMenu>
//       <ContextMenuItem>Wrap</ContextMenuItem>
//       <ContextMenuItem>Redeem</ContextMenuItem>
//     </ContextMenu>
//   );
// }

export default UserVestings;
