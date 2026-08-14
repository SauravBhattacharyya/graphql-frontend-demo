import { gql, type TypedDocumentNode } from "@apollo/client";
import { print } from "graphql";

export type Country = {
  name?: string | null;
  native?: string | null;
  code?: string | null;
  capital?: string | null;
  currency?: string | null;
  phone?: string | null;
  continent?: { name?: string | null; code?: string | null } | null;
  languages?:
    | {
        name?: string | null;
        native?: string | null;
        code?: string | null;
      }[]
    | null;
  states?: { name?: string | null }[] | null;
};

export type GetCountryData = {
  country: Country;
};

export type GetCountryVars = {
  code: string;
};

export const GET_COUNTRY: TypedDocumentNode<GetCountryData, GetCountryVars> =
  gql`
    query GetCountry($code: ID!) {
      country(code: $code) {
        name
        native
        code
        capital
        currency
        phone
        continent {
          name
          code
        }
        languages {
          name
          native
          code
        }
        states {
          name
        }
      }
    }
  `;

/** Body for native `fetch` — same operation as Apollo `useQuery(GET_COUNTRY)`. */
export function getCountryFetchBody(code: string) {
  return {
    query: print(GET_COUNTRY),
    variables: { code },
  };
}
