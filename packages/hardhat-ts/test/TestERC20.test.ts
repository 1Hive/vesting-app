// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
// import chai from 'chai';
// import { solidity } from 'ethereum-waffle';

// const { expect } = chai;
// chai.use(solidity);

// import { BigNumber } from 'ethers';
// import { ethers, waffle } from 'hardhat';
// const { deployContract } = waffle;

// import TestERC20Artifact from '../artifacts/contracts/test/TestERC20.sol/TestERC20.json';

// import type { TestERC20 } from '../typechain-types';

// xdescribe('Token contract', function () {
//   let testToken: TestERC20;
//   let deployer: SignerWithAddress;

//   beforeEach(async () => {
//     const signers = await ethers.getSigners();
//     deployer = signers[0];

//     testToken = (await deployContract(deployer, TestERC20Artifact, ['Token', 'TKN', BigNumber.from('100000000000000000000')])) as TestERC20;
//   });

//   it('should assign 100000000000000000000 of tokens to the owner', async function () {
//     const initialCount = await testToken.balanceOf(await deployer.getAddress());
//     expect(initialCount).to.eq(BigNumber.from('100000000000000000000'));
//   });
// });

// // eslint-disable-next-line mocha/no-exports
// export {}; // https://web.archive.org/web/20180609155906/http://fullstack-developer.academy/cannot-redeclare-block-scoped-variable-name/
