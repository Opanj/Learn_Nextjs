import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.scss";

function LoginPage() {
  const { push } = useRouter();
  const hendlerLogin = () => {
    push("/");
  };
  return (
    <div className={styles.colors}>
      <h1 className="text-2xl my-2 font-semibold">Login Page</h1>
      <form action="" className="flex flex-col gap-2">
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="excample@mail.com"
          className="border border-blue-600 rounded outline-blue-600 p-2"
        />

        <label htmlFor="password">Password {""} </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border border-blue-600 rounded outline-blue-600 p-2"
        />
        <button
          className="bg-blue-600 text-white py-2 px-3 rounded-xl"
          onClick={() => hendlerLogin()}
        >
          Login
        </button>
      </form>
      <p className="mt-2">
        Belum punya akun?
        <Link href={"/auth/register"} className="text-blue-500 hover:underline">
          {" "}
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
