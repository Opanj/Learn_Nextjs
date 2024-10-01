import { useRouter } from "next/router";
import Footer from "../footer";
// import Navbar from "../navbar";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";

// menggunakan dynamic component next
const Navbar = dynamic(() => import("../navbar"), { ssr: false });
// ini akan berguna ketika component dan file sudah besar

type AppShellProps = {
  children: React.ReactNode;
};

// set font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// untuk hendel navbar dan footer
const disableNavbar = ["/auth/login", "/auth/register", "/404"];
const disableFooter = ["/auth/login", "/auth/register", "/404"];

function AppShell(props: AppShellProps) {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main className={poppins.className}>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
      {/* {!disableFooter.includes(pathname) && <Footer />} */}
    </main>
  );
}

export default AppShell;
