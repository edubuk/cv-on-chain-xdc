import React from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { useGetCv } from "@/api/cv.apis";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();


  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatedDate= date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    console.log("formated date",formatedDate)
    if(formatedDate=="Invalid Date")
      {
        return dateString;
      }
      return formatedDate;
  };
  
  const { cvData, isLoading } = useGetCv(id!);
  console.log(cvData);
  if (isLoading) {
    return(
    <div className="flex justify-center items-center">
      <h1 className="text-4xl font-bold text-[#006666]">Loading</h1>
    </div>
    );
  }

  if (!cvData) {
    return(
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold text-[#006666]">No CV Found</h1>
      </div>
      );
  }
  return (
    <div className=" min-h-screen flex justify-center p-6 font-sans overflow-hidden">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-lg p-8">
        {/* Header */}
        <header className="border-b border-gray-300 pb-4 mb-6 text-center">
          <h1 className="text-4xl font-bold text-[#006666]">
            {cvData.personalDetails.name}
            </h1>
          <div className="text-gray-600 mt-2 space-y-1 flex flex-col sm:flex-row sm:justify-center">
            <p className="flex space-x-2 items-center">
              <FaPhoneAlt className="text-xl text-[#006666]" />
              <span className="text-gray-800 hover:text-[#006666] font-bold">
              {cvData.personalDetails.phoneNumber}
              </span>
            </p>
            <p className="flex space-x-2 items-center px-2">
              <FaEnvelope className="text-xl text-[#006666]" />
              <a
                href={`mailto:${cvData.personalDetails.email}`}
                className="text-gray-800 hover:text-[#006666] font-bold"
              >
                {cvData.personalDetails.email}
              </a>
            </p>
            <p className="flex space-x-2 justify-center">
            <FaLinkedin className=" text-xl text-[#006666]" />
              <a
                href={cvData?.personalDetails?.linkedinProfile}
                className="text-gray-800 hover:text-[#006666] font-bold"
              >linkedIn
              </a>
              <FaGithub className="text-xl text-[#006666]" />
              <a
                href={cvData?.personalDetails?.githubProfile}
                className="text-gray-800 hover:text-[#006666] font-bold"
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
          <div className="mt-4 space-y-2">
            {cvData.education.postGraduateCollege &&
              cvData.education.postGraduateDegree &&
              cvData.education.postGraduateGPA &&
              <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 ">{cvData.education.postGraduateCollege}</h3>
                <i className="text-gray-600 font-serif">
                  {cvData.education.postGraduateDegree}
                </i>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-serif">{formatDate(cvData.education.postGraduateDuration?.duration.from!)} - {formatDate(cvData.education.postGraduateDuration?.duration.to!)}</p>
                <p className="text-gray-600 font-bold font-serif">GPA: {JSON.stringify(cvData.education.postGraduateGPA)}/10</p>
              </div>
            </div>}
            {cvData.education.underGraduateCollege &&
              cvData.education.underGraduateDegree &&
              cvData.education.underGraduateGPA &&
              <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 ">{cvData.education.underGraduateCollege}</h3>
                <i className="text-gray-600 font-serif">
                 {cvData.education.underGraduateDegree}
                </i>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-serif">{formatDate(cvData?.education?.underGraduateDuration?.duration?.from!)} - {formatDate(cvData?.education?.underGraduateDuration?.duration?.to!)}</p>
                <p className="text-gray-600 font-bold font-serif">GPA: {JSON.stringify(cvData.education.underGraduateGPA)}/10</p>
              </div>
            </div>}
            {cvData.education.class12College &&
                  cvData.education.class12Board &&
                  cvData.education.class12Grade &&
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 ">
                  {cvData.education.class12College}
                </h3>
                <i className="text-gray-600 font-serif">Class-XII | {cvData.education.class12Board}</i>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-bold font-serif">{JSON.stringify(cvData.education.class12Grade)}</p>
              </div>
            </div>
            }
            {cvData.education.class10School &&
              cvData.education.class10Board &&
              cvData.education.class10Grade &&
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 ">
                  {cvData.education.class10School}
                </h3>
                <i className="text-gray-600 font-serif">Class-X | {cvData.education.class10Board}</i>
              </div>
              <div className="text-right">
                <p className="text-gray-600 font-bold font-serif">{JSON.stringify(cvData.education.class10Grade)}</p>
              </div>
            </div>
             }
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-start items-start gap-2 flex-wrap">
          {cvData.skills.length > 0 &&
          cvData.skills.map((skill,i)=>(
            <div key={i} className="flex justify-center items-center border p-2 rounded border-gray-300">
              <p className="text-md font-semibold text-[#006080]">{skill}</p>
            </div>
          ))
          }
          </div>
          </div>
        </section>

        {/* Experience Section */}
        {cvData?.experience?.length>0&&
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Experience
          </h2>
          {cvData.experience.map((exp,index)=>(
          <div className="mt-4" key={index}>
            <div className="flex justify-between items-center">
              <div className="flex justify-center flex-col items-start gap-1">
              <h3 className="font-bold text-gray-900">{exp.company_name}</h3>
              <i>{exp.job_role}</i>
              </div>
              <p className="text-gray-600 text-right">{formatDate(exp.duration.from)} - {formatDate(exp.duration.to)} </p>
            </div>
            <ul className="list-disc list-inside text-gray-600 mt-2 pl-6">
            {
              exp.description!==""&& 
              exp.description.split(".")
              .filter((point)=>point.trim()!=="")
              .map((point,i)=>
                (
                  <li key={i}>{point.endsWith(".") ? point : `${point}.`}</li>
                ))
            }
            </ul>
          </div>
          ))}

        </section>
}

        {/* Projects Section */}
        {cvData.achievements.projects.length > 0&&
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Projects
          </h2>
          {cvData.achievements.projects.map((project,i)=>(
            <div key={i} className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#006666]">{project.project_name}</h3>
                <p className="text-gray-600 text-right">
                  {formatDate(project.duration.from)} - {formatDate(project.duration.to)}
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-600 mt-2 pl-6">
                {
                  project.description.split(". ")
                  .filter((point)=>point.trim()!=="")
                  .map((point,i)=>(
                  <li key={i}>{point.endsWith(".") ? point : `${point}.`}</li>
                  ))
                }
              </ul>
            </div>
          </div>))}
        </section>
        }
        {/* Courses Section */}
        {cvData.achievements.courses?.length>0 &&
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Courses
          </h2>
          {cvData.achievements.courses.map((course,i)=>(
            <div key={i} className="mt-4 space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#006666]">{course.course_name} | <i className="text-gray-600">{course.organization}</i></h3>
                <p className="text-gray-600 text-right">
                  {formatDate(course.duration.from)} - {formatDate(course.duration.to)}
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-600 mt-2  pl-6">
                {
                  course.description.split(". ")
                  .filter((point)=>point.trim()!=="")
                  .map((point,i)=>(
                  <li key={i}>{point.endsWith(".") ? point : `${point}.`}</li>
                  ))
                }
              </ul>
            </div>
          </div>))}
        </section>
        }
        {/* Award Section */}
        {cvData.achievements.awards.length>0 &&
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#006666] border-b border-gray-300 pb-2">
            Award & Achievements
          </h2>
          {cvData.achievements.awards.map((award,i)=>(
            <div key={i} className="mt-4 space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#006666]">{award.award_name} | <i className="text-gray-600">{award.awarding_organization}</i></h3> 
                <p className="text-gray-600 text-right">
                  {formatDate(award.date_of_achievement)}
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 pl-6">
                {
                  award.description.split(". ")
                  .filter((point)=>point.trim()!=="")
                  .map((point,i)=>(
                  <li key={i}>{point.endsWith(".") ? point : `${point}.`}</li>
                  ))
                }
              </ul>
            </div>
          </div>))}
        </section>
        }
      </div>
    </div>
  );
};

export default Resume;
