import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./login.module.scss";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  // memanggil callbackurl
  const callbackUrl: any = query.callbackUrl || "/";

  const hendleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    // validasi login user
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });
      // melakukan pengecekan
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or passw is incorrect");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Email or passwword is incorrect");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl my-2 font-semibold">Login Page</h1>
      <form
        action=""
        onSubmit={hendleSubmit}
        className="flex flex-col gap-2 p-4 rounded"
      >
        {error && <p className={styles.login}>{error}</p>}
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="excample@mail.com"
          required
          className="border border-blue-600 rounded outline-blue-600 p-2"
        />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          className="border border-blue-600 rounded outline-blue-600 p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 py-2 px-3 rounded-xl border"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <button
        className="bg-blue-600 py-2 px-3 rounded-xl"
        onClick={() =>
          signIn("google", {
            callbackUrl,
            redirect: false,
          })
        }
      >
        Login with Google
      </button>
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

export default LoginView;
