import React from "react";
import { gql, useMutation } from '@apollo/client';

const ADD_RETRO = gql`
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

export function CreateRetro(input) {
  const [addRetro, { data, loading, error }] = useMutation(ADD_RETRO);
  addRetro(input);
  if (error) return <p>Error</p>;
  console.log(data);
  return data;
}