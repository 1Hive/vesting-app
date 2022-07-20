import { IEthersContext } from 'eth-hooks/models';
import { BigNumber } from 'ethers';
import { getContractERC20 } from './contract';
import { round } from './math-utils';

export function formatDecimals(value: number, digits: number) {
  try {
    return value.toLocaleString('en-US', {
      style: 'decimal',
      maximumFractionDigits: digits,
    });
  } catch (err: any) {
    if (err.name === 'RangeError') {
      // Fallback to Number.prototype.toString()
      // if the language tag is not supported.
      return value.toString();
    }
    throw err;
  }
}

export function formatTokenAmount(
  amount: BigNumber,
  decimals = 0,
  isIncoming?: boolean,
  displaySign: boolean = false,
  { rounding = 2, commas = true, replaceZeroBy = '0' } = {}
) {
  // const roundedAmount = round(, rounding);
  const roundedAmount = amount.sub(Math.pow(10, decimals)).toNumber();
  const formattedAmount = formatDecimals(roundedAmount, 18);

  if (formattedAmount === '0') {
    return replaceZeroBy;
  }

  return (displaySign ? (isIncoming ? '+' : '-') : '') + (commas ? formattedAmount : formattedAmount.replace(',', ''));
}

export async function getUserBalanceNow(ethersContext: IEthersContext, tokenAddress: string) {
  const connectedAccount = ethersContext.account;

  if (!connectedAccount) {
    return -1;
  }

  const tokenContract = getContractERC20({ ethersContext, contractAddress: tokenAddress });

  const balance = await tokenContract.balanceOf(connectedAccount);
  const tokenDecimals = await tokenContract.decimals();

  return Math.floor(balance.div(Math.pow(10, tokenDecimals)).toNumber());
}
