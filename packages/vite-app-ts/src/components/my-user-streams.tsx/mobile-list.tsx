import { dateFormat } from '~~/helpers/date-utils';
import { UserStreamListDesktopProps } from './desktop-list';

const UserStreamListMobile = ({ list }: UserStreamListDesktopProps) => {
  return (
    <>
      {list?.map((vest, index: number) => {
        const vestToken = vest.token;
        const wrappedToken = vest.token.underlying;
        const startDate = dateFormat(vestToken.startTimestamp);
        const endDate = dateFormat(vestToken.endTimestamp);

        return (
          <div className="p-2 mb-2 border" key={index}>
            <p className="text-lg font-semibold">{vestToken.name}</p>
            <p className="text-base">{wrappedToken.symbol}</p>
            <p className="text-base">{wrappedToken.symbol}</p>
            <p className="text-base">
              {startDate} - {endDate}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default UserStreamListMobile;
