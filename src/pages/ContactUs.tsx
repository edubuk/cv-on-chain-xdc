import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-3xl font-bold text-[#006666] mb-4">Contact Us</h1>

      <p className="text-gray-600 mb-4">
        If you have any questions or need assistance, feel free to reach out to us. Our team is here to help!
      </p>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Company Details</h2>
        <p className="text-gray-600">
          <strong>Company:</strong> Eduprovince Technologies Private Limited (Edubuk)
        </p>
        <p className="text-gray-600">
          <strong>Operating Address:</strong> PHF 4117, Prestige High Fields, ISB Road, 
          Financial District, Hyderabad-500032, Telangana, India
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> 
          <a href="mailto:support@edubuk.com" className="text-blue-600 hover:underline ml-1">
            support@edubuk.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
