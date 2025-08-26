import { getUserData } from "@/actions/getUser";

export default async function DashboardPage() {
  let user;

  try {
    user = await getUserData();
    console.log(user);
  } catch (error) {
    return <div className="text-red-500">Unauthorized: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <p>Industry: {user.name}</p>
      <p>Skills: {user.email}</p>
      <p>{user.id}</p>
    </div>
  );
}
