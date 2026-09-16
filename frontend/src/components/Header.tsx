import Button from "./Button";
import { Link } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Header = () => {
  const links = [
    { link: "/monday", title: "Monday" },
    { link: "/tuesday", title: "Tuesday" },
    { link: "/wednesday", title: "Wednesday" },
    { link: "/thursday", title: "Thursday" },
    { link: "/friday", title: "Friday" },
    { link: "/saturday", title: "Saturday" },
    { link: "/sunday", title: "Sunday" },
  ];

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const [activeDay, setActiveDay] = useState("Monday");

  return (
    <header className="absolute z-100 w-full flex p-5 justify-around items-center bg-gray-500">
      <nav className="flex gap-4">
        {links.map((i) => (
          <Link
            className={`${i.title === activeDay ? "text-indigo-400" : "text-slate-300"} text-sm font-mediumtransition-colors hover:text-indigo-400 active:text-indigo-300`}
            key={i.title}
            to={i.link}
            onClick={() => setActiveDay(i.title)}
          >
            {i.title}
          </Link>
        ))}
      </nav>

      <div className="flex gap-5">
        {!isAuthenticated ? (
          <Button onClick={() => loginWithRedirect()} type="login">
            LOG IN
          </Button>
        ) : (
          <Button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
            type="logout"
          >
            LOG OUT
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
