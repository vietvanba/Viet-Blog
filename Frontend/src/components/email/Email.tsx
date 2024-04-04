import React, { useState } from "react";
import "./email.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { post } from "../axios/API";
import toast from "react-hot-toast";
export const Email = () => {
  const [formData, setFormData] = useState({
    sender: "",
    address: "",
    content: "",
    status: "NEW",
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="email">
      <h1 className="title">Contact me</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          post("/api/mail", formData)
            .then((res) => {
              if (res.status === 200) {
                toast.success(
                  "Your email has been sent.\nThe automatic email will be sent to you via your email.\nThank you",
                  { duration: 5000 }
                );
              }
            })
            .catch((e) => {
              e.response.data.map((error: any) => {
                toast.error(error.error);
              });
            });
        }}
      >
        <input
          className="senderemail"
          id="address"
          name="address"
          placeholder="Your email ..."
          value={formData.address}
          onChange={handleChange}
        />
        <input
          className="sendername"
          id="sender"
          name="sender"
          placeholder="Your name ..."
          value={formData.sender}
          onChange={handleChange}
        />
        <textarea
          className="message"
          id="content"
          name="content"
          placeholder="Your messages"
          value={formData.content}
          onChange={handleChange}
          rows={10}
        />
        <motion.button className="submit" whileHover={{ scale: 1.1 }}>
          {" "}
          Submit
          <FontAwesomeIcon icon={faPaperPlane} />
        </motion.button>
      </form>
    </div>
  );
};
