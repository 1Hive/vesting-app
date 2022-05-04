import { Button, Input, Table, Typography } from 'antd';

import { Address } from 'eth-components/ant';
// import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
// import { useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { TEthersProvider } from 'eth-hooks/models';
import 'antd/dist/antd.css';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';
import React, { FC, ReactElement, useContext, useState } from 'react';

// // import { useAppContracts } from '~~/config/contractContext';

// import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
// import { request, gql } from 'graphql-request';
import { useVestingsQuery, VestingsQuery } from '~~/types-and-hooks';
import { SUBGRAPH_URI } from '~~/config/appConfig';

// const GraphiQL = lazy(() => import('graphiql'));

const highlight: React.CSSProperties = {
  marginLeft: 4,
  marginRight: 8,
  /* backgroundColor: "#f9f9f9", */ padding: 4,
  borderRadius: 4,
  fontWeight: 'bolder',
};

export interface ISubgraphProps {
  subgraphUri: string;
  mainnetProvider: TEthersProvider | undefined;
}

export const Subgraph: FC<ISubgraphProps> = (props) => {
  const { data, isFetching, error } = useVestingsQuery<VestingsQuery, unknown>({ endpoint: SUBGRAPH_URI });
  const EXAMPLE_GQL = `
  {
    erc20S {
      id
      symbol
      name
    }
  }
  `;

  const purposeColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      key: 'id',
      render: (record: any): ReactElement => {
        console.log('record', record);
        return <Address address={record.id} ensProvider={props.mainnetProvider} fontSize={16} />;
      },
    },
    {
      title: 'createdAt',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (d: number): string => new Date(d * 1000).toISOString(),
    },
  ];

  const [newPurpose, setNewPurpose] = useState('loading...');

  const deployWarning = (
    <div style={{ marginTop: 8, padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
  );

  return (
    <>
      <div style={{ width: 780, margin: 'auto', paddingBottom: 64 }}>
        <div style={{ margin: 32, textAlign: 'right' }}>
          {/* <Input
            onChange={(e): void => {
              setNewPurpose(e.target.value);
            }}
          />
          <Button
            onClick={(): void => {
              console.log('newPurpose', newPurpose);
            }}>
            Set Purpose
          </Button> */}
        </div>

        {data?.vestings ? (
          <Table dataSource={data?.vestings} columns={purposeColumns} rowKey="id" />
        ) : (
          <Typography>{isFetching ? 'Loading...' : deployWarning}</Typography>
        )}

        <div style={{ margin: 32, width: 1000, height: 800, border: '1px solid #888888', textAlign: 'left' }}>
          <iframe style={{ width: '100%', height: '100%' }} src={SUBGRAPH_URI} />
        </div>
      </div>

      <div style={{ padding: 64 }}>...</div>
    </>
  );
};

export default Subgraph;
