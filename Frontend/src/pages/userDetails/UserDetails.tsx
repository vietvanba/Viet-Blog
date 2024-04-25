import { useEffect, useState } from "react";
import "./userDetails.scss";
import { getWithToken } from "../../components/axios/API";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
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
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  active: string;
  personalAddressDTOS: Address[];
};
export const UserDetails = () => {
  const [userDetails, setUserDetails] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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
  return (
    <div className="userdetail">
      {loading && <LoadingSpinner />}
      <div className="wall">
        <img src="default_wall.jpg" alt="defaultwall" className="wall-image" />
      </div>
      <div className="header">
        <img src="avatar.jpg" alt="" className="avatar" />
        <div className="name">{`${userDetails?.firstName} ${userDetails?.lastName}`}</div>
      </div>
      <div className="form-infomation">
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
        <br />
        1
        <br />
      </div>
    </div>
  );
};
