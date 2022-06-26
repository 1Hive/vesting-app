import { IEthersContext } from 'eth-hooks/models';
import { ContractFactory } from 'ethers';
import { ERC20__factory } from '~~/generated/contract-types';
import { ERC20 } from '~~/generated/contract-types/ERC20';

export type ERC20Params = {
  ethersContext: IEthersContext;
  contractAddress: string;
};

export function getContractERC20({ ethersContext, contractAddress }: ERC20Params): ERC20 {
  const contractTokenERC20 = ContractFactory.getContract(
    contractAddress,
    ERC20__factory.createInterface(),
    ethersContext.signer
  ); // TODO if not found?
  return contractTokenERC20 as ERC20;
}

export const getBlockTimestamp = async (ethersContext: IEthersContext) => {
  const blockNumber = ethersContext.provider?.blockNumber;
  if (!blockNumber) {
    return undefined;
  }
  const block = await ethersContext.provider?.getBlock(blockNumber);
  return block?.timestamp;
};
