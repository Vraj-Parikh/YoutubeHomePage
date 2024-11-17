import logo from "../../assets/logo.png";
import {
  Menu,
  BellIcon,
  Upload,
  User,
  Search,
  Mic,
  ArrowLeft,
} from "lucide-react";
import Button from "../utilility/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSidebarContext } from "../../contexts/SidebarContext";
const Header = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex justify-between gap-10 lg:gap-20 pt-2 mb-6 mx-2 sm:mx-4">
      <div
        className={twMerge(
          "flex gap-2 sm:gap-4 shrink-0 items-center",
          showFullWidthSearch ? "hidden" : "flex"
        )}
      >
        <Button variant="ghost" size="icon">
          <Menu size={40} />
        </Button>
        <a>
          <img src={logo} alt="logo" className="block h-10" />
        </a>
      </div>
      <form
        className={twMerge(
          "flex-grow sm:flex items-center justify-center gap-2 hidden",
          showFullWidthSearch ? "flex" : "hidden"
        )}
      >
        {showFullWidthSearch && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex-grow max-w-xl flex placeholder:font-semibold shrink">
          <input
            type="text"
            placeholder="Search"
            className="block px-4 flex-1 shadow-inner shadow-secondary py-1 text-lg rounded-l-2xl border focus:border-blue-500 outline-none shrink"
          />
          <Button className="px-5 rounded-none shrink-0 rounded-r-2xl">
            <Search />
          </Button>
        </div>
        <Button
          variant="default"
          size="icon"
          className="shrink-0"
          type="button"
        >
          <Mic />
        </Button>
      </form>
      <div
        className={twMerge(
          "flex items-center flex-shrink-0 md:gap-2",
          showFullWidthSearch ? "hidden" : "flex"
        )}
      >
        <div className="flex sm:hidden shrink-0">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setShowFullWidthSearch(true)}
          >
            <Search />
          </Button>
          <Button variant="default" size="icon" type="button">
            <Mic />
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>
        <Button variant="ghost" size="icon">
          <BellIcon />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default Header;

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} className="h-6" />
      </a>
    </div>
  );
}
