import { useNetwork } from 'wagmi';

export const useCurrentChainId = () => {
  const { chain } = useNetwork();
  return { chainId: chain?.id };
};
