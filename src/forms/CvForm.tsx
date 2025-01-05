import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { GrLinkPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./PersonalDetails";
import { useCvFromContext } from "@/context/CvForm.context";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Achievements";
import ProfileSummary from "./ProfileSummary";
import { useCV } from "@/api/cv.apis";
import LoadingButton from "@/components/LoadingButton";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { connectWallet, getNFTContract } from "@/api/contract.api";
import toast from "react-hot-toast";

const formSchema = z.object({
  loginMailId: z
    .string({
      required_error: "loginMaidId is required",
    })
    .max(50),
  nanoId: z.string().optional(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .max(50),
  location: z.string({
    required_error: "Location is required",
  }),
  profession: z.string({
    required_error: "Profession is required",
  }),
  email: z
    .string({
      required_error: "email is required",
    })
    .email({ message: "Invalid email format" }),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
  imageFile: z
    .union([z.instanceof(File, { message: "Image is required" }), z.string()])
    .refine(
      (value) =>
        value instanceof File ||
        (typeof value === "string" && value.length > 0),
      {
        message: "Image is required",
      }
    ),
  imageUrl: z.string().optional(),
  //------------------>>  step2 fields;
  class10SchoolName: z.string({ required_error: "School name is required" }),
  class10Board: z.string({ required_error: "10th board is required" }),
  class10Grade: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "10th grade is required",
      })
      .max(100, { message: "Grades cannot be greater than 100" })
      .min(0, { message: "Enter grades between 0 and 100" })
  ),

  class12CollegeName: z.string({
    required_error: "College name is required",
  }),
  class12Board: z.string({ required_error: "12th board is required" }),
  class12Grade: z.preprocess((val) => {
    const parsed = Number(val);
    return isNaN(parsed) || val === "" ? undefined : parsed;
  }, z.number({ required_error: "12th grade is required" }).max(100, "Grades can not be greater than 100").min(0, { message: "Enter grades between 0 to 100" })),
  // undergraduation
  underGraduateCollegeName: z.string({
    required_error: "undergraduation college is required",
  }),
  underGraduateDegreeName: z.string({
    required_error: "undergraduation Degree name is required",
  }),
  underGraduateGPA: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "undergraduation GPA till time is required",
      })
      .min(0, { message: "Enter GPA between 0 to 10" })
      .max(10, { message: "Enter GPA between 0 to 10" })
  ),

  underGraduateDuration:z.object({
  duration:z
        .object({
          from: z
            .union([z.string(), z.date()])
            .refine((val) => val && dayjs(val).isValid(), {
              message: "Start date is required",
            }),
          to: z
            .union([z.string(), z.date()])
            .refine((val) => val && dayjs(val).isValid(), {
              message: "End date is required",
            }),
        })
        .refine(
          (data) => {
            // Check if both from and to are valid and present
            const isFromValid = data.from && dayjs(data.from).isValid();
            const isToValid = data.to && dayjs(data.to).isValid();

            // Both dates must be valid
            return isFromValid && isToValid;
          },
          {
            message: "Both start date and end date are required.",
          }
        ),
      }),
  //postgraduation
  postGraduateCollegeName: z.string({
    required_error: "post graduation college is required",
  }),
  postGraduateDegreeName: z.string({
    required_error: "post graduation Degree name is required",
  }),
  postGraduateGPA: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "post graduation GPA till time is required",
      })
      .min(0, { message: "Enter GPA between 0 to 10" })
      .max(10, { message: "Enter GPA between 0 to 10" })
  ),

  postGraduateDuration:z.object({
    duration:z
          .object({
            from: z
              .union([z.string(), z.date()])
              .refine((val) => val && dayjs(val).isValid(), {
                message: "Start date is required",
              }),
            to: z
              .union([z.string(), z.date()])
              .refine((val) => val && dayjs(val).isValid(), {
                message: "End date is required",
              }),
          })
          .refine(
            (data) => {
              // Check if both from and to are valid and present
              const isFromValid = data.from && dayjs(data.from).isValid();
              const isToValid = data.to && dayjs(data.to).isValid();
  
              // Both dates must be valid
              return isFromValid && isToValid;
            },
            {
              message: "Both start date and end date are required.",
            }
          ),
        }),

  // step 3 fields  (Experience)
  Years_of_experience: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "Years of experience is required",
      })
      .min(0, { message: "Enter valid years of experience" })
      .max(100, { message: "Enter valid years of experience" })
  ),
  Experience: z.array(
    z.object({
      company_name: z
        .string({ required_error: "Company name is required" })
        .min(1, { message: "Company name is required" }),
      job_role: z
        .string({ required_error: "job role is required" })
        .min(1, "Job role is required"),
      duration: z
        .object({
          from: z
            .union([z.string(), z.date()])
            .refine((val) => val && dayjs(val).isValid(), {
              message: "Start date is required",
            }),
          to: z
            .union([z.string(), z.date()])
            .refine((val) => val || dayjs(val).isValid(), {
              message: "End date is required",
            })
        }),
        // }).refine(
        //   (data) => {
        //     const isFromValid = data.from && dayjs(data.from).isValid();
        //     const isToValid = !data.to || dayjs(data.to).isValid(); // Allow `to` to be optional
        //     return isFromValid && isToValid;
        //   },
        //   {
        //     message: "Start date is required, and end date must be valid if provided.",
        //   }
        // ),
      description: z
        .string({ required_error: "Work description is required" })
        .min(1, { message: "description is required" }),
    })
  ),

  // Step 4: Skills
  Skills: z
    .array(z.string())
    .min(1, { message: "Please select or enter at least one skill" })
    .max(5, { message: "You can only select 5 skills" })
    .default([]),
  // Step 5 : Achievements
  Awards: z.array(
    z.object({
      award_name: z
        .string({ required_error: "Award name is required" })
        .min(1, { message: "Award name is required" }),
      awarding_organization: z
        .string({ required_error: "Awarding organization is required" })
        .min(1, "Awarding organization is required"),
      // date_of_achievement: z
      //   .union([
      //     z.date().optional(),
      //     z.literal("").refine((val) => val === "", {
      //       message: "Date of achievement is required",
      //     }),
      //   ])
      //   .refine((data) => typeof data !== "string", {
      //     message: "Date of achievement is required",
      //   }),
      date_of_achievement: z
        .union([z.string(), z.date()])
        .refine((val) => val && dayjs(val).isValid(), {
          message: "Date of achievement is required and must be a valid date",
        }),
      description: z
        .string({ required_error: "A brief description is required" })
        .min(1, { message: "A brief description is required" }),
    })
  ),
  Courses: z.array(
    z.object({
      course_name: z
        .string({ required_error: "Course name is required" })
        .min(1, { message: "Course name is required" }),
      organization: z
        .string({ required_error: "Institution/organization is required" })
        .min(1, "Institution/organization is required"),
      duration: z
        .object({
          from: z
            .union([z.string(), z.date()])
            .refine((val) => val && dayjs(val).isValid(), {
              message: "Start date is required",
            }),
          to: z
            .union([z.string(), z.date()])
            .refine((val) => val && dayjs(val).isValid(), {
              message: "End date is required",
            }),
        })
        .refine(
          (data) => {
            // Check if both from and to are valid and present
            const isFromValid = data.from && dayjs(data.from).isValid();
            const isToValid = data.to && dayjs(data.to).isValid();

            // Both dates must be valid
            return isFromValid && isToValid;
          },
          {
            message: "Both start date and end date are required.",
          }
        ),
      description: z
        .string({ required_error: "Course description is required" })
        .min(1, { message: "Course description is required" }),
    })
  ),
  Projects: z.array(
    z.object({
      project_name: z
        .string({ required_error: "Project name is required" })
        .min(1, { message: "Project name is required" }),
      project_url: z.string().optional(),
      duration: z
        .object({
          from: z
            .union([z.string(), z.date()])
            .refine((val) => val && dayjs(val).isValid(), {
              message: "Start date is required",
            }),
          to: z
            .union([z.string(), z.date()])
            .refine((val) => val && dayjs(val).isValid(), {
              message: "End date is required",
            }),
        })
        .refine(
          (data) => {
            // Check if both from and to are valid and present
            const isFromValid = data.from && dayjs(data.from).isValid();
            const isToValid = data.to && dayjs(data.to).isValid();

            // Both dates must be valid
            return isFromValid && isToValid;
          },
          {
            message: "Both start date and end date are required.",
          }
        ),
      description: z
        .string({ required_error: "Project description is required" })
        .min(1, { message: "Project description is required" }),
    })
  ),

  // step 6: Profile Summary;
  profile_summary: z
    .string({ required_error: "Profile summary is required" })
    .min(1, { message: "Profile summary is required" })
    .max(300, {
      message: "Enter profile summary within 300 characters only",
    }),
  // verifications;

  // 1) personal Details verifications validations;
  personalVerifications: z.object({
    name: z.object(
      {
        isSelfAttested: z.boolean({
          message: "Name needs to be self-attested",
        }),
        // .refine((val) => val === false, {
        //   message: "Name needs to be self-attested",
        // }),
      },
      { message: "Name need to self attested" }
    ),
    email: z.object(
      {
        isSelfAttested: z.boolean({
          message: "Email needs to be self-attested",
        }),
        // .refine((val) => val === false, {
        //   message: "Email needs to be self-attested",
        // }),
      },
      { message: "Email need to self attested" }
    ),
    location: z.object(
      {
        isSelfAttested: z.boolean({
          message: "Location needs to be self-attested",
        }),
        // .refine((val) => val === false, {
        //   message: "location needs to be self-attested",
        // }),
      },
      { message: "Location needs to self attested" }
    ),
    profession: z.object(
      {
        isSelfAttested: z.boolean({
          message: "Profession needs to be self-attested",
        }),
        // .refine((val) => val === false, {
        //   message: "Profession needs to be self-attested",
        // }),
      },
      {
        message: "Profession needs to be self-attested",
      }
    ),
    imageUrl: z.object(
      {
        isSelfAttested: z.boolean({
          message: "Image needs to be self attested",
        }),
        // .refine((val) => val === false, {
        //   message: "Profile needs to be self-attested",
        // }),
      },
      {
        message: "Your photo needs to be self-attested",
      }
    ),
    phoneNumber: z.object(
      {
        isSelfAttested: z.boolean({
          message: "Phone number needs to be self attested",
        }),
        // .refine((val) => val === false, {
        //   message: "Phone number needs to be self-attested",
        // }),
      },
      {
        message: "Phone number needs to be self-attested",
      }
    ),
  }),
  // 2) Education verifications validations
  educationVerificationValidations: z.object({
    class10: z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required for class10",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of isSelfAttested, mailStatus, or proofs is required for class10",
        }
      ),
    class12: z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required for class12",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of isSelfAttested, mailStatus, or proofs is required for class10",
        }
      ),
    undergraduation: z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required for undergraduation",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of isSelfAttested, mailStatus, or proofs is required for class10",
        }
      ),
    postgraduation: z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required for postgraduation",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of isSelfAttested, mailStatus, or proofs is required for class10",
        }
      ),
  }),

  // 3) Experience verifications validations
  experienceVerificationsValidations: z.record(
    z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
  ),

  // 4) Skills verifications validations;
  skillsVerificationsValidations: z.record(
    z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
  ),

  // 5) award verifications validations;
  awardVerificationsValidations: z.record(
    z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
  ),

  // 6) course verifications validations;
  courseVerificationsValidations: z.record(
    z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
  ),

  //7) project verifications validations;
  projectVerificationsValidations: z.record(
    z
      .object(
        {
          isSelfAttested: z.boolean().optional(),
          mailStatus: z.string().optional(),
          proof: z.array(z.string()).optional(),
        },
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
      .refine(
        (data) =>
          data.isSelfAttested !== undefined ||
          data.mailStatus !== undefined ||
          (data.proof && data.proof.length > 0),
        {
          message:
            "At least one of selfAssested, mail to Issuer, or proofs is required",
        }
      )
  ),

  // 8) profile summary verification validations;
  profileSummarVerificationValidations: z.object({
    profile_summary: z.object(
      {
        isSelfAttested: z.boolean({
          message: "Profile summary needs to be self-attested",
        }),
        // .refine((val) => val === false, {
        //   message: "Name needs to be self-attested",
        // }),
      },
      { message: "Name need to self attested" }
    ),
  }),
});
// .refine((data) => data.imageFile || data.imageUrl, {
//   message: "Either imageFile or imageUrl is required",
//   path: ["imageFile"],
// });

