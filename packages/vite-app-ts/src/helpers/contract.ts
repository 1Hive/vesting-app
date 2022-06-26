import { IEthersContext } from 'eth-hooks/models';
import { ContractFactory } from 'ethers';
import { ERC20__factory } from '~~/generated/contract-types';
import { ERC20, ERC20Interface } from '~~/generated/contract-types/ERC20';

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
