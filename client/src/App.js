import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

import Comment from "./components/Comment";
import Form from "./components/Form";

const GET_COMMENTS = gql`
  query {
    comments {
      id
      name
      content
    }
  }
`;

const DELETE_COMMENTS = gql`
  mutation DeleteComment($id: String!) {
    deleteComments(id: $id) {
      id
    }
  }
`;

export default function App() {
  const { loading, error, data, refetch } = useQuery(GET_COMMENTS);
  const [deleteComment] = useMutation(DELETE_COMMENTS);

  if (error) return "Unspected error ocurred.";

  function handleAddComment() {
    refetch();
  }

  function handleDelete(id) {
    deleteComment({ variables: { id } });
    refetch();
  }
  return (
    <>
      <h1>Comments</h1>
      <Form onAddComment={handleAddComment} />
      {loading ? (
        "Loading..."
      ) : (
        <section className="comments">
          {data.comments.map(({ id, name, content }) => (
            <Comment
              key={id}
              id={id}
              name={name}
              description={content}
              onClick={handleDelete}
            />
          ))}
        </section>
      )}
    </>
  );
}
