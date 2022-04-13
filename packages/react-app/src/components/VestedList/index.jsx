import { GU } from "@1hive/1hive-ui";
import { gql, useQuery } from "@apollo/client";
import { memo } from "react";
import { dateFormat } from "../../helpers/date-utils";
import VestedTokenInfoBox from "../VestedTokenInfoBox";
import { Wrapper } from "./index.styled";

const VESTED_TOKENS_GRAPHQL = `
  {
     vestedERC20S{
      id
      name
      symbol
      decimals
      startTimestamp
      endTimestamp
      underlying{
        id
        name
        symbol
        decimals
      }
    }
  }
`;

const VESTED_TOKENS_GQL = gql(VESTED_TOKENS_GRAPHQL);

const VestedList = ({ handleWrapVesting }) => {
  const { loading, error, data } = useQuery(VESTED_TOKENS_GQL, { pollInterval: 2500 });

  console.log(`VestedList`, data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Wrapper>
      {data?.vestedERC20S.length > 0 ? (
        <div
          css={`
            display: grid;
            grid-gap: ${2 * GU}px;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            margin-bottom: ${2 * GU}px;
          `}
        >
          {data.vestedERC20S.map(vestedERC20 => (
            <VestedTokenInfoBox
              token={vestedERC20.underlying}
              startDate={dateFormat(vestedERC20.startTimestamp)}
              endDate={dateFormat(vestedERC20.endTimestamp)}
              onWrapVesting={handleWrapVesting}
            />
          ))}
        </div>
      ) : (
        <p>No vested token created</p>
      )}
    </Wrapper>
  );
};

export default memo(VestedList);
