import { memo } from "react";
import { Button, IdentityBadge } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import { Wrapper, Empty } from "./index.styled";
import { useUserVestings } from "../../hooks";

import { vestings as mockData } from "../../mocks/vestings";
import ListItems from "../List";

const UserVestingList = ({ address, onRedeemVesting }) => {
  const { loading, error, data } = useUserVestings(address);

  if (!address) {
    return <p>No address provided</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  //const data = mockData;
  console.log(`data`, data, error);

  return data?.vestings.length > 0 ? (
    <Wrapper>
      {data?.vestings.map((vest, index) => {
        const token = vest.token;
        const createdAt = dateFormat(vest.createdAt);

        return (
          <ListItems
            key={index}
            renderHeader={<IdentityBadge entity={token.id} />}
            renderContent={<>Created At: {createdAt}</>}
            renderAction={<Button label="Redeem" onClick={onRedeemVesting} />}
          />
        );
      })}
    </Wrapper>
  ) : (
    <Empty text="No vestings available" />
  );
};

export default memo(UserVestingList);
