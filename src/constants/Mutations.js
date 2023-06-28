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
      productGroup
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


export const DELETE_ITEM = gql`
mutation removeItem($id: ID!, $desc: String!, $type: String!) {
  deleteItem(_id: $id, desc: $desc, type: $type)
}
`;


export const ADD_ITEM_LIKE = gql`
mutation postItemLike($id: ID!, $desc: String!, $type: String!) {
  addItemLike(_id: $id, desc: $desc, type: $type)
}
`;