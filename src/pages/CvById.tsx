import React from "react";

interface CvByIdProps {
  cvData: string[]; // Expecting an array of strings as cvData
}

const CvById: React.FC<CvByIdProps> = ({ cvData }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 p-4">
      {cvData.map((doc, i) => (
        <div
          key={i}
          className="flex flex-col border border-slate-400 py-4 px-6 sm:px-10 rounded gap-3 transform transition-transform duration-300 hover:translate-y-1 w-full sm:w-auto"
        >
          <h1 className="text-center text-lg font-semibold">
            CV <strong>{i + 1}</strong>
          </h1>
          <a
            href={`https://edubuk-cv-on-chain.vercel.app/cv/${doc}`}
            className="border border-slate-400 text-[#006666] py-2 px-4 rounded-md hover:text-yellow-700 text-center"
          >
            View CV
          </a>
        </div>
      ))}
    </div>
  );
};

export default CvById;
