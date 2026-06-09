import React from "react";

type Props = {
    tags: string[];
}

export const RelatedTags: React.FC<Props> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            padding: "2px 6px",
            marginRight: "4px",
            fontSize: "10px",
            display: "inline-block",
          }}
        >
          {tag}
        </span>
      ))}
    </>
  );
};