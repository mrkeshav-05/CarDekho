import React, { useRef, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contactusImage from "../../Images/contactus.png"; // Ensure this is a transparent PNG

import { useNavigate } from "react-router-dom";

interface ContactUsProps {
  user: {
    _id?: string;
    name?: string;
    email?: string;
  };
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactUs: React.FC<ContactUsProps> = ({ user, setIsLoggedIn }) => {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        "service_azwknuq",
        "template_vtbb5x8",
        form.current!,
        "oU0ryGDpjrwI74xnw"
      );
      toast.success("Email sent successfully! 🎉");
      toast.success("We will reach out to you at the earliest.");
      navigate("/");
    } catch (err: any) {
      console.error("EMAILJS FAILED:", err);
      toast.error("Failed to send email. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <Navbar user={user} setUser={() => {}} setIsLoggedIn={setIsLoggedIn} />
      <ToastContainer />
      <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="flex items-center justify-center">
            <img
              className="max-w-[500px] w-full mx-auto rounded-2xl"
              src={contactusImage}
              alt="Contact Us"
            />
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-4xl font-semibold mb-7">Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from_name">
                  Name:
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="from_name"
                  type="text"
                  name="from_name"
                  placeholder="Enter your Name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from_email">
                  Email:
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="from_email"
                  type="email"
                  name="from_email"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message:
                </label>
                <textarea
                  className="border rounded w-full py-2 px-3 h-32 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="message"
                  name="message"
                  placeholder="Enter your Message"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-left">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
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

export default ContactUs;