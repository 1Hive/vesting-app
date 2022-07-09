import { truncateAddress } from '~~/helpers';
import { dateFormat } from '~~/helpers/date-utils';
import { StreamListDesktopProps } from './desktop-list';

const StreamListMobile = ({ list }: StreamListDesktopProps) => {
  return (
    <>
      {list?.map((vest, index: number) => {
        const startDate = dateFormat(vest.startTimestamp);
        const endDate = dateFormat(vest.endTimestamp);

        return (
          <div className="p-2 mb-2 border" key={index}>
            <p className="text-lg font-semibold">{truncateAddress(vest.id)}</p>
            <p className="text-base">
              {startDate} - {endDate}
            </p>
            <p className="text-base">Incoming</p>
            <p className="text-base">{vest.underlying.symbol}</p>
            <p className="text-base">$12.20</p>
          </div>
        );
      })}
    </>
  );
};

export default StreamListMobile;
