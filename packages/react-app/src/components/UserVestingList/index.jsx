import { memo } from "react";
import { Button, IdentityBadge } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import { Wrapper, Section, Empty } from "./index.styled";
import { useUserVestings } from "../../hooks";

import { vestings as mockData } from "../../mocks/vestings";
import ListItems from "../List";
import { SectionTitle } from "../../views/home.styled";

const UserVestingList = ({ address, onRedeemVesting }) => {
  const { loading, error } = useUserVestings(address);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const data = mockData;

  return (
    <Section>
      <SectionTitle small>My vesting</SectionTitle>

      <Wrapper>
        {address === undefined ? (
          <p>No address provided</p>
        ) : (
          <>
            {address !== undefined && data?.vestings.length > 0 ? (
              data?.vestings.map((vest, index) => {
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
              })
            ) : (
              <Empty text="No vestings available" />
            )}
          </>
        )}
      </Wrapper>
    </Section>
  );
};

export default memo(UserVestingList);
