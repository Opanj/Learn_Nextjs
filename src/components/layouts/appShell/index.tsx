import { useRouter } from "next/router";
import Footer from "../footer";
import Navbar from "../navbar";

type AppShellProps = {
  children: React.ReactNode;
};

// untuk hendel navbar dan footer
const disableNavbar = ["/auth/login", "/auth/register", "/404"];
const disableFooter = ["/auth/login", "/auth/register", "/404"];

function AppShell(props: AppShellProps) {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <>
      {!disableNavbar.includes(pathname) && <Navbar />}
      <main>{children}</main>
      {/* {!disableFooter.includes(pathname) && <Footer />} */}
    </>
  );
}

export default AppShell;
