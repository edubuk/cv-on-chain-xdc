import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFieldArray, useFormContext } from "react-hook-form";

import ExperienceFields from "./ExperienceFields";
import { Input } from "@/components/ui/input";

const Experience = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Experience",
  });

  return (
    <>
      <div className="flex flex-col px-5 md:px-10 gap-2  h-full overflow-hidden">
        <div className="">
          <h1 className="text-2xl font-semibold">Experience</h1>
          <FormDescription className="text-sm mb-4">
            You can add multiple experience
          </FormDescription>

          <FormField
            name="Years_of_experience"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many years of experience do you have?</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter years of experience"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="Experience"
          control={control}
          render={() => (
            <FormItem>
              {fields.map((_, index) => (
                <ExperienceFields
                  key={index}
                  fields={fields}
                  index={index}
                  removeExperienceFields={(index) => remove(index)}
                />
              ))}
            </FormItem>
          )}
        />

        <div className={`${fields.length === 0 ? "h-64" : "h-fit"}`}>
          <Button
            type="button"
            className="bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] hover:opacity-90 w-fit px-10"
            onClick={() =>
              append({
                company_name: "",
                job_role: "",
                duration: "",
                description: "",
              })
            }
          >
            Add Experience
          </Button>
        </div>
      </div>
    </>
  );
};

export default Experience;
