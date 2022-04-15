import { memo } from "react";
import { Button, EmptyStateCard, IdentityBadge, useTheme } from "@1hive/1hive-ui";
import { dateFormat } from "../../helpers/date-utils";
import { Wrapper, Item, Section, SectionTitle } from "./index.styled";
import useUserVestings from "../../hooks/useUserVestings";

import { vestings as mockData } from "../../mocks/vestings";
import { useThemeSwitcher } from "react-css-theme-switcher";

const UserVestingList = ({ address, onRedeemVesting }) => {
  const { loading, error } = useUserVestings(address);
  const theme = useTheme();
  const { currentTheme } = useThemeSwitcher();

  if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error...</p>;

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
                  <Item isDarkMode={currentTheme === "dark"} key={index}>
                    <div>
                      <div
                        css={`
                          color: ${theme.surfaceContentSecondary};
                        `}
                      >
                        <strong>Vested Token</strong>
                      </div>
                      <div>
                        <IdentityBadge entity={token.id} />
                      </div>
                    </div>

                    <div>Created At: {createdAt}</div>

                    <Button label="Redeem" onClick={onRedeemVesting} />
                  </Item>
                );
              })
            ) : (
              <EmptyStateCard text="No vestings available" />
            )}
          </>
        )}
      </Wrapper>
    </Section>
  );
};

export default memo(UserVestingList);
