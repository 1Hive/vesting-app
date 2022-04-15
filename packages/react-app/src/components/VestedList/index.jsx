import { memo } from "react";
import { GU } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import useVestedTokens from "../../hooks/useVestedTokens";
import VestedTokenInfoBox from "../VestedTokenInfoBox";
import { Wrapper } from "./index.styled";

const VestedList = ({ handleWrapVesting }) => {
  const { loading, error, data } = useVestedTokens();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(`VestedList`, data);

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
