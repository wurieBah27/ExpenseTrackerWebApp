import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { getUser } from "../features/user/useGetCurrentUser";
import type { User } from "./Navbar";

const UserProfile = () => {
  const { data } = getUser();
  const user = data.at(0) as User | undefined;

  const profileUrl = user?.profileUrl;
  const email = user?.email;
  console.log(data);
  return (
    <div>
      <div className="mx-auto flex size-40 items-center justify-center rounded-full border-4 border-white p-1">
        <img
          src={profileUrl}
          alt="User profile pic"
          className="inline-block h-full w-full rounded-full object-cover"
        />
      </div>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            defaultValue={email}
            shadow
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Full Name</Label>
          </div>
          <TextInput
            id="name"
            type="text"
            defaultValue={user?.name}
            shadow
            placeholder="John Doe"
          />
        </div>

        <div>
          <span className="mb-2 inline-block text-gray-900">Date Of Birth</span>
          <Datepicker labelTodayButton="Today" labelClearButton="Clear" />
        </div>

        <div className="mt-10 flex items-center gap-4">
          <Button type="submit">Log out</Button>
          <Button type="submit" color={"red"}>
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
