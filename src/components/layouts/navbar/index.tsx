import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data } = useSession();
  console.log(data);
  return (
    <nav className="p-2 bg-blue-500 text-white">
      <div className="container p-2 flex flex-row items-center justify-between">
        <h1 className="mx-2 text-xl font-semibold">Navbar</h1>
        <div className="mx-2">
          <a className="mx-2" href="/">
            Home
          </a>
          <a className="mx-2" href="/about">
            About
          </a>
          <a className="mx-2" href="/product">
            Products
          </a>
        </div>
        {data ? (
          <div className="flex flex-row items-center">
            {/* <p className="mx-2">Welcome {data.user?.name}</p> */}
            <a
              className="mx-2 bg-white rounded-full p-2 text-blue-500"
              href="/profile"
            >
              img
              {/* <img
                src="/opan.jpg"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              /> */}
            </a>
            <button
              className="bg-white text-blue-500 mx-2 p-2 rounded"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="bg-white text-blue-500 mx-2 p-2 rounded"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
