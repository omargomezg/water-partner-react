import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type RichEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const RichEditor: React.FC<RichEditorProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState<string>(value || "");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { direction: "rtl" },
        { align: [] },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="editor-container">
      <ReactQuill
        theme="snow"
        value={localValue}
        onChange={setLocalValue}
        modules={modules}
        placeholder="Write something amazing..."
      />
    </div>
  );
};

export default RichEditor;
