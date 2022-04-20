import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React from "react";

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

  return (
    <>
      <div style={{ width: 1200, margin: "auto", paddingBottom: 64 }}>
        <div style={{ margin: 32, height: 700, border: "1px solid #888888", textAlign: "left" }}>
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={EXAMPLE_GRAPHQL} />
        </div>
      </div>
    </>
  );
}

export default Subgraph;
