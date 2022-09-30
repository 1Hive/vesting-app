import { useEffect, useState } from 'react';
import contracts from '~~/generated/hardhat_contracts.json';
import * as hardhatContracts from '~~/generated/contract-types';
import { BaseContract, Signer } from 'ethers';
import { useNetwork, useSigner } from 'wagmi';

const contractFactory = {
  VestedERC20Factory: hardhatContracts.VestedERC20Factory__factory,
  VestedERC20: hardhatContracts.VestedERC20__factory,
  TestERC20: hardhatContracts.TestERC20__factory,
};

type ContractName = keyof typeof contractFactory;

export function useBeeContract<T extends BaseContract | undefined>(contractName: ContractName): T {
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const [contract, setContract] = useState<T>();

  useEffect(() => {
    if (chain) {
      const currentContracts = (contracts as any)[`${chain.id}`][chain.network].contracts;
      const { address } = currentContracts[contractName];

      const factory = contractFactory[contractName];
      const vestedERC20Factory = factory.connect(address, signer as Signer);
      setContract(vestedERC20Factory as unknown as T);
    } else {
      setContract(undefined);
    }
  }, [chain, contractName, signer]);

  return contract as unknown as T;
}
