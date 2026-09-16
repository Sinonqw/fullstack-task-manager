import type IButton from "../types/button";

const styles = {
  login:
    "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 active:bg-indigo-700",
  logout:
    "rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
};

const Button = ({onClick, type, children }:IButton) => {
  return (
    <button onClick={onClick} className={`cursor-pointer ${type === "login" ? styles.login : styles.logout}`}>{children}</button>
  );
};

export default Button;
