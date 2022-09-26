import { RollbackOutlined } from '@ant-design/icons';
import { Empty, Modal, Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';
import { getBlockTimestamp } from '~~/helpers/contract';
import { useVestedTokens } from '~~/hooks';
import useResponsive from '~~/hooks/use-responsive';
import { getNetworkNameByChainID } from '~~/models/constants/networks';
import { VestedErc20 } from '~~/types-and-hooks';
import { Wrap } from '../modals';
import StreamPackListDesktop from './desktop-list';
import StreamPackListMobile from './mobile-list';

export enum StreamPackStatus {
  NOT_INITIALIAZED,
  OPEN,
  CLOSED,
  UNKNOWN,
}

export const getStatusStreamPack = (vest: VestedErc20, blockTimestamp: number | undefined) => {
  if (!blockTimestamp) {
    return StreamPackStatus.UNKNOWN;
  }
  if (blockTimestamp < vest.startTimestamp) {
    return StreamPackStatus.NOT_INITIALIAZED;
  } else if (blockTimestamp > vest.endTimestamp) {
    return StreamPackStatus.CLOSED;
  } else {
    return StreamPackStatus.OPEN;
  }
};

export const WrapButton = (handleWrap: () => void) => {
  return (
    <div className="flex justify-center">
      <button
        className="flex items-center px-3 py-2 font-semibold text-white bg-blue-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-blue-500 gap-2"
        onClick={handleWrap}>
        <RollbackOutlined />
        Wrap
      </button>
    </div>
  );
};

type AllStreamPackProps = {
  isComplete?: boolean;
  chainId: number;
};

const AllStreamsPack = ({ isComplete, chainId }: AllStreamPackProps) => {
  // const ethersContext = useEthersContext();
  const provider = useProvider();
  const { loading, error, data } = useVestedTokens(getNetworkNameByChainID(chainId));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<{
    underlyingTokenAddress: string;
    vestedAdress: string;
  }>({
    underlyingTokenAddress: '',
    vestedAdress: '',
  });
  const { isMobile } = useResponsive();

  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>();

  useEffect(() => {
    const getBlock = async () => {
      const blockTimestamp = await getBlockTimestamp(provider);
      setBlockTimestamp(blockTimestamp);
    };

    void getBlock();
  }, [provider]);

  const isEmpty = useMemo(() => {
    return data?.vestedERC20S === undefined || data?.vestedERC20S?.length === 0;
  }, [data?.vestedERC20S]);

  const streams = useMemo(() => {
    return isComplete ? data?.vestedERC20S : data?.vestedERC20S.slice(0, 5);
  }, [data?.vestedERC20S, isComplete]);

  const handleWrap = (underlyingTokenAddress: string, vestedAdress: string) => {
    setActiveElement({ underlyingTokenAddress, vestedAdress });
    setIsModalVisible(true);
  };

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
      {isEmpty ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          {isMobile ? (
            <StreamPackListMobile list={streams} handleWrap={handleWrap} blockTimestamp={blockTimestamp} />
          ) : (
            <StreamPackListDesktop
              isComplete={isComplete}
              list={streams}
              handleWrap={handleWrap}
              blockTimestamp={blockTimestamp}
            />
          )}

          <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
            <p className="mb-4 text-base font-bold">Wrapping Token</p>
            <Wrap
              underlyingTokenAddress={activeElement.underlyingTokenAddress}
              vestedAdress={activeElement.vestedAdress}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default AllStreamsPack;
