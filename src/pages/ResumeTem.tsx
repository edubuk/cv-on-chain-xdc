import React from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
// import { useGetCv } from "@/api/cv.apis";
// import { useParams } from "react-router-dom";
// import { SiHyperskill } from "react-icons/si";
// import { FaBriefcase } from "react-icons/fa";
// import { GiAchievement } from "react-icons/gi";
// import { BiSolidBriefcase } from "react-icons/bi";
// import { GraduationCap, Mail, MapPinned, Phone } from "lucide-react";
// import { MdSchool } from "react-icons/md";
// import HyperText from "@/components/ui/AnimateHypertext";
// import ShowVerifications from "@/components/ShowVerifications";
// import { ShowAnimatedVerifications } from "@/components/ShowAnimatedVerifications";

const Resume: React.FC = () => {
  // const { id } = useParams();

  // if (!id) {
  //   return;
  // }

  // const { cvData, isLoading } = useGetCv(id);
  // console.log(cvData);
  // if (isLoading) {
  //   return <h1>Loading</h1>;
  // }

  // if (!cvData) {
  //   return <h1>No cv found</h1>;
  // }
  return (
    <div className=" min-h-screen flex justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-lg p-8">
        {/* Header */}
        <header className="border-b border-gray-300 pb-4 mb-6 text-center">
          <h1 className="text-4xl font-bold text-[#006666]">
            {/* {cvData.personalDetails.name} */}Ajeet Ram Verma
            </h1>
          <div className="text-gray-600 mt-2 space-y-1 flex flex-col sm:flex-row sm:justify-center">
            <p className="flex space-x-2 items-center">
              <FaPhoneAlt className="text-xl text-[#006666]" />
              {/* {cvData.personalDetails.phoneNumber} */}9555437698
            </p>
            <p className="flex space-x-2 items-center px-2">
              <FaEnvelope className="text-xl text-[#006666]" />
              <a
                href="mailto:ajeetramverma10@gmail.com"
                className="text-blue-500 hover:underline font-bold"
              >
                {/* {cvData.personalDetails.email} */}ajeetramverma10@gmail.com
              </a>
            </p>
            <p className="flex space-x-2 justify-center">
            <FaLinkedin className=" text-xl text-[#006666]" />
              <a
                href="linkedin"
                className="text-[#006666] hover:text-blue-600 font-bold"
              >linkedIn
              </a>
              <FaGithub className="text-xl text-[#006666]" />
              <a
                href="https://github.com/ajeetram"
                className="text-[#006666] hover:text-gray-800 font-bold"
              >
                Github
              </a>
            </p>
          </div>
        </header>

        {/* Education Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 ">IIIT Naya Raipur</h3>
                <p className="text-gray-600 font-serif">
                  B.Tech in Electronics and Communication
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-serif">Dec 2020 – July 2024</p>
                <p className="text-gray-600 font-bold font-serif">CGPA: 8.36/10</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 ">
                  Haji Nurool Hasan Memorial Inter College
                </h3>
                <p className="text-gray-600 font-serif">Class-XII | UP Board</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-serif">April 2018</p>
                <p className="text-gray-600 font-bold font-serif">84.2%</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 ">
                  Haji Nurool Hasan Memorial Inter College
                </h3>
                <p className="text-gray-600 font-serif">Class-X | UP Board</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-serif">May 2016</p>
                <p className="text-gray-600 font-bold font-serif">87.1%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Experience
          </h2>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Fastr Payments</h3>
              <p className="text-gray-600 text-right">Jan 2024 – May 2024</p>
            </div>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 pl-6">
              <li>
                Developed a responsive payment interface ensuring seamless user
                experience.
              </li>
              <li>
                Designed and implemented RESTful APIs to handle CRUD operations
                on credit/debit card data.
              </li>
              <li>
                Enhanced transaction reliability through third-party API
                integration.
              </li>
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Projects
          </h2>
          <div className="mt-4 space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#006666]">E-commerce App</h3>
                <p className="text-gray-600 text-right">
                  React.js, Node.js, Stripe API
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 pl-6">
                <li>
                  Responsive e-commerce platform with user/admin authentication
                  and dashboards.
                </li>
                <li>
                  Product listing, cart management, user reviews, and secure
                  Stripe payment integration.
                </li>
                <li>
                  Search functionality and personalized "Favorites" section.
                </li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#006666]">Task Manager</h3>
                <p className="text-gray-600 text-right">
                  React.js, TypeScript, Node.js
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 pl-6">
                <li>
                  Task creation, updating, and deletion with drag-and-drop
                  functionality.
                </li>
                <li>
                  Backend API integration and JWT-based authentication.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Technical Skills
          </h2>
          <div className="mt-4 space-y-2">
            <p>
              <strong>Languages:</strong> C/C++, Java, SQL, HTML/CSS,
              JavaScript, Solidity
            </p>
            <p>
              <strong>Frameworks/Libraries:</strong> React.js, Express.js,
              Ether.js, Node.js, Firebase, IPFS, MongoDB
            </p>
            <p>
              <strong>Tools:</strong> Git, VSCode
            </p>
            <p>
              <strong>Soft Skills:</strong> Communication, Leadership,
              Team-Work
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
