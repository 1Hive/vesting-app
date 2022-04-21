import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const VestedERC20 = await deploy('VestedERC20', {
    from: deployer,
    log: true,
  });

  if (hre.network.live) {
    await hre.tenderly.persistArtifacts({
      name: 'VestedERC20',
      address: VestedERC20.address,
    });

    await hre.tenderly.verify({
      name: 'VestedERC20',
      address: VestedERC20.address,
    });
  }
};
export default func;
func.tags = ['VestedERC20'];
