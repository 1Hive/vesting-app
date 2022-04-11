import { gql, useQuery } from "@apollo/client";
import { Button, DataView, IdentityBadge } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import { formatUnits } from "ethers/lib/utils";
import { Wrapper } from "./index.styled";

const USER_VESTINGS_QUERY = gql`
  query UserVestings($recipient: Bytes!) {
    vestings(where: { recipient: $recipient }) {
      id
      token {
        id
        name
        symbol
        decimals
        underlying {
          id
          name
          symbol
          decimals
        }
        startTimestamp
        endTimestamp
      }
      createdAt
      recipient
      underlyingAmount
      claimedUnderlyingAmount
      wrappedTokenAmount
    }
  }
`;

const UserVestingList = ({ account, onRedeemVesting }) => {
  const { loading, data, error } = useQuery(USER_VESTINGS_QUERY, {
    pollInterval: 2500,
    variables: { recipient: account },
  });

  console.log(`Data`, data);

  if (loading) return <div>Loading...</div>;
  //if (error) return <div>Error</div>;

  return (
    <Wrapper>
      <h1>UserVestingList</h1>

      {data?.vestings.length > 0 ? (
        <DataView
          display="list"
          fields={["Token Vested", "Start Date", "End Date", "Claimed", ""]}
          entries={data?.vestings}
          renderEntry={({ token, claimedUnderlyingAmount }) => {
            return [
              <IdentityBadge entity={token.symbol} />,
              dateFormat(token.startTimestamp),
              dateFormat(token.endTimestamp),
              formatUnits(claimedUnderlyingAmount),
              <Button label="Redeem" onClick={onRedeemVesting} />,
            ];
          }}
        />
      ) : (
        <p>No vestings available</p>
      )}
    </Wrapper>
  );
};

export default UserVestingList;
