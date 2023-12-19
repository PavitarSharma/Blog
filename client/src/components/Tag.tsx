/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useEditorContext from "../hooks/useEditorContext";

const Tag = ({ tag, tagIndex }: { tag: string; tagIndex: number }) => {
  const {
    blog,
    blog: { tags },
    setBlog,
  } = useEditorContext();

  const handleDelete = () => {
    const deleteTags = tags.filter((t: string) => t !== tag);

    setBlog({
      ...blog,
      tags: deleteTags,
    });
  };

  const isStringArray = (value: any): value is string[] => {
    return (
      Array.isArray(value) && value.every((item) => typeof item === "string")
    );
  };

  const handleTagEdit = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (isStringArray(tags)) {
      const currentTags = tags.slice();

      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault();

        const currentTag = (event.target as HTMLParagraphElement).textContent;

        if (currentTag !== null) {
          currentTags[tagIndex] = currentTag;

          setBlog({
            ...blog,
            tags: currentTags,
          });

          (event.target as HTMLParagraphElement).setAttribute(
            "contentEditable",
            "false"
          );
        }
      }
    }
  };

  const addEditable = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    const targetParagraph = event.target as HTMLParagraphElement;

    targetParagraph.setAttribute("contentEditable", "true");
    targetParagraph.focus();
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
      <p
        onKeyDown={handleTagEdit}
        dangerouslySetInnerHTML={{ __html: tag }}
        className="outline-none"
        onClick={addEditable}
      ></p>
      <button
        onClick={handleDelete}
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
      >
        <i className="fi fi-br-cross text-sm pointer-events-none"></i>
      </button>
    </div>
  );
};

export default Tag;
