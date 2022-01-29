import React from "react";
import { Button, DataView, IdentityBadge, ContextMenu, ContextMenuItem } from "@1hive/1hive-ui";

function UserVestings({ vestings }) {
  return (
    <DataView
      display="list"
      fields={["Token Vested", "Start Date", "End Date", ""]}
      entries={vestings}
      renderEntry={({ token, startDate, endDate }) => {
        return [<IdentityBadge entity={token} />, startDate, endDate, <Button label="Redeem" />];
      }}
    />
  );
}

// Return the contextual menu for an entry (no interaction behavior defined).
function entryActions([token, startDate, endDate]) {
  return (
    <ContextMenu>
      <ContextMenuItem>Wrap</ContextMenuItem>
      <ContextMenuItem>Redeem</ContextMenuItem>
    </ContextMenu>
  );
}

export default UserVestings;
