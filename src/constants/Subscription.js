import { gql } from "@apollo/client";

export const ITEMS_SUBSCRIPTION = gql`
  subscription OnItemAdded($input: Item) {
    itemAdded(input: $input) {
      itemId
      description
      likes
      type
    }
  }
`;
