import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type RichEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const RichEditor: React.FC<RichEditorProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState<string>(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

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
        onChange={handleChange}
        modules={modules}
        placeholder="Write something amazing..."
      />
    </div>
  );
};

export default RichEditor;
