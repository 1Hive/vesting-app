import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const useCurrentChainId = () => {
  const { connector } = useAccount();
  const [chainId, setChainId] = useState<number | undefined>();

  useEffect(() => {
    void (async () => {
      const chain = await connector?.getChainId();
      setChainId(chain);
    })();
  }, [connector]);

  return { chainId };
};
