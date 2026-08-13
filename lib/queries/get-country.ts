import { gql, type TypedDocumentNode } from "@apollo/client";
import { print } from "graphql";

export type Country = {
  name: string;
  native: string;
  code: string;
  capital: string;
  currency: string;
  phone: string;
  continent: { name: string; code: string };
  languages: { name: string; native: string; code: string }[];
  states: { name: string }[];
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
