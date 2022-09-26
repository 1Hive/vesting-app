import { Provider } from '@ethersproject/abstract-provider';
import { ContractFactory } from 'ethers';
import { ERC20__factory } from '~~/generated/contract-types';
import { ERC20 } from '~~/generated/contract-types/ERC20';

export type ERC20Params = {
  signer: any;
  contractAddress: string;
};

export function getContractERC20({ signer, contractAddress }: ERC20Params): ERC20 {
  const contractTokenERC20 = ContractFactory.getContract(contractAddress, ERC20__factory.createInterface(), signer); // TODO if not found?
  return contractTokenERC20 as ERC20;
}

export const getBlockTimestamp = async (provider: Provider) => {
  const blockNumber = await provider?.getBlockNumber();
  if (!blockNumber) {
    return undefined;
  }
  const block = await provider?.getBlock(blockNumber);
  return block?.timestamp;
};
