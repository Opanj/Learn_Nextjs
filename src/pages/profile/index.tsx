import { useSession } from "next-auth/react";

function ProfilePage() {
  const { data }: any = useSession();
  console.log(data);
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {data?.user?.fullname}</p>
      {/* <p>Email: {session?.user?.email}</p> */}
    </div>
  );
}

export default ProfilePage;
