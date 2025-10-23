import { logout } from "~/shared/lib/auth";

import { type UserOut } from "~/types/client-schemas";
import { clsx } from "clsx";
import { Popover } from "~/shared/components/popover/popover";

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
      <div className="flex flex-col lg:p-4">
        {isAdmin ? (
          <a
            className={clsx(
              "block",
              "mb-2 px-3 py-4",
              "text-lg",
              "rounded-lg",
              "transition",
              "hover:bg-white/5",
              "lg:py-2 lg:text-base/7",
            )}
            href="/admin"
          >
            <p>Панель администратора</p>
          </a>
        ) : null}
        <a
          className={clsx(
            "block",
            "px-3 py-4",
            "text-lg",
            "rounded-lg",
            "transition",
            "cursor-pointer",
            "hover:bg-white/5",
            "lg:py-2 lg:text-base/7",
          )}
          onClick={handleLogOutClick}
        >
          <p>Выйти из системы</p>
        </a>
      </div>
      <div className="mt-12 p-0 lg:mt-0 lg:p-4">
        <div className="flex gap-4">
          <div
            className={clsx(
              "flex items-center justify-center",
              "h-[40px] w-[40px]",
              "text-gray-200",
              "bg-slate-800",
              "rounded-[16px]",
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

  const button = () => (
    <div
      className={clsx(
        "flex items-center justify-center",
        "h-[40px] w-[40px]",
        "text-gray-200",
        "bg-slate-900",
        "rounded-[12px]",
        className,
      )}
    >
      {initials}
    </div>
  );

  return (
    <>
      <Popover className="hidden lg:block" button={button}>
        {content}
      </Popover>
      <div className="lg:hidden">{content}</div>
    </>
  );
};
