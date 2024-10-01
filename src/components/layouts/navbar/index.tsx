import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Script from "next/script";
// penjelasan script: misalkan kita emmanggil skrip dari luar cthnya google analytics dll

function Navbar() {
  const { data }: any = useSession();
  // console.log(data);
  return (
    <nav className="p-2 bg-blue-500 text-white">
      <div className="container p-2 flex flex-row items-center justify-between">
        <h1 className="mx-2 text-xl font-semibold" id="title"></h1>
        <Script id="script-title" strategy="lazyOnload">
          {`document.getElementById("title").innerHTML = 'Navbar'`}
        </Script>
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
            {data
              ? data.user?.role === "admin" && <a href="/admin">Admin</a>
              : null}
            <a
              className="mx-2 bg-white rounded-full text-blue-500"
              href="/profile"
            >
              <Image
                src={data.user?.image || "/avatar.png"}
                alt={data.user?.fullname}
                width={40}
                height={40}
                className="rounded-full"
              />
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
