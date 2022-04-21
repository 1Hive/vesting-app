import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const VestedERC20 = await deployments.get('VestedERC20');

  const VestedERC20Factory = await deploy('VestedERC20Factory', {
    from: deployer,
    args: [VestedERC20.address],
    log: true,
  });

  if (hre.network.live) {
    await hre.tenderly.persistArtifacts({
      name: 'VestedERC20Factory',
      address: VestedERC20Factory.address,
    });

    await hre.tenderly.verify({
      name: 'VestedERC20Factory',
      address: VestedERC20Factory.address,
    });
  }
};
export default func;
func.dependencies = ['VestedERC20'];
func.tags = ['VestedERC20Factory'];
