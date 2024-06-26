import { useEffect, useState } from "react";
import "./userDetails.scss";
import { getWithToken, patchWithToken } from "../../components/axios/API";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import BirthdayInput from "../../components/birthdayInput/BirthdayInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  /*faCircleXmark,*/ faCircleXmark,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
type Address = {
  id: string;
  provinceId: string;
  province: string;
  districtId: string;
  district: string;
  wardId: string;
  ward: string;
  detailAddress: string;
  fullAddress: string;
  active: string;
  createdTime: string;
};
type User = {
  username?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  birthday?: string | undefined;
  avatar?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  active?: string | undefined;
  personalAddressDTOS?: Address[] | undefined;
};
export const UserDetails = () => {
  const [userDetails, setUserDetails] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isValidPhoneNumber, setIsPhoneNumber] = useState(true);
  const [isEditMode, SetIsEditMode] = useState(false);

  useEffect(() => {
    token
      ? getWithToken("/api/account", token)
          .then((res) => {
            if (res.status === 200) {
              setUserDetails(res.data);
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
          })
      : navigate("/");
  }, []);
  useEffect(() => {
    validatePhoneNumber(userDetails?.phoneNumber);
  }, [userDetails?.email, userDetails?.phoneNumber]);
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const validatePhoneNumber = (phone: string | undefined) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (phone != undefined) setIsPhoneNumber(regexPhoneNumber.test(phone));
  };

  const handleBirthdayChange = (birthday: string) => {
    setUserDetails({ ...userDetails, ["birthday"]: birthday });
    console.table(userDetails);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!isValidPhoneNumber) toast.error("Please correct your phone number.");
    if (isValidPhoneNumber) {
      setLoading(true);
      if (token)
        patchWithToken("/api/account", userDetails, token)
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              toast.success("Update success", { duration: 2000 });
              navigate("/user_details");
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
  const handleEditMode = () => {
    SetIsEditMode(!isEditMode);
    toast(`Edit mode: ${!isEditMode ? "on" : "off"}`, {
      icon: <FontAwesomeIcon icon={faPen} />,
    });
  };
  return (
    <div className="userdetail">
      {loading && <LoadingSpinner />}
      <div className="wall">
        <img src="default_wall.jpg" alt="defaultwall" className="wall-image" />
      </div>
      <div className="header">
        <img src="avatar.jpg" alt="" className="avatar" />
        <div
          className={isEditMode ? " edit-active" : "edit"}
          onClick={handleEditMode}
        >
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div className="name">{`${userDetails?.firstName} ${userDetails?.lastName}`}</div>
        <div className="email">{userDetails?.email}</div>
      </div>
      <div className="form-infomation">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="fullname">
            <label className="input">
              <div className="lable-name">First name</div>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleOnChangeInput}
                value={userDetails?.firstName}
                disabled={!isEditMode}
              />
            </label>
            <label className="input">
              <div className="lable-name">Last name</div>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleOnChangeInput}
                value={userDetails?.lastName}
                disabled={!isEditMode}
              />
            </label>
          </div>
          <label className="input">
            <div className="lable-name">Birthday</div>
            <BirthdayInput
              onBirthdayChange={handleBirthdayChange}
              brithday={userDetails?.birthday}
              isEditMode={isEditMode}
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
              value={userDetails?.phoneNumber}
              disabled={!isEditMode}
            />
          </label>
          <input
            type="submit"
            value="Update"
            className="submit"
            disabled={!isEditMode}
          />
        </form>
      </div>
    </div>
  );
};
