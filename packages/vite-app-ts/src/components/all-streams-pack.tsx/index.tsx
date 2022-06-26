import { RollbackOutlined } from '@ant-design/icons';
import { Empty, Modal, Skeleton } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { useEffect, useMemo, useState } from 'react';
import { getBlockTimestamp } from '~~/helpers/contract';
import { dateFormat } from '~~/helpers/date-utils';
import { useVestedTokens } from '~~/hooks';
import { VestedErc20 } from '~~/types-and-hooks';
import { Wrap } from '../modals';

enum StreamPackStatus {
  NOT_INITIALIAZED,
  OPEN,
  CLOSED,
  UNKNOWN,
}

function getStatusStreamPack(vest: VestedErc20, blockTimestamp: number | undefined) {
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
}

const AllStreamsPack = ({ isComplete }: { isComplete?: boolean }) => {
  const { loading, error, data } = useVestedTokens();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeElement, setActiveElement] = useState<{
    underlyingTokenAddress: string;
    vestedAdress: string;
  }>({
    underlyingTokenAddress: '',
    vestedAdress: '',
  });

  const ethersContext = useEthersContext();

  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>();

  useEffect(() => {
    const getBlock = async () => {
      const blockTimestamp = await getBlockTimestamp(ethersContext);
      setBlockTimestamp(blockTimestamp);
    };

    void getBlock();
  }, []);

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
          {isComplete ? (
            <div className="mb-4 grid grid-cols-5">
              <p className="uppercase">Vesting Token</p>
              <p className="uppercase">Start/End</p>
              <p className="uppercase">Status</p>
              <p className="uppercase">Wrap Token</p>
              <p className="uppercase"></p>
            </div>
          ) : null}

          <div className="mt-4 grid gap-2">
            {streams?.map((vestedERC20, index: number) => {
              const token = vestedERC20.underlying;
              const startDate = dateFormat(vestedERC20.startTimestamp);
              const endDate = dateFormat(vestedERC20.endTimestamp);

              return isComplete ? (
                <div className="grid grid-cols-5" key={index}>
                  <p className="mb-0 text-base">{vestedERC20.name}</p>
                  <p className="mb-0 text-base">
                    {startDate} - {endDate}
                  </p>
                  <p className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vestedERC20, blockTimestamp)]}</p>
                  <p className="mb-0 text-base">{vestedERC20.symbol}</p>
                  <div className="flex justify-center">
                    <button
                      className="flex items-center px-3 py-2 font-semibold text-white bg-blue-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-blue-500 gap-2"
                      onClick={() => handleWrap(vestedERC20.id, token.id)}>
                      <RollbackOutlined />
                      Wrapp
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4" key={index}>
                  <p className="mb-0 text-base">{vestedERC20.name}</p>
                  <p className="mb-0 text-base">
                    {token.name} - {token.symbol}
                  </p>
                  <p className="mb-0 text-base">{StreamPackStatus[getStatusStreamPack(vestedERC20, blockTimestamp)]}</p>
                  <div className="flex justify-center">
                    <button
                      className="flex items-center px-3 py-2 font-semibold text-white bg-blue-600 pointer-events-auto rounded-md text-[0.8125rem] leading-5 hover:bg-blue-500 gap-2"
                      onClick={() => handleWrap(vestedERC20.id, token.id)}>
                      <RollbackOutlined />
                      Wrapp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {!isComplete ? (
            <div className="mt-4">
              <a
                href="/transactions"
                className="flex-none px-2 font-medium bg-white pointer-events-auto rounded-md py-[0.3125rem] text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
                View all packs
              </a>
            </div>
          ) : null}

          <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
            <p className="mb-4 text-base font-bold">Creating new Vesting</p>
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
