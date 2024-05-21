import { useState } from "react";
import "./categoryCreate.scss";
import {postWithToken } from "../axios/API";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
interface CategoryProps {
  onClose: () => void;
  fetch: () => void;
}
export const CategoryCreate: React.FC<CategoryProps> = ({ onClose, fetch }) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    if (token) {
      setLoading(true);
      postWithToken("/api/category", formData, token)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            toast.success("Category created.");
            onClose();
            fetch();
          }
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.response == null) toast.error(e.message);
          else {
            e.response.data.map((error: any) => {
              toast.error(error.error, { duration: 2000 });
            });
          }
        });
    }
  };
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="category-create-overlay">
      {loading && <LoadingSpinner />}

      <form onSubmit={handleSubmit} className="category-form-create">
        <span className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </span>
        <div className="title">Create new category</div>

        <input
          type="text"
          name="name"
          placeholder="Category"
          onChange={handleOnChangeInput}
          value={formData.name}
        />
        <input type="submit" value="Create" className="submit" />
      </form>
    </div>
  );
};
