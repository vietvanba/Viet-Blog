import { useState } from "react";
import "./signIn.scss";
import { post } from "../../components/axios/API";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const SignIn = () => {
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
    post("/api/auth/login", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Sign in succeed", { duration: 5000 });
        }
      })
      .catch((e: any) => {
        // e.response.data((error: any) => {
        //
        // });
        console.log();
        toast.error(e.response.data.status);
      });
  };
  return (
    <div className="form">
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
          <Link to="/forgot" className="forgot">Forgot password?</Link>
        </form>
      </div>
    </div>
  );
};
