// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import { VestedERC20Factory } from "../VestedERC20Factory.sol";
import { VestedERC20 } from "../VestedERC20.sol";

contract VestedTestERC20Test is Test {
  function setUp() public {
    address impl = new VestedERC20("Token1", "T1");
    VestedERC20Factory factory = new VestedERC20Factory(impl);
    name = "VestedToken1";
    factory.createVestedERC20(name, symbol, decimals, underlying, startTimestamp, endTimestamp);
  }

  function testExample() public {
    assertTrue(true);
  }
}
