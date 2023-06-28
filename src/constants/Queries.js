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

export const GET_ITEMS_BY_ITERATION = gql`
query allByIterationAndTeam($productTeam: String!, $iteration: Int!) {
    retroByIterationAndTeam(productTeam: $productTeam, iteration: $iteration) {
      _id
      kudos {
        description
        likes
        type
      }
      improvements {
        description
        likes
        type
      }
      actionItems {
        description
        likes
        type
      }
      lastActionItems {
        description
        likes
        type
      }
    }
  }
`;