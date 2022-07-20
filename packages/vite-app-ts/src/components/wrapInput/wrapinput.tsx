import { Field, GU, TextInput, ButtonBase, theme, textStyle } from '@1hive/1hive-ui';
import { BigNumber, ethers } from 'ethers';
import { useState, useCallback } from 'react';
import { toDecimals } from '~~/helpers/math-utils';
import { formatTokenAmount } from '~~/helpers/token-utils';

type WrapInputParams = {
  accountBalance: BigNumber;
  token: { name: string; symbol: string; decimals: number };
};
export const WrapInput = ({ accountBalance, token }: WrapInputParams) => {
  const [amount, setAmount] = useState({
    value: '0',
    valueBN: BigNumber.from('0'),
  });

  const handleEditMode = useCallback(() => {
    setAmount((amount) => {
      const newValue = amount.valueBN.gte(0) ? ethers.utils.formatEther(amount.valueBN) : '';
      return {
        ...amount,
        value: newValue,
      };
    });
  }, []);

  // Amount change handler
  const handleAmountChange = useCallback(
    (event) => {
      const newAmount = event.target.value.replace(/,/g, '.').replace(/-/g, '');

      const newAmountBN = BigNumber.from(isNaN(event.target.value) ? -1 : toDecimals(newAmount, token.decimals));

      setAmount({
        value: newAmount,
        valueBN: newAmountBN,
      });
    },
    [token]
  );

  const handleMaxSelected = useCallback(() => {
    setAmount({
      valueBN: accountBalance,
      value: formatTokenAmount(accountBalance.toNumber(), token.decimals, false, false, {
        commas: false,
        rounding: token.decimals,
      }),
    });
  }, [accountBalance, token.decimals]);

  return (
    <>
      <Field
        label="amount"
        css={`
          margin-top: ${2 * GU}px;
        `}>
        <TextInput
          value={amount.value}
          onChange={handleAmountChange}
          onFocus={handleEditMode}
          onBlur={handleEditMode}
          wide
          adornment={
            <ButtonBase
              css={`
                margin-right: ${1 * GU}px;
                /* color: ${theme.accent}; */
              `}
              onClick={handleMaxSelected}>
              MAX
            </ButtonBase>
          }
          adornmentPosition="end"
        />
        <span
          css={`
            ${textStyle('body3')};
            /* color: ${theme.contentSecondary}; */
          `}>
          {'Your account balance has '}
          <span
            css={`
              font-weight: 600;
            `}>
            {ethers.utils.formatEther(accountBalance)} {token.symbol}
          </span>
        </span>
      </Field>
    </>
  );
};
