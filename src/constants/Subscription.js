import { gql } from "@apollo/client";

export const ITEMS_SUBSCRIPTION = gql`
  subscription OnItemAdded {
    itemAdded {
      itemId
      description
      likes
      type
    }
  }
`;
