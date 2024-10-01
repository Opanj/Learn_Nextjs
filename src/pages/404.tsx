import Image from "next/image";

function NotFound() {
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen font-bold text-3xl text-slate-500">
      {/* <img src="/notFound.png" alt="404" /> */}
      <Image src="/notFound.png" alt="404" width={600} height={600} />
      <h1>404 | Page Not Found</h1>
    </div>
  );
}

export default NotFound;
