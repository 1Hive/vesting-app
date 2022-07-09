import { Empty, Skeleton } from 'antd';
import { useMemo } from 'react';
import { useVestedTokens } from '~~/hooks';
import useResponsive from '~~/hooks/use-responsive';
import StreamListDesktop from './desktop-list';
import StreamListMobile from './mobile-list';

const Streams = () => {
  const { loading, error, data } = useVestedTokens();
  const { isMobile } = useResponsive();
  const List = isMobile ? StreamListMobile : StreamListDesktop;

  const isEmpty = useMemo(() => {
    return data?.vestedERC20S === undefined || data?.vestedERC20S?.length === 0;
  }, [data?.vestedERC20S]);

  if (loading)
    return (
      <div className="mt-4">
        <Skeleton />
      </div>
    );

  if (error)
    return (
      <div className="mt-4">
        <p>Error...</p>
      </div>
    );

  return (
    <div className="mt-4">
      {isEmpty ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <List list={data?.vestedERC20S} />}
    </div>
  );
};

export default Streams;
