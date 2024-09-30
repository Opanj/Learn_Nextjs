import { useSession } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession();
  // console.log();
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}

export default ProfilePage;
