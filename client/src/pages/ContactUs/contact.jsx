import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contactusimg from "../../Images/contactus.png"; // Import the image

import { useNavigate } from "react-router-dom";

export const ContactUs = ({ user,setIsLoggedIn }) => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        "service_azwknuq",
        "template_vtbb5x8",
        form.current,
        {
          publicKey: "oU0ryGDpjrwI74xnw",
        }
      );
      toast.success("Email sent successfully!");
      toast.success('We will reach at you at the earliest')
      navigate('/');
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log("EMAILJS FAILED...", err);
        toast.error("Failed to send email.");

      } else {
        console.log("ERROR", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light ">
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
      <ToastContainer />
      <div className=" mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img
              className="max-w-[#500px] w-full mx-auto rounded-2xl"
              src={contactusimg}
              alt="Contact Us"
            />
          </div>
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-4xl font-semibold mb-7">Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-3 "
                  htmlFor="from_name"
                >
                  Name:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="from_name"
                  type="text"
                  name="from_name"
                  placeholder="Enter your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-3"
                  htmlFor="from_email"
                >
                  Email:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="from_email"
                  type="email"
                  name="from_email"
                  placeholder="Enter your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-3"
                  htmlFor="message"
                >
                  Message:
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  name="message"
                  placeholder="Enter your Message"
                  required
                ></textarea>
              </div>
              <div className="text-left">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
