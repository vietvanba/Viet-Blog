import { useEffect, useState } from "react";
import "./signUp.scss";
import { get, post } from "../../components/axios/API";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import BirthdayInput from "../../components/birthdayInput/BirthdayInput";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const [confirmpw, setConfirmpw] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsPhoneNumber] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setConfirmpw(value);
  };
  const checkCondition = () => {
    if (formData.password === confirmpw) setIsValidConfirmPassword(true);
    else setIsValidConfirmPassword(false);
  };
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(regex.test(email));
  };
  const validatePhoneNumber = (phone: string) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    setIsPhoneNumber(regexPhoneNumber.test(phone));
  };
  const validatePassword = (password: string) => {
    var re = {
      capital: /(?=.*[A-Z])/,
      length: /(?=.{7,40}$)/,
      specialChar: /[ -\/:-@\[-\`{-~]/,
      digit: /(?=.*[0-9])/,
    };
    if (password.length < 8) setIsValidPassword(false);
    setIsValidPassword(
      re.capital.test(password) &&
        re.length.test(password) &&
        re.specialChar.test(password) &&
        re.digit.test(password)
    );
  };
  const handleBirthdayChange = (birthday: string) => {
    setFormData({ ...formData, ["birthday"]: birthday });
  };
  useEffect(() => {
    checkCondition();
    validateEmail(formData.email);
    validatePassword(formData.password);
    validatePhoneNumber(formData.phoneNumber);
  }, [formData.password, confirmpw, formData.email, formData.phoneNumber]);
  useEffect(() => {
    get("/api/auth/" + formData.username).then((res) => {
      if (res.status === 200) {
        if (res.data.username === "") setIsValidUsername(true);
        else setIsValidUsername(false);
      }
    });
  }, [formData.username]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidConfirmPassword)
      toast.error("Please correct your password confirmation.");
    if (!isValidEmail) toast.error("Please correct your email.");
    if (!isValidPassword) toast.error("Please correct your password.");
    if (!isValidPhoneNumber) toast.error("Please correct your phone number.");
    if (
      isValidEmail &&
      isValidPassword &&
      isValidPhoneNumber &&
      isValidConfirmPassword
    ) {
      setLoading(true);
      post("/api/auth/register", formData)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            toast.success("Sign up succeed", { duration: 2000 });
            navigate("/signin");
          }
        })
        .catch((e: any) => {
          e.response.data.map((error: any) => {
            setLoading(false);
            toast.error(error.error);
          });
        });
    }
  };
  return (
    <div className="form">
      {loading && <LoadingSpinner />}
      <div className="left-form">
        <img src="logo.svg" alt="" className="enterlogo" />
      </div>
      <div className="right-form">
        <form onSubmit={handleSubmit} className="main-form">
          <div className="title">Sign up</div>
          <label className="input">
            <div className="wrap">
              <div className="lable-name">User name</div>
              <div className="status username">
                {!isValidUsername && <FontAwesomeIcon icon={faCircleXmark} />}
              </div>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleOnChangeInput}
              value={formData.username}
            />
          </label>
          <label className="input">
            <div className="wrap">
              <div className="lable-name">Password</div>
              <div className="status password">
                {!isValidPassword && <FontAwesomeIcon icon={faCircleXmark} />}
              </div>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChangeInput}
              value={formData.password}
            />
          </label>
          <label className="input">
            <div className="wrap">
              <div className="lable-name">Confirm Password</div>
              <div className="status confirmpw">
                {!isValidConfirmPassword && (
                  <FontAwesomeIcon icon={faCircleXmark} />
                )}
              </div>
            </div>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              onChange={handleConfirmPassword}
            />
          </label>

          <label className="input">
            <div className="lable-name">First name</div>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={handleOnChangeInput}
              value={formData.firstName}
            />
          </label>
          <label className="input">
            <div className="lable-name">Last name</div>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={handleOnChangeInput}
              value={formData.lastName}
            />
          </label>
          <label className="input">
            <div className="lable-name">Birthday</div>
            <BirthdayInput onBirthdayChange={handleBirthdayChange} />
          </label>
          <label className="input">
            <div className="wrap">
              <div className="lable-name">Email</div>
              <div className="status emailformat">
                {!isValidEmail && <FontAwesomeIcon icon={faCircleXmark} />}
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleOnChangeInput}
              value={formData.email}
            />
          </label>
          <label className="input">
            <div className="wrap">
              <div className="lable-name">Phone</div>
              <div className="status phone">
                {!isValidPhoneNumber && (
                  <FontAwesomeIcon icon={faCircleXmark} />
                )}
              </div>
            </div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone"
              onChange={handleOnChangeInput}
              value={formData.phoneNumber}
            />
          </label>

          <input type="submit" value="Sign up" className="submit" />

          <Link to="/signin" className="signup">
            Already registered? Click to login
          </Link>
        </form>
      </div>
    </div>
  );
};
