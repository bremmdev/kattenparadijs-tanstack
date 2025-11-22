import { Link } from "@tanstack/react-router";
import Avatars from "@/components/Cat/Avatars";
import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header className="border-b-2 border-theme-light bg-white">
      <div className="flex flex-col max-w-page-content mx-auto px-8 py-2 sm:px-12 sm:py-4 sm:flex-row">
        <div className="flex justify-center">
          <Link to="/">
            <img src={logo} alt="logo" width={36} height={36} />
          </Link>
          <Link to="/">
            <h1
              className={`font-handwriting text-theme text-3xl tracking-wider ml-4 translate-y-1`}
            >
              Kattenparadijs
            </h1>
          </Link>
        </div>
        <Avatars />
      </div>
    </header>
  );
};

export default Header;
