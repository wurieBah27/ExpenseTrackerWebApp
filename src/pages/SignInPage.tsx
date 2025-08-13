import { Button, Checkbox, FileInput, Label, TextInput } from "flowbite-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUpUser from "../features/user/useSignUpUser";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";

type SignUpForm = {
  name: string;
  password: string;
  email: string;
  repeatPassword: string;
};

const SignInPage = () => {
  const { createCustomer, isPending } = useSignUpUser();
  const [file, setFile] = useState<File | null>(null);

  /* form data */
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);

    const userData = {
      email: data.email,
      password: data.password,
      userData: {
        name: data.name,
        email: data.email,
        currencyPreference: "AED",
        createdAt: serverTimestamp(),
      },
      userProfile: file ?? {},
    };

    createCustomer(userData);
  };
  return (
    <div>
      <div className="py-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1676782583940-633240617c78?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-48 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="py-5 text-center text-2xl font-bold">
              Hello Welcome Back!
            </h3>
            <p className="text-center">
              Please create an Account now to track your daily bills!
            </p>
          </div>
        </div>
        <div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="userName"
                  color={errors?.name ? "failure" : "default"}
                >{`Name ${errors?.name ? "(required)*" : ""}`}</Label>
              </div>
              <TextInput
                id="userName"
                type="text"
                placeholder="John Doe"
                {...register("name", { required: true })}
                color={errors?.email ? "failure" : ""}
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email2"
                  color={errors?.email ? "failure" : "default"}
                >{`Email ${errors?.email ? "(required)*" : ""}`}</Label>
              </div>
              <TextInput
                id="email2"
                type="email"
                placeholder="name@flowbite.com"
                {...register("email", { required: true })}
                color={errors?.email ? "failure" : ""}
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password2"
                  color={errors?.password ? "failure" : "default"}
                >
                  {`Password ${errors?.password ? "(required)*" : ""}`}
                </Label>
              </div>
              <TextInput
                id="password2"
                type="password"
                {...register("password", { required: true })}
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="repeat-password"
                  color={errors?.repeatPassword ? "failure" : "default"}
                >
                  {" "}
                  {`${errors?.repeatPassword ? (errors?.repeatPassword.type === "validate" ? "(Password do not match 🚫!)" : "Password Confirmation (required)*") : "Password Confirmation"}`}
                </Label>
              </div>
              <TextInput
                id="repeat-password"
                type="password"
                {...register("repeatPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues()?.password ||
                    "(Password do not match 🚫!)",
                })}
                shadow
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <div>
                <Label className="mb-2 block" htmlFor="large-file-upload">
                  Upload a profile
                </Label>
                <FileInput
                  id="large-file-upload"
                  sizing="lg"
                  onChange={(e) => setFile(e?.target?.files?.[0] ?? null)}
                />
              </div>
              <div className="size-10 items-center justify-center overflow-hidden rounded-full bg-amber-800">
                <img
                  src="https://media.istockphoto.com/id/2191182540/photo/hospital-hallway-with-doctors-nurses-and-specialists-in-hospital-female-and-male-physicians.webp?a=1&b=1&s=612x612&w=0&k=20&c=UgH6iI6DzqHIMR6a67HRWcJFwajBETAbA6XLUz2db1I="
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link
                  to="/"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button type="submit" disabled={isPending}>
              Register new account
            </Button>
          </form>
        </div>

        <div>
          <p className="mt-10 text-gray-700">
            {" "}
            You already have an account ?{" "}
            <Link to="/login" className="text-blue-600 underline">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
