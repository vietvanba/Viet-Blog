import { Dispatch, SetStateAction } from "react";
import "./markdownEditor.scss";
import MDEditor from "@uiw/react-md-editor";
type MarkdownProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};
export const MarkdownEditor: React.FC<MarkdownProps> = ({
  value,
  setValue,
}) => {
  const handleChange = (value?: string | undefined) => {
    setValue(value || "");
  };
  return (
    <div className="markdown">
      <div className="edit">
        <MDEditor
          className="mdeditor"
          value={value}
          onChange={handleChange}
          height="100%"
          highlightEnable={false}
        />
      </div>
    </div>
  );
};
