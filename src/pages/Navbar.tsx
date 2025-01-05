import React, { useState } from "react";
import logo from "../assets/EdubukLogoClean.png";
import { Link, useLocation } from "react-router-dom";
import { handleConnect, logout } from "@/Web3Auth/Web3AuthLogin";


interface LinkItem {
  path: string;
  name: string;
}

interface SidebarProps {
  isOpen: boolean;
  links: LinkItem[];
  setIsSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>;
  location:any;
}

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handlerLogin = async () => {
    await handleConnect();
  };

  const handlerLogout = async () => {
    await logout();
  };




    // const connect=async()=>
    // {
    //   try {
    //       await authenticate(idToken, (result, error) => {
    //           if (result) {
    //               console.log('authentication successful');
    //           }
    //           if (error) {
    //               console.error('authentication error:', error);
    //           }
    //       });
          
    //   } catch (error) {
          
    //   }
    // }

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Create Your CV",
      path: "/create-cv",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <div className="flex justify-between items-center px-8 py-4 w-screen h-[20vh]">
      <img src={logo} alt="Logo" className="h-16 w-16" />
      <div className="flex gap-2 justify-between items-center">
      <div className=" space-x-6 hidden md:block">
        {links?.map((link, i) =>
          link.name === "Home" ? (
            <Link
              key={i + 1}
              to={link.path}
              className={`${
                location.pathname === link.path ? "text-blue-500" : "text-[#006666]"
              } hover:text-blue-500 transition duration-200 py-2`}
            >
              {link.name}
            </Link>
          ) : (
            sessionStorage.getItem("userMailId") && (
              <Link
                key={i + 1}
                to={link.path}
                className={`${
                  location.pathname === link.path ? "text-blue-500" : "text-[#006666]"
                } hover:text-blue-500 transition duration-200 py-2`}
              >
                {link.name}
              </Link>
            )
          )
        )}
        {!sessionStorage.getItem("userMailId") ? (
          <button
            onClick={handlerLogin}
            className="bg-blue-500 py-2 px-4 rounded-full text-white"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handlerLogout}
            className="bg-white-500 border border-slate-500 py-2 px-4 rounded-full text-[#006666]"
          >
            Logout
          </button>
        )}
      </div>
      {/* Hamburger Menu */}
      <div
        className={`relative flex flex-col items-center justify-center w-8 h-8 cursor-pointer space-y-1.5 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "open" : ""
        }`}
        onClick={toggleSidebar}
      >
        <span
          className={`block w-8 h-1 bg-[#006666] rounded transition duration-300 ease-in-out ${
            isSidebarOpen ? "transform translate-y-3 rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-[#006666] rounded transition duration-300 ease-in-out ${
            isSidebarOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-[#006666] rounded transition duration-300 ease-in-out ${
            isSidebarOpen ? "transform -translate-y-2 -rotate-45" : ""
          }`}
        ></span>
      </div>
      </div>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} links={links}  setIsSidebarOpen={setIsSidebarOpen} location={location}/>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, links,setIsSidebarOpen,location }) => {
  const handlerLogin = async () => {
    await handleConnect();
  };

  const handlerLogout = async () => {
    await logout();
  };

 

  return (
    <div
  className={`fixed top-0 left-0 w-64 h-full bg-white text-[#006666] transform transition duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} shadow-lg z-10`}
>
  <ul className="flex flex-col space-y-4 p-4">
  <img src={logo} alt="Logo" className="h-16 w-16" />
  {links?.map((link, i) =>
          link.name === "Home" ? (
            <Link
              key={i + 1}
              to={link.path}
              onClick={()=>setIsSidebarOpen(false)}
              className={`${
                location.pathname === link.path ? "text-blue-500" : "text-[#006666]"
              } hover:text-blue-500 transition duration-200 py-2`}
            >
              {link.name}
            </Link>
          ) : (
            sessionStorage.getItem("userMailId") && (
              <Link
                key={i + 1}
                to={link.path}
                onClick={()=>setIsSidebarOpen(false)}
                className={`${
                  location.pathname === link.path ? "text-blue-500" : "text-[#006666]"
                } hover:text-blue-500 transition duration-200 py-2`}
              >
                {link.name}
              </Link>
            )
          )
        )}
        {!sessionStorage.getItem("userMailId") ? (
          <button
            onClick={handlerLogin}
            className="bg-blue-500 py-2 px-4 rounded-full text-white"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handlerLogout}
            className="bg-white-500 border border-slate-500 py-2 px-4 rounded-full text-[#006666]"
          >
            Logout
          </button>
        )}
  </ul>
</div>

  );
};

export default Navbar;
