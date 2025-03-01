import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="w-full rounded border-t border-[#006666] mt-10 bg-white shadow-lg">
      {/* Contact Us Section */}
      <div className=" flex justify-around items-center bg-teal-700 text-white p-2 rounded-lg w-full  sm:w-3/4 text-xs mx-auto absolute md:text-lg translate-y-[-50%] z-30">
        <div className="flex flex-col items-start text-center md:text-left">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Ready for Certified CV</h1>
          <p className="text-orange-500">Let's get started</p>
        </div>
        <Link to="/create-cv">
          <button className="bg-white text-teal-700 px-4 py-2 rounded-lg hover:bg-gray-200 mt-4 md:mt-0">
            Create Your CV
          </button>
        </Link>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col justify-center items-center w-full p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left mt-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="/edubuklogo.png" alt="logo" className="w-12 h-12 mt-2" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 via-orange-500 to-blue-500 bg-clip-text text-transparent">
                Edubuk
              </h1>
            </div>
            <p className="text-xl text-teal-700">© 2025</p>
          </div>

          {/* Links Column 1 */}
          <div className="flex justify-start sm:justify-center items-center">
            <ul className="space-y-2">
              <li>
                <a href="https://www.edubukeseal.com/#learnerprofile" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Learner’s Profile on Blockchain
                </a>
              </li>
              <li>
                <a href="https://www.edubukeseal.com/#collabNSupport" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Our Collaborators
                </a>
              </li>
              <li>
                <a href="https://www.edubukeseal.com/#unSDG" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> UN SDG’s Compliance
                </a>
              </li>
              <li>
                <Link to="/about-us" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="flex justify-start sm:justify-center items-center">
            <ul className="space-y-2">
              <li>
                <a href="https://www.edubukeseal.com/#accProgram" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Accelerator Programs
                </a>
              </li>
              <li>
                <a href="https://www.edubukeseal.com/#awardRecog" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Awards & Recognitions
                </a>
              </li>
              <li>
                <a href="https://www.edubukeseal.com/about#teamInfo" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Meet our Team & Advisors
                </a>
              </li>
              <li>
                <a href="https://www.edubukeseal.com/ceta" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> CETA Program
                </a>
              </li>
              <li>
                <a href="https://www.edubukeseal.com/finder" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Request Credential
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="flex justify-start sm:justify-center items-center">
            <ul className="space-y-2">
              <li>
                <a href="https://www.edubuk.io" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Visit: www.edubuk.io
                </a>
              </li>
              <li>
                <a href="mailto:support@edubuk.com" target="_blank" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Email: support@edubuk.com
                </a>
              </li>
              <li>
                <Link to="/refund-policy" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-teal-700 hover:text-orange-500">
                  <span className="text-orange-500">→</span> Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <h2 className="text-teal-700">Follow us on:</h2>
          <a href="https://t.me/edubukofficial" target="_blank">
            <FaTelegram className="text-blue-600 w-6 h-6 hover:text-orange-500" />
          </a>
          <a href="https://www.facebook.com/edubuk.trst/" target="_blank">
            <FaFacebook className="text-blue-700 w-6 h-6 hover:text-orange-500" />
          </a>
          <a href="https://www.instagram.com/edubuk_/" target="_blank">
            <FaInstagram className="text-pink-600 w-6 h-6 hover:text-orange-500" />
          </a>
          <a href="https://www.linkedin.com/company/edubuk-ai-web3/" target="_blank">
            <FaLinkedin className="text-blue-500 w-6 h-6 hover:text-orange-500" />
          </a>
          <a href="https://x.com/edubuktrust" target="_blank">
            <FaTwitter className="text-blue-400 w-6 h-6 hover:text-orange-500" />
          </a>
          <a href="https://www.youtube.com/channel/UC4g4MH4F_JTbd1tqNS5pq1g/videos" target="_blank">
            <FaYoutube className="text-red-600 w-6 h-6 hover:text-orange-500" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
