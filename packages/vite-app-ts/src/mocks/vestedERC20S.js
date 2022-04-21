export const vestedERC20S = {
  vestedERC20S: [
    {
      id: '0x9f1ac54bef0dd2f6f3462ea0fa94fc62300d3a8e',
      name: 'vTKNVesting',
      symbol: 'v2TKN',
      decimals: 18,
      startTimestamp: '1649298617',
      endTimestamp: '1649312845',
      underlying: {
        id: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
        name: 'Token',
        symbol: 'TKN',
        decimals: 18,
      },
      vestings: [
        {
          id: '0x9f1ac54bef0dd2f6f3462ea0fa94fc62300d3a8e-0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
          createdAt: 1649299781,
          token: {
            id: '0x9f1ac54bef0dd2f6f3462ea0fa94fc62300d3a8e',
          },
          recipient: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
          underlyingAmount: '20106781996325780772',
          claimedUnderlyingAmount: '7120713410900183710',
          wrappedTokenAmount: '27227495407225964482',
          __typename: 'Vesting',
        },
      ],
    },
    {
      id: '0xcafac3dd18ac6c6e92c921884f9e4176737c052c',
      name: 'VestedTKN',
      symbol: 'vTKN',
      decimals: 18,
      startTimestamp: '1649298331',
      endTimestamp: '1649300431',
      underlying: {
        id: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
        name: 'Token',
        symbol: 'TKN',
        decimals: 18,
      },
      vestings: [],
    },
  ],
};
