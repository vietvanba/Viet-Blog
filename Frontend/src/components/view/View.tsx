import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./view.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { useCallback, useEffect } from "react";
type ViewProps = {
  id: string | undefined;
  name: string | undefined;
  onClose: () => void;
};

export const View: React.FC<ViewProps> = ({ id, name, onClose }) => {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
  return (
    <div className="view">
      <div className="close" onClick={onClose}>
        <FontAwesomeIcon icon={faClose} style={{ fontSize: "20px" }} />
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
