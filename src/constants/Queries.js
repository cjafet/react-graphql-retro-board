import { gql } from '@apollo/client'; 


export const GET_ALL_TEAMS = gql`
query allTeams {
    allTeams 
  }
`;

export const GET_ITEMS_BY_TEAM = gql`
query allByTeam($productTeam: String!) {
  allRetrosByTeam(productTeam: $productTeam) {
    iteration
  }
}
`;

export const GET_ALL_ITEMS_BY_TEAM = gql`
query allByTeam($productTeam: String!) {
  allRetrosByTeam(productTeam: $productTeam) {
    kudos {
      description
      likes
    }
    improvements {
      description
      likes
    }
    actionItems {
      description
      likes
    }
    lastActionItems {
      description
      likes
    }
    iteration
  }
}
`;

export const GET_ITEMS_BY_ITERATION = gql`
query allByIterationAndTeam($productTeam: String!, $iteration: Int!) {
    retroByIterationAndTeam(productTeam: $productTeam, iteration: $iteration) {
      _id
      labels
      kudos {
        itemId
        description
        likes
        type
      }
      improvements {
        itemId
        description
        likes
        type
      }
      actionItems {
        itemId
        description
        likes
        type
      }
      lastActionItems {
        itemId
        description
        likes
        type
      }
    }
  }
`;

export const GET_LAST_ACTION_ITEMS_BY_ITERATION = gql`
query allByIterationAndTeam($productTeam: String!, $iteration: Int!) {
    retroByIterationAndTeam(productTeam: $productTeam, iteration: $iteration) {
      actionItems {
        itemId
        description
        likes
        type
      }
      iteration
    }
  }
`;