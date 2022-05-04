import { Address, BigInt } from "@graphprotocol/graph-ts";
import { DeployVestedERC20 } from "../generated/VestedERC20Factory/VestedERC20Factory";
import { ERC20 as ERC20Contract } from "../generated/VestedERC20Factory/ERC20";
import {
  VestedERC20Factory,
  VestedERC20,
  ERC20,
  Vesting,
} from "../generated/schema";
import { VestedERC20 as VestedERC20Template } from "../generated/templates";
import {
  Transfer,
  Wrap,
  Redeem,
  VestedERC20 as VestedERC20Contract,
} from "../generated/templates/VestedERC20/VestedERC20";

export function handleDeployVestedERC20(event: DeployVestedERC20): void {
  const factory = loadOrCreateFactory(event.address);

  const newVestedERC20Address = event.params.vestedERC0;

  const vestedERC20Contract = VestedERC20Contract.bind(newVestedERC20Address);

  const vestedERC20 = new VestedERC20(newVestedERC20Address.toHex());
  vestedERC20.name = vestedERC20Contract.name();
  vestedERC20.symbol = vestedERC20Contract.symbol();
  vestedERC20.decimals = vestedERC20Contract.decimals();
  vestedERC20.underlying = loadOrCreateERC20(
    vestedERC20Contract.underlying()
  ).id;
  vestedERC20.startTimestamp = vestedERC20Contract.startTimestamp();
  vestedERC20.endTimestamp = vestedERC20Contract.endTimestamp();

  let currentVestedERC20 = factory.vestedERC20;
  currentVestedERC20.push(vestedERC20.id);
  factory.vestedERC20 = currentVestedERC20;

  factory.count += 1;

  factory.save();
  vestedERC20.save();

  VestedERC20Template.create(newVestedERC20Address);
}

export function handleWrap(event: Wrap): void {
  const vestedERC20Contract = VestedERC20Contract.bind(event.address);
  const vesting = loadOrCreateVesting(
    event.address.toHex(),
    event.params.recipient,
    event.block.timestamp
  );
  vesting.underlyingAmount = event.params.underlyingAmount;
  vesting.claimedUnderlyingAmount = vestedERC20Contract.claimedUnderlyingAmount(
    event.params.recipient
  );
  vesting.wrappedTokenAmount = event.params.wrappedAmount;

  vesting.save();
}

export function handleRedeem(event: Redeem): void {
  const vestedERC20Contract = VestedERC20Contract.bind(event.address);
  const vesting = loadOrCreateVesting(
    event.address.toHex(),
    event.params.holder,
    event.block.timestamp
  );
  vesting.underlyingAmount = vesting.underlyingAmount.minus(
    event.params.redeemedAmount
  );
  vesting.claimedUnderlyingAmount = vestedERC20Contract.claimedUnderlyingAmount(
    event.params.holder
  );

  vesting.save();
}

export function handleTransfer(event: Transfer): void {
  // skip _mint and _burn transfers
  if (
    event.params.from.equals(Address.zero()) ||
    event.params.to.equals(Address.zero())
  ) {
    return;
  }

  const vestedERC20Contract = VestedERC20Contract.bind(event.address);
  const vestingFrom = loadOrCreateVesting(
    event.address.toHex(),
    event.params.from,
    event.block.timestamp
  );
  // TODO: calculate underlyingAmount
  // vestingFrom.underlyingAmount = vestingFrom.underlyingAmount.minus(
  //   vestingFrom.claimedUnderlyingAmount.minus(
  //     vestedERC20Contract.claimedUnderlyingAmount(event.params.from)
  //   )
  // );
  vestingFrom.claimedUnderlyingAmount =
    vestedERC20Contract.claimedUnderlyingAmount(event.params.from);
  vestingFrom.wrappedTokenAmount = vestingFrom.wrappedTokenAmount.minus(
    event.params.amount
  );

  vestingFrom.save();

  const vestingTo = loadOrCreateVesting(
    event.address.toHex(),
    event.params.to,
    event.block.timestamp
  );
  vestingTo.underlyingAmount = vestingTo.claimedUnderlyingAmount =
    vestedERC20Contract.claimedUnderlyingAmount(event.params.to);
  vestingTo.wrappedTokenAmount = vestingTo.wrappedTokenAmount.plus(
    event.params.amount
  );

  vestingTo.save();
}

export function joinID(pieces: Array<string>): string {
  return pieces.join("-");
}

function loadOrCreateFactory(address: Address): VestedERC20Factory {
  let factory = VestedERC20Factory.load(address.toHex());
  // if no factory yet, set up empty
  if (factory == null) {
    factory = new VestedERC20Factory(address.toHex());
    factory.count = 0;

    factory.save();
  }
  return factory as VestedERC20Factory;
}

function loadOrCreateVesting(
  tokenID: string,
  recipient: Address,
  timestamp: BigInt
): Vesting {
  const id = joinID([tokenID, recipient.toHex()]);
  let vesting = Vesting.load(id);
  if (vesting === null) {
    vesting = new Vesting(id);
    vesting.token = tokenID;
    vesting.recipient = recipient;
    vesting.createdAt = timestamp.toI32();
    vesting.wrappedTokenAmount = BigInt.fromI32(0);
    vesting.claimedUnderlyingAmount = BigInt.fromI32(0);

    vesting.save();
  }
  return vesting as Vesting;
}

function loadOrCreateERC20(address: Address): ERC20 {
  let token = ERC20.load(address.toHex());
  if (token == null) {
    const tokenContract = ERC20Contract.bind(address);

    token = new ERC20(address.toHex());
    token.symbol = tokenContract.symbol();
    token.name = tokenContract.name();
    token.decimals = tokenContract.decimals();

    token.save();
  }

  return token as ERC20;
}
