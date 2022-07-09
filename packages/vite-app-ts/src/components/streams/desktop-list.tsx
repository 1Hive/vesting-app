import { truncateAddress } from '~~/helpers';
import { dateFormat } from '~~/helpers/date-utils';
import { VestedErc20 } from '~~/types-and-hooks';

type StreamListDesktopProps = {
  list: Array<VestedErc20> | undefined;
};

const StreamListDesktop = ({ list }: StreamListDesktopProps) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-5">
        <p className="uppercase">Address</p>
        <p className="uppercase">Start/End</p>
        <p className="uppercase">Streaming</p>
        <p className="uppercase">Token</p>
        <p className="uppercase">$</p>
      </div>
      <div className="mb-4">
        {list?.map((vest, index: number) => {
          const startDate = dateFormat(vest.startTimestamp);
          const endDate = dateFormat(vest.endTimestamp);

          return (
            <div className="mb-4 grid grid-cols-5" key={index}>
              <p className="mb-0 text-base">{truncateAddress(vest.id)}</p>
              <p className="mb-0 text-base">
                {startDate} - {endDate}
              </p>
              <p className="mb-0 text-base">Incoming</p>
              <p className="mb-0 text-base">{vest.underlying.symbol}</p>
              <p className="mb-0 text-base">$12.20</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StreamListDesktop;