export type CvFormDataType = z.infer<typeof formSchema>;

const CvForm = () => {
  const form = useForm<CvFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Skills: [],
      // personalDetailsVerifications: {
      //   name: {
      //     isSelfAttested: false,
      //   },
      //   email: {
      //     isSelfAttested: false,
      //   },
      //   profession: {
      //     isSelfAttested: false,
      //   },
      //   imageUrl: {
      //     isSelfAttested: false,
      //   },
      //   location: {
      //     isSelfAttested: false,
      //   },
      //   phoneNumber: {
      //     isSelfAttested: false,
      //   },
      // },
    },
  });

  const { step, setStep, account, setAccount } = useCvFromContext();
  const [profession, setProfession] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [txHash, setTxHash] = useState<string | null>(null);
  //const [account,setAccount] = useState<string | null>(null);
  // trying to set nanoId in localStorage;
  useEffect(() => {
    const nanoId = nanoid(16);
    const storedNanoId = localStorage.getItem("nanoId");
    if (!storedNanoId) {
      localStorage.setItem("nanoId", nanoId);
    }
  }, []);

  const [selectedQualification, setSelectedQualification] = useState<string>(
    () => {
      const storedQualification = localStorage.getItem(
        "educationSelectedQualifications"
      );
      return storedQualification ? storedQualification : "class10";
    }
  );
  console.log(selectedQualification);
  const { createCVInBackend, isLoading } = useCV();

  useEffect(() => {
    const savedData = localStorage.getItem(`step${step}CvData`);

    if (savedData) {
      let parsedData = JSON.parse(savedData);
      setProfession(parsedData.profession || null);
      if (parsedData?.Experience?.length > 0) {
        parsedData.Experience = parsedData.Experience.map((exp: any) => {
          exp.duration = {
            from: new Date(exp.duration.from),
            to: new Date(exp.duration.to),
          };
          return exp;
        });
      }
      if (parsedData?.Awards?.length > 0) {
        parsedData.Awards = parsedData.Awards.map((exp: any) => {
          exp.date_of_achievement = new Date(exp.date_of_achievement);
          return exp;
        });
      }
      if (parsedData?.Courses?.length > 0) {
        parsedData.Courses = parsedData.Courses.map((exp: any) => {
          exp.duration = {
            from: new Date(exp.duration.from),
            to: new Date(exp.duration.to),
          };
          return exp;
        });
      }
      if (parsedData?.Projects?.length > 0) {
        parsedData.Projects = parsedData.Projects.map((exp: any) => {
          exp.duration = {
            from: new Date(exp.duration.from),
            to: new Date(exp.duration.to),
          };
          return exp;
        });
      }
      console.log("it is parsed data", parsedData);
      form.reset(parsedData);
    }
  }, [step]);

  // const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.files) return null;
  //   const file = event.target.files[0];
  //   setImagePreview(file ? URL.createObjectURL(file) : null);
  // };

  const handleProfessionSelect = (profession: string) => {
    form.setValue("profession", profession);
  };

  // steps handler main;
  const stepsHandler = async () => {
    console.log("stepHandler runs");
    let fieldsToValidate: (keyof CvFormDataType)[] = [];
    if (step == 1) {
      const currentFormData = form.getValues();
      // form.setValue("phoneNumber", Number(currentFormData.phoneNumber));
      console.log(currentFormData);
      const currentStep = JSON.parse(
        localStorage.getItem("currentStep") || "1"
      );
      console.log("current step is", currentStep);
      if (currentStep === 1) {
        fieldsToValidate = [
          "name",
          "email",
          "profession",
          "location",
          "imageFile",
          "phoneNumber",
          // "personalDetailsVerifications",
          "personalVerifications.name.isSelfAttested" as any,
          "personalVerifications.email.isSelfAttested" as any,
          "personalVerifications.profession.isSelfAttested" as any,
          "personalVerifications.location.isSelfAttested" as any,
          "personalVerifications.imageUrl.isSelfAttested" as any,
          "personalVerifications.phoneNumber.isSelfAttested" as any,
          "personalVerifications.linkedinProfile.isSelfAttested" as any,
          "personalVerifications.twitterProfile.isSelfAttested" as any,
          "personalVerifications.telegramProfile.isSelfAttested" as any,
          "personalVerifications.instagramProfile.isSelfAttested" as any,
          "personalVerifications.githubProfile.isSelfAttested" as any,
          // "personalDetailsVerifications.email.isSelfAttested",
          // "personalDetailsVerifications.location.isSelfAttested",
          // "personalDetailsVerifications.profession.isSelfAttested",
          // "personalDetailsVerifications.phoneNumber.isSelfAttested",
          // "personalDetailsVerifications.imageUrl.isSelfAttested",

          // "personalDetailsVerifications.email.isSelfAttested",
        ];
      } else {
        fieldsToValidate = [
          "name",
          "email",
          "profession",
          "location",
          // "imageFile",
          "phoneNumber",
          // "personalDetailsVerifications",
          "personalVerifications.name.isSelfAttested" as any,
          "personalVerifications.email.isSelfAttested" as any,
          "personalVerifications.profession.isSelfAttested" as any,
          "personalVerifications.location.isSelfAttested" as any,
          "personalVerifications.imageUrl.isSelfAttested" as any,
          "personalVerifications.phoneNumber.isSelfAttested" as any,
          "personalVerifications.linkedinProfile.isSelfAttested" as any,
          "personalVerifications.twitterProfile.isSelfAttested" as any,
          "personalVerifications.telegramProfile.isSelfAttested" as any,
          "personalVerifications.instagramProfile.isSelfAttested" as any,
          "personalVerifications.githubProfile.isSelfAttested" as any,
          // "personalDetailsVerifications.email.isSelfAttested",
          // "personalDetailsVerifications.location.isSelfAttested",
          // "personalDetailsVerifications.profession.isSelfAttested",
          // "personalDetailsVerifications.phoneNumber.isSelfAttested",
          // "personalDetailsVerifications.imageUrl.isSelfAttested",

          // "personalDetailsVerifications.email.isSelfAttested",
        ];
      }
    } else if (step === 2) {
      const currentFormData = form.getValues();

      form.setValue("class10Grade", Number(currentFormData.class10Grade));
      if (currentFormData.class12Grade) {
        form.setValue("class12Grade", Number(currentFormData.class12Grade));
      }
      if (currentFormData.underGraduateGPA) {
        form.setValue(
          "underGraduateGPA",
          Number(currentFormData.underGraduateGPA)
        );
      }
      if (currentFormData.postGraduateGPA) {
        form.setValue(
          "postGraduateGPA",
          Number(currentFormData.postGraduateGPA)
        );
      }
      fieldsToValidate = [
        "class10SchoolName",
        "class10Board",
        "class10Grade",
        // verifications validations
        "educationVerificationValidations.class10" as any,
        // "class12CollegeName",
        // "class12Board",
        // "class12Grade",
        // "underGraduateCollegeName",
        // "underGraduateDegreeName",
        // "underGraduateGPA",
        // "postGraduateCollegeName",
        // "postGraduateDegreeName",
        // "postGraduateGPA",
      ];

      // dynamically set class 12 validations based on selectedQualification of client;
      if (
        selectedQualification === "class12" ||
        selectedQualification === "undergraduate" ||
        selectedQualification === "postgraduate"
      ) {
        fieldsToValidate.push(
          "class12CollegeName",
          "class12Board",
          "class12Grade",
          "educationVerificationValidations.class12" as any
        );
      }
      // dynamically set undergraduate validations based on selectedQualification of client;
      if (
        selectedQualification === "undergraduate" ||
        selectedQualification === "postgraduate"
      ) {
        fieldsToValidate.push(
          "underGraduateCollegeName",
          "underGraduateDegreeName",
          "underGraduateGPA",
          "underGraduateDuration",
          "educationVerificationValidations.undergraduation" as any
        );
      }

      // dynamically set postgraduate validations based on selectedQualification of client;
      if (selectedQualification === "postgraduate") {
        fieldsToValidate.push(
          "postGraduateCollegeName",
          "postGraduateDegreeName",
          "postGraduateGPA",
          "postGraduateDuration",
          "educationVerificationValidations.postgraduation" as any
        );
      }
    } else if (step === 3) {
      const currentFormData = form.getValues();

      // console.log("after save and next data", currentFormData);

      if (currentFormData.Experience && currentFormData.Experience.length > 0) {
        currentFormData.Experience.forEach((exp, index) => {
          fieldsToValidate.push(
            `Experience[${index}].company_name` as keyof CvFormDataType,
            `Experience[${index}].job_role` as keyof CvFormDataType,
            `Experience[${index}].duration` as keyof CvFormDataType,
            // `Experience[${index}].duration.from` as keyof CvFormDataType,
            // `Experience[${index}].duration.to` as keyof CvFormDataType,
            `Experience[${index}].description` as keyof CvFormDataType,
            `experienceVerificationsValidations[${exp.company_name}]` as any
          );
        });
      }

      fieldsToValidate.push("Years_of_experience");
    } else if (step === 4) {
      // console.log(selectedSkills);
      const currentFormData = form.getValues();
      // currentFormData.Skills = selectedSkills.length > 0 ? selectedSkills : [];
      // console.log(currentFormData);
      // currentFormData.skillsVerificationsValidations[]
      fieldsToValidate.push("Skills");
      currentFormData.Skills.forEach((skill) => {
        fieldsToValidate.push(
          `skillsVerificationsValidations[${skill}]` as any
        );
        // fieldsToValidate = ["Skills"];
      });
    } else if (step === 5) {
      const currentFormData = form.getValues();
      console.log("Step 5 validation calls");
      console.log(currentFormData);

      if (currentFormData.Awards && currentFormData.Awards.length > 0) {
        currentFormData.Awards.forEach((award, index) =>
          fieldsToValidate.push(
            `Awards.${index}.award_name` as keyof CvFormDataType,
            `Awards.${index}.awarding_organization` as keyof CvFormDataType,
            `Awards.${index}.date_of_achievement` as keyof CvFormDataType,
            `Awards.${index}.description` as keyof CvFormDataType,
            `awardVerificationsValidations[${award.award_name}]` as any
          )
        );
      }
      if (currentFormData.Courses && currentFormData.Courses.length > 0) {
        currentFormData.Courses.forEach((course, index) =>
          fieldsToValidate.push(
            `Courses.${index}.course_name` as keyof CvFormDataType,
            `Courses.${index}.organization` as keyof CvFormDataType,
            `Courses.${index}.duration` as keyof CvFormDataType,
            `Courses.${index}.description` as keyof CvFormDataType,
            `courseVerificationsValidations[${course.course_name}]` as any
          )
        );
      }
      if (currentFormData.Projects && currentFormData.Projects.length > 0) {
        currentFormData.Projects.forEach((project, index) =>
          fieldsToValidate.push(
            `Projects.${index}.project_name` as keyof CvFormDataType,
            `Projects.${index}.project_url` as keyof CvFormDataType,
            `Projects.${index}.duration` as keyof CvFormDataType,
            `Projects.${index}.description` as keyof CvFormDataType,
            `projectVerificationsValidations[${project.project_name}]` as any
          )
        );
      }
    } else if (step === 6) {
      fieldsToValidate = [
        "profile_summary",
        "profileSummarVerificationValidations.profile_summary" as any,
      ];
    }

    // validate step;
    const isValid = await form.trigger(fieldsToValidate);
    console.log("is valid ?? ", isValid);
    console.log("form erros are", form.formState.errors);
    if (!isValid) return; //stop if validation fails;

    const currentFormData = form.getValues();
    console.log(currentFormData);
    const updatedFormData = formData;
    if (step === 1) {
      // appending first step data;
      updatedFormData.append("name", currentFormData.name);
      updatedFormData.append("email", currentFormData.email);
      updatedFormData.append("location", currentFormData.location);
      updatedFormData.append(
        "phoneNumber",
        currentFormData.phoneNumber.toString()
      );
      if (profession) {
        updatedFormData.append("profession", currentFormData.profession);
      }
      if (currentFormData.imageFile) {
        updatedFormData.append("imageFile", currentFormData.imageFile);
      }

      // adding verifications;
    } else if (step === 6) {
      const nanoId = localStorage.getItem("nanoId") ?? "12345678";
      const loginMailId =
        sessionStorage.getItem("userMailId") ?? "ajeet@gmail.com";
      //const userName= sessionStorage.getItem("userName"); // Use a fallback string
      console.log("Form is getting submitted now");
      console.log(currentFormData);
      const finalAllData = {
        ...currentFormData,
        loginMailId,
        nanoId,
      };
      createCVInBackend(finalAllData);
    }

    localStorage.setItem(`step${step}CvData`, JSON.stringify(currentFormData));
    setFormData(updatedFormData);
    const currentStep = step + 1;
    // console.log(currentStep);
    if (step !== 6) {
      setStep((prev) => prev + 1);
      localStorage.setItem("currentStep", currentStep.toString());
    }
  };
  // console.log(form.formState.errors);
  // const onSubmit = (formDataJson: CvFormDataType) => {
  //   console.log("Submitted form data", formDataJson);
  // };

  // setting account address
  const getAccount = async () => {
    try {
      const acc = await connectWallet();
      if (acc) {
        setAccount(acc);
      }
      console.log("logged acc", acc);
    } catch (e) {
      console.log("error", e);
    }
  };

  // certificates registration on chain
  const mintNFT = async () => {
    const id = toast.loading("registration initiated. Please wait...");
    try {
      const hashArray: string[] = JSON.parse(
        localStorage.getItem("hashArray") || "[]"
      );
      console.log("hashArray", hashArray);
      const contractNFT = await getNFTContract();
      //const tx = await contract?.addStudentData("Ajeet",hashArray);
      const tx = await contractNFT?.safeMint(account, hashArray);
      tx.wait();
      //console.log("tx",tx);
      if (tx?.hash) {
        setTxHash(tx.hash);
        localStorage.setItem("txStatus","success");
        toast.dismiss(id);
        toast.success("certificate registered successfully");
      }
    } catch (err) {
      toast.dismiss(id);
      console.log("error", err);
      toast.error("something went wrong");
    }
  };

  // reset page data
  const resetPageHandler = (step:number):void=>{
    switch(step)
    {
      case 1:
        localStorage.removeItem("step1CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 2:
        localStorage.removeItem("step2CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 3:
        localStorage.removeItem("step3CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 4:
        localStorage.removeItem("step4CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 5:
        localStorage.removeItem("step5CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      default:
        toast.error("This page data not stored. Please refresh the page...");

    }
  }

  return (
    <div>
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col mb-5 md:mb-0"
      >
        {/* step=1 */}
        {step === 1 && (
          <PersonalDetails
            handleProfessionSelect={handleProfessionSelect}
            // setImagePreview={onImageChange}
            // imagePreview={imagePreview!}
            isImageUploading={isImageUploading}
            setIsImageUploading={setIsImageUploading}
            profession={profession!}
            setProfession={setProfession}
          />
        )}

        {step === 2 && (
          <Education
            selectedQualification={selectedQualification}
            setSelectedQualification={setSelectedQualification}
          />
        )}
        {step === 3 && <Experience />}
        {step === 4 && <Skills />}
        {step === 5 && <Achievements />}
        {step === 6 && <ProfileSummary />}
        {/* save and next button */}
        <div className="w-full mt-40 px-0 md:px-12 flex flex-col gap-5 sm:flex-row sm:w-full">
{step !== 1 && (
  <Button
    onClick={() => {
      setStep((prev) => prev - 1);
    }}
    type="button"
    variant={"outline"}
    className="w-auto sm:w-full"
  >
    <GrLinkPrevious className="mr-3" /> Go to Previous step
  </Button>
)}

{isLoading ? (
  <LoadingButton className="w-auto bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)]" />
) : (
  <div className="flex gap-2 w-full flex-col sm:flex-row">
    {
    step===6&&localStorage.getItem("txStatus")&&
    <Button
      type="button"
      onClick={stepsHandler}
      disabled={isImageUploading}
      className={`w-auto sm:w-full bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] hover:opacity-90 ${
        isImageUploading
          ? "cursor-not-allowed opacity-100"
          : "cursor-pointer"
      }`}
    >
      {step === 6 ? "Submit" : "Save and next"}
    </Button>
    }
    {step!==6&&
      <Button
      type="button"
      onClick={stepsHandler}
      disabled={isImageUploading}
      className={`w-auto sm:w-full bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] hover:opacity-90 ${
        isImageUploading
          ? "cursor-not-allowed opacity-100"
          : "cursor-pointer"
      }`}
    >
      Save and next
    </Button>
    }
    {step !== 6 ? (
      <Button
        type="button"
        onClick={() => resetPageHandler(step)}
        className="w-auto sm:w-full mt-2 sm:mt-0 "
      >
        Reset
      </Button>):
       ( !txHash ? (
        !account?
          <Button type="button" onClick={getAccount} className="w-auto sm:w-full active:translate-y-2">
            Connect 
            Wallet
          </Button>:
          <Button type="button" onClick={mintNFT} className="w-auto sm:w-full active:translate-y-2">
            Register Your CV on Blockchain
          </Button>
        ) : (
          <div className="flex justify-center items-center w-auto sm:w-full">
            <a
              className="w-full px-2 py-1 text-center items-center border rounded hover:bg-[#f8f9fa] font-semibold hover:opacity-90"
              href={`https://xdcscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Transaction
            </a>
          </div>
        )
    )}
  </div>
)}
</div>
      </form>
    </Form>
  </div>
  );
};

export default CvForm;
