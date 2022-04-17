import { memo } from "react";
import { Skeleton, Empty } from "antd";
import { Button, TokenBadge } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import { useVestedTokens } from "../../hooks";
import { Wrapper } from "./index.styled";

// import { vestedERC20S as mockData } from "../../mocks/vestedERC20S";
import ListItems from "../List";

const VestedList = ({ handleWrapVesting }) => {
  const { loading, error, data } = useVestedTokens();

  if (loading) return <Skeleton paragraph={{ rows: 2 }} />;
  if (error) return <p>Error</p>;

  // const data = mockData;

  console.log(`data`, data, error);

  return data?.vestedERC20S.length > 0 ? (
    <Wrapper>
      {data.vestedERC20S.map((vestedERC20, index) => {
        const token = vestedERC20.underlying;
        const startDate = dateFormat(vestedERC20.startTimestamp);
        const endDate = dateFormat(vestedERC20.endTimestamp);
        const tokenName = vestedERC20.name;
        return (
          <ListItems
            key={index}
            renderHeader={`Name: ${tokenName}`}
            renderContent={
              <>
                <p>
                  <TokenBadge address={token.id} name={token.name} symbol={token.symbol} />
                </p>
                <div>Start Date: {startDate}</div>
                <div>End Date: {endDate}</div>
              </>
            }
            renderAction={<Button label="Wrap" onClick={handleWrapVesting} />}
          />
        );
      })}
    </Wrapper>
  ) : (
    <Empty />
  );
};

export default memo(VestedList);
