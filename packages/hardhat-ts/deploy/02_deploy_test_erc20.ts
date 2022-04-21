import { BigNumber } from 'ethers';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy('TestERC20', {
    from: deployer,
    args: ['Token', 'TKN', BigNumber.from('100000000000000000000')],
    log: true,
  });
};

export default func;

func.tags = ['token'];
