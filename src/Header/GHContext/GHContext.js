import React, { useState, useEffect } from "react";
import fetchGraphQL from "../../core/fetchGraphQL";

const contextQuery = /* GraphQL */ `
  {
    viewer {
      login
      avatarUrl
      organizations(first: 10) {
        nodes {
          login
          avatarUrl
          teams(first: 10, role: MEMBER) {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            totalCount
            nodes {
              name
              url
            }
          }
          url
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
          hasPreviousPage
        }
        totalCount
      }
    }
  }
`;

function GHContext() {
  // We'll load the name of a repository, initially setting it to null
  const [ghContext, setGHContext] = useState(null);

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(contextQuery)
      .then((response) => {
        // Avoid updating state if the component unmounted before the fetch completes
        if (!isMounted) {
          return;
        }
        setGHContext(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return <div className="gh-context">{JSON.stringify(ghContext, "  ", "  ")}</div>;
}

export default GHContext;
