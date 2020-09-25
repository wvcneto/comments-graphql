import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const SAVE_COMMENT = gql`
  mutation save($input: CommentInput) {
    saveComment(input: $input) {
      id
    }
  }
`;

export default function Form({ onAddComment }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [addComment] = useMutation(SAVE_COMMENT, {
    variables: {
      input: {
        name,
        content,
      },
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await addComment();
    setName("");
    setContent("");
    onAddComment();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Comment"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}
