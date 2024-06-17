import { gql } from '@apollo/client'; 

export const ADD_RETRO = `
mutation newRetro($input: Retrospective!) { 
  postRetro(input: $input) {
    kudos {
      description
    }
    improvements {
      description
    }
    actionItems {
      description
    }
    lastActionItems {
      description
    }
    ownedBy {
      productTeam
    }
  }
}
`;

export const ADD_ITEM = gql`
  mutation newItem($input: Item!) {
    postItem(input: $input) {
        description
        likes
        type
    }
  }
`;

export const MOVE_ITEM = gql`
  mutation postMoveItem($input: Item!) {
    moveItem(input: $input) {
        description
        likes
        type
    }
  }
`;


export const DELETE_ITEM = gql`
mutation removeItem($id: ID!, $itemId: ID!, $desc: String!, $type: String!) {
  deleteItem(_id: $id, itemId: $itemId, desc: $desc, type: $type)
}
`;


export const ADD_ITEM_LIKE = gql`
mutation postItemLike($id: ID!, $itemId: ID!, $desc: String!, $type: String!) {
  addItemLike(_id: $id, itemId: $itemId, desc: $desc, type: $type)
}
`;