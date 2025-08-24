import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { logout } from "~/shared/lib/auth";

import { type UserOut } from "~/types/client-schemas";
import { clsx } from "clsx";

type Props = {
  userData?: UserOut;
  className?: string;
};

export const UserLogo = ({ userData, className }: Props) => {
  const [name, surname] = userData?.name?.split(" ") || " ";
  const initials =
    `${name.charAt(0)}${surname ? surname.charAt(0) : ""}`.toUpperCase();

  const isAdmin = userData?.role === "admin";

  const handleLogOutClick = () => {
    logout();
  };

  const content = (
    <>
      <div className="lg:p-4">
        {isAdmin ? (
          <a
            className="mb-2 block rounded-lg px-3 py-2 transition hover:bg-white/5"
            href="/admin"
          >
            <p>Dashboard</p>
          </a>
        ) : null}
        <a
          className="block cursor-pointer rounded-lg px-3  py-2 transition hover:bg-white/5"
          onClick={handleLogOutClick}
        >
          <p>Log out</p>
        </a>
      </div>
      <div className="mt-12 p-0 lg:mt-0 lg:p-4">
        <div className="flex gap-4">
          <div
            className={clsx(
              "flex h-[40px] w-[40px] items-center justify-center rounded-[16px] bg-slate-800 text-gray-200",
              className,
            )}
          >
            {initials}
          </div>
          <div>
            <p className="font-semibold text-gray-200">{userData?.name}</p>
            <p className="text-xs text-gray-400">{userData?.email}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Popover className="hidden lg:block">
        <PopoverButton className="block cursor-pointer text-sm/6 font-semibold focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white">
          <div
            className={clsx(
              "flex h-[40px] w-[40px] items-center justify-center rounded-[16px] bg-slate-900 text-gray-200",
              className,
            )}
          >
            {initials}
          </div>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom end"
          className="divide-y divide-white/5 rounded-xl border-1 border-slate-700 bg-slate-900 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
        >
          {content}
        </PopoverPanel>
      </Popover>
      <div className="lg:hidden">{content}</div>
    </>
  );
};
