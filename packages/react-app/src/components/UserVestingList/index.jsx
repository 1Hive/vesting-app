import { memo } from "react";
import { Skeleton, Empty } from "antd";
import { Button, IdentityBadge } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import { Wrapper } from "./index.styled";
import { useUserVestings } from "../../hooks";

// import { vestings as mockData } from "../../mocks/vestings";
import ListItems from "../List";

const UserVestingList = ({ address, onRedeemVesting }) => {
  const { loading, error, data } = useUserVestings(address);

  if (!address) {
    return <p>No address provided</p>;
  }
  console.log(`dataUserVestingList`, data, error);

  if (loading) return <Skeleton paragraph={{ rows: 2 }} />;
  if (error) return <p>Error...</p>;

  //const data = mockData;

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
    <Empty />
  );
};

export default memo(UserVestingList);
