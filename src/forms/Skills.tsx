import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { AlertCircle, X } from "lucide-react";
import { useCvFromContext } from "@/context/CvForm.context";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedVerification } from "@/components/ui/AnimatedVerification";
const skills: string[] = [
  "Project management",
  "Software proficiency",
  "Technical writing",
  "Creativity",
  "Data analysis",
  "Leadership",
  "Problem solving",
  "Adaptability",
  "Teamwork",
  "Time management",
  "Cybersecurity",
  "Web development",
  "Ui/Ux design",
];

// type VerificationType = {
//   isSelfAttested: boolean;
//   proof: string;
//   mailStatus: string;
// };

// type SkillsVerificationType = {
//   [key: string]: VerificationType;
// };

const Skills = () => {
  const {
    selectedSkills,
    setSelectedSkills,
    skillError,
    setSkillError,
    showSkillError,
    setSkillShowError,
    skillsVerification,
    setSkillsVerification,
  } = useCvFromContext();
  const [typerSkill, setTyperSkill] = useState<string>("");
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
  const { control, setValue, getValues } = useFormContext();
  // const [skillsVerification, setSkillsVerification] =
  //   useState<SkillsVerificationType>({});
  // console.log(skillError);
  console.log("skills verification", skillsVerification);
  console.log("form object", getValues());
  const { skillsVerificationsValidations: storedVerification } = getValues();

  const selectSkillsHandler = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      if (selectedSkills.length >= 5) {
        setSkillShowError(true);
        setSkillError("You can only select 5 skills");
        return;
      }
      setSelectedSkills((prev) => [...prev, skill]);
      setValue("Skills", [...selectedSkills, skill]);
      const updatedSKillsVerifications = {
        ...skillsVerification,
        [skill]: {
          isSelfAttested: false,
          proof: [],
          mailStatus: "",
        },
      };
      // setting skills verification object;
      setSkillsVerification(updatedSKillsVerifications);
      // setSkillsVerification((prev) => ({
      //   ...prev,
      //   [skill]: {
      //     isSelfAttested: false,
      //     proof: "",
      //     mailStatus: "",
      //   },
      // }));
      setValue("skillsVerifications", updatedSKillsVerifications);
      return;
    }

    setSelectedSkills((prev) =>
      prev.filter((prevSkill) => prevSkill !== skill)
    );
    const filteredSkills = selectedSkills.filter(
      (prevSkill) => prevSkill !== skill
    );
    setValue("Skills", filteredSkills);
    setSkillsVerification((prev) => {
      let updatedSkillsVerifications = { ...prev };
      delete updatedSkillsVerifications[skill];
      setValue("skillsVerifications", updatedSkillsVerifications);
      return updatedSkillsVerifications;
    });
  };

  const removeSkillHandler = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.filter((prevSkill) => prevSkill !== skill)
    );
    const filteredSkills = selectedSkills.filter(
      (prevSkill) => prevSkill !== skill
    );
    if (filteredSkills.length < 5) {
      setSkillShowError(false);
      setSkillError("");
    }
    setValue("Skills", filteredSkills);
    // remove from the sKillsVerificationObject;
    setSkillsVerification((prev) => {
      let updatedSkillsVerification = { ...prev };
      delete updatedSkillsVerification[skill];
      setValue("skillsVerifications", updatedSkillsVerification); //removing skills from the skillsVerifications object on the form object;
      return updatedSkillsVerification;
    });
  };

  // handling typing skill / custom skills;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setIsKeyDown(true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSkills.length >= 5) {
        setTyperSkill("");
        setSkillShowError(true);
        setSkillError("You can only add 5 skills");
        return;
      }

      setSelectedSkills((prev) => [...prev, typerSkill]);
      setValue("Skills", [...selectedSkills, typerSkill]);
      const updatedSkillsVerifications = {
        ...skillsVerification,
        [typerSkill]: {
          isSelfAttested: false,
          proof: [],
          mailStatus: "",
        },
      };
      // setting skills verification object;
      setSkillsVerification(updatedSkillsVerifications);
      setValue("skillsVerifications", updatedSkillsVerifications);
      setIsKeyDown(false);
      setTyperSkill("");
    }
  };

  const typeSkillClickHanlder = () => {
    if (selectedSkills.length >= 5) {
      setSkillShowError(true);
      setSkillError("You can only add 5 skills");
      return;
    }
    setSelectedSkills((prev) => [...prev, typerSkill]);
    setValue("Skills", [...selectedSkills, typerSkill]);
    const updatedSkillsVerifications = {
      ...skillsVerification,
      [typerSkill]: {
        isSelfAttested: false,
        proof: [],
        mailStatus: "",
      },
    };
    // setting skills verification object;
    setSkillsVerification(updatedSkillsVerifications);
    setValue("skillsVerifications", updatedSkillsVerifications);
    setTyperSkill("");
  };
  console.log("stored skills verifications", storedVerification);
  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-2 px-5 sm:px-10 mt-4">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <h1 className="text-xl font-normal">
          ( Select or add your top 5 skills )
        </h1>
      </div>

      <div className="flex flex-wrap  mt-4 px-2 sm:px-10 gap-5">
        {skills.map((skill) => (
          <Button
            type="button"
            key={skill}
            className={`px-2 sm:px-5 py-1 shadow-md bg-white text-black border border-[#FA9110] hover:bg-white hover:text-black text-sm sm:text-md font-semibold${
              selectedSkills.includes(skill)
                ? "border-green-500 text-green-600 hover:border-green-500 hover:text-green-600"
                : "border-[#FA9110]"
            }`}
            onClick={() => selectSkillsHandler(skill)}
          >
            {selectedSkills.includes(skill) && (
              <IoMdCheckmark className="text-lg mr-2 mt-1" />
            )}
            {/* <IoMdCheckmark className="text-lg mr-2 mt-1" /> */}
            {skill}
          </Button>
        ))}
      </div>

      <div className="flex px-2 sm:px-10">
        <div className="border p-1 rounded-md flex flex-wrap w-full gap-2">
          {selectedSkills.length > 0 &&
            selectedSkills.map((skill) => (
              <Button
                key={skill}
                type="button"
                className="px-2 sm:px-4  bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] flex items-center text-xs sm:text-base"
              >
                {skill}
                <X
                  type="button"
                  onClick={() => removeSkillHandler(skill)}
                  size={20}
                  strokeWidth={2}
                  className="ml-2 mt-1"
                />
              </Button>
            ))}
          {/* <Button className="px-4  bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)]   flex items-center text-base">
            test
            <X size={20} strokeWidth={2} className="ml-2 mt-1" />
          </Button> */}
          <div className="relative">
            <FormField
              name="Skills"
              control={control}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      value={typerSkill}
                      onChange={(e) => setTyperSkill(e.target.value)}
                      className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex-1  min-w-48"
                      placeholder={`Add custom skills`}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                  {typerSkill && (
                    <div
                      onClick={typeSkillClickHanlder}
                      className={`border border-zinc-300 absolute top-full left-5 px-5  max-w-xl w-full rounded-md cursor-pointer ${
                        isKeyDown ? "bg-[#F4F4F5]" : "bg-white"
                      } py-2  mt-2 overflow-hidden text-wrap z-10`}
                    >
                      <span className="">{typerSkill}</span>
                    </div>
                  )}
                  <FormMessage />
                  {showSkillError && (
                    <p className="text-[0.9rem] font-medium text-red-500">
                      {skillError}
                    </p>
                  )}
                </FormItem>
              )}
            />
            {/* <Input
              value={typerSkill}
              onChange={(e) => setTyperSkill(e.target.value)}
              className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex-1  min-w-48"
              placeholder={`Add custom skills`}
              onKeyDown={handleKeyDown}
            />
            {typerSkill && (
              <div
                className={`border border-zinc-300 absolute top-full left-5 px-5  max-w-xl w-full rounded-md ${
                  isKeyDown ? "bg-[#F4F4F5]" : "bg-white"
                } py-2  mt-2 overflow-hidden text-wrap z-10`}
              >
                <span className="">{typerSkill}</span>
              </div>
            )} */}
          </div>
        </div>
      </div>
      {/* alert instruction */}
      <div className="px-2 sm:px-10">
        <Alert className="">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention! You need to verify your skills</AlertTitle>
          <AlertDescription>
            Please self-attest, upload the required proof, or send an email to
            the issuer for verification.
          </AlertDescription>
        </Alert>
      </div>
      {/* Animated skills section */}
      <div className="flex flex-col gap-4 sm:px-2">
        {selectedSkills.map((skill, i) => (
          <FormField
            name={`skillsVerificationsValidations[${skill}]`}
            control={control}
            render={() => (
              <FormItem className="">
                <AnimatedVerification
                  key={i}
                  firstButtonText={skill}
                  field={skill}
                  storedVerifications={storedVerification}
                  verificationObject={skillsVerification}
                  validationStep="skillsVerificationsValidations"
                  setterVerificationObject={setSkillsVerification}
                  verificationStep="skillsVerifications"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
