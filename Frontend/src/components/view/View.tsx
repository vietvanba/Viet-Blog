import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./view.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { useEffect, useRef } from "react";
type ViewProps = {
  id: string | undefined;
  name: string | undefined;
  onClose: () => void;
};

export const View: React.FC<ViewProps> = ({ id, name, onClose }) => {
  return (
    <div className="view">
      <div className="close" onClick={onClose}>
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="preview">
        <iframe
          src={"https://drive.google.com/file/d/" + id + "/preview"}
          width="100%"
          height="100%"
          allow="autoplay"
          allowFullScreen
        ></iframe>
      </div>
      <div className="title">
        <div className="title-text">{name}</div>
        <a
          className="download"
          href={"https://drive.google.com/uc?export=download&id=" + id}
          download
        >
          Download
          <FontAwesomeIcon icon={faDownload} />
        </a>
      </div>
    </div>
  );
};
