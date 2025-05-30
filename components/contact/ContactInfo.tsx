// components/contact/ContactInfo.tsx
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 text-center text-gray-700">
      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
      <ul className="space-y-4">
        <li className="flex items-center justify-center gap-3">
          <FaPhoneAlt className="text-gray-500" />
          <span>+91 8105049653</span>
        </li>
        <li className="flex items-center justify-center gap-3">
          <FaEnvelope className="text-gray-500" />
          <span>contact@dcdesigns.in</span>
        </li>
        <li className="flex items-center justify-center gap-3">
          <FaMapMarkerAlt className="text-gray-500" />
          <span>
            05, Ground Floor, V K Tower, Evershine City,<br />
            Vasai East, Maharashtra 401208, India
          </span>       
         </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
