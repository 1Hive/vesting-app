import { gql, useQuery } from "@apollo/client";
import { Button, Input, Table, Typography } from "antd";
import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState } from "react";
import { Address } from "../components";

function Subgraph(props) {
  function graphQLFetcher(graphQLParams) {
    return fetch(props.subgraphUri, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const EXAMPLE_GRAPHQL = `
  {
    vestedERC20Factories{
      id
      count
      vestedERC20{
        id
        name
        symbol
        decimals
        underlying{
          id
          name
          symbol
          decimals
        }
        startTimestamp
        endTimestamp
        vestings{
          id
          createdAt
          recipient
          underlyingAmount
          claimedUnderlyingAmount
          wrappedTokenAmount
        }
      }
    }
  }
  `;
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  const purposeColumns = [
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Sender",
      key: "id",
      render: record => <Address value={record.sender.id} ensProvider={props.mainnetProvider} fontSize={16} />,
    },
    {
      title: "createdAt",
      key: "createdAt",
      dataIndex: "createdAt",
      render: d => new Date(d * 1000).toISOString(),
    },
  ];

  const [newPurpose, setNewPurpose] = useState("loading...");

  const deployWarning = (
    <div style={{ marginTop: 8, padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
  );

  return (
    <>
      <div style={{ width: 1200, margin: "auto", paddingBottom: 64 }}>
        <div style={{ margin: 32, textAlign: "right" }}>
          <Input
            onChange={e => {
              setNewPurpose(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              console.log("newPurpose", newPurpose);
              /* look how you call setPurpose on your contract: */
              props.tx(props.writeContracts.YourContract.setPurpose(newPurpose));
            }}
          >
            Set Purpose
          </Button>
        </div>

        {data ? (
          <Table dataSource={data.purposes} columns={purposeColumns} rowKey="id" />
        ) : (
          <Typography>{loading ? "Loading..." : deployWarning}</Typography>
        )}

        <div style={{ margin: 32, height: 700, border: "1px solid #888888", textAlign: "left" }}>
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={EXAMPLE_GRAPHQL} />
        </div>
      </div>
    </>
  );
}

export default Subgraph;
