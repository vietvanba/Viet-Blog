import { useState } from "react";
import "./signIn.scss";
import { post } from "../../components/axios/API";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

export const SignIn = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    post("/api/auth/login", formData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          toast.success("Sign in succeed", { duration: 2000 });
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("first_name", res.data.first_name);
          localStorage.setItem("last_name", res.data.last_name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("role", res.data.role);
          navigate("/");
        }
      })
      .catch((e: any) => {
        e.response.data.map((error: any) => {
          toast.error(error.error, { duration: 2000 });
        });
        setLoading(false);
      });
  };
  return (
    <div className="form">
      {loading && <LoadingSpinner />}
      <div className="left-form">
        <img src="logo.svg" alt="" className="enterlogo" />
      </div>
      <div className="right-form">
        <form onSubmit={handleSubmit} className="main-form">
          <div className="title">Sign in</div>
          <label className="input">
            Username
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleOnChangeInput}
              value={formData.username}
            />
          </label>
          <label className="input">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChangeInput}
              value={formData.password}
            />
          </label>
          <input type="submit" value="Sign in" className="submit" />
          <Link to="/forgot" className="forgot">
            Forgot password?
          </Link>
        </form>
      </div>
    </div>
  );
};
