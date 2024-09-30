import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./register.module.scss";

function RegisterView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const hendleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value,
    };

    const result = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // melakukan pengecekan response
    if (result.status === 200) {
      event.target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(result.status === 400 ? "Email already exist" : "");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl my-2 font-semibold">Register Page</h1>
      <form
        action=""
        onSubmit={hendleSubmit}
        className="flex flex-col gap-2 border p-4 rounded"
      >
        {error && <p className={styles.register}>{error}</p>}
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="excample@mail.com"
          required
          className="border border-blue-600 rounded outline-blue-600 p-2"
        />
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="John Doe"
          required
          className="border border-blue-600 rounded outline-blue-600 p-2"
        />
        <label htmlFor="password">Password {""} </label>
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
          className="bg-blue-600 text-white py-2 px-3 rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      <p className="mt-2">
        Sudah punya akun?
        <Link href={"/auth/login"} className="text-blue-500 hover:underline">
          {" "}
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterView;
