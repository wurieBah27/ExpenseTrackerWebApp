import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LogInUser } from "../features/user/useLoginOutUser";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn } = LogInUser();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    signIn({ email: data.email, password: data.password });
  };
  return (
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
            Please Sign-in to the App for tracking your daily bills
          </p>
        </div>
      </div>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" color={errors.email ? "failure" : ""}>
                Your email
              </Label>
            </div>
            <TextInput
              id="email2"
              type="email"
              color={errors.email ? "failure" : ""}
              placeholder="name@flowbite.com"
              required
              {...register("email")}
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password2"
                color={errors.password ? "failure" : ""}
              >
                Your password
              </Label>
            </div>
            <TextInput
              id="password2"
              type="password"
              color={errors.password ? "failure" : ""}
              shadow
              {...register("password")}
            />
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-gray-600 underline hover:underline dark:text-gray-500"
            >
              Forgot your password ?
            </Link>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>

      <div>
        <p className="mt-10 text-gray-700">
          {" "}
          You don't have an account ?{" "}
          <Link to="/sign-up" className="text-blue-600 underline">
            {" "}
            Sign-up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
