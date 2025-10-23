import { clsx } from "clsx";
import { Link } from "react-router";

import { type CategoryOutBase } from "~/types/client-schemas";

type Props = {
  category: CategoryOutBase;
};

export const CategoryCard = ({ category }: Props) => {
  const { id, name, image } = category;

  return (
    <Link to={`category/${id}`}>
      <div
        className={clsx(
          "flex items-start justify-between gap-6",
          "p-4",
          "bg-gray-800",
          "rounded-[16px]",
          "transition-shadow duration-300 ease-in-out",
          "cursor-pointer",
          "hover:shadow-[0_0_4px_rgba(255,255,255,0.3)]",
          "lg:gap-24",
        )}
      >
        <p>{name}</p>
        <div
          className={clsx(
            "overflow-hidden",
            "flex items-center justify-center",
            "h-[120px] w-[120px]",
            "shrink-0",
          )}
        >
          {image?.url ? (
            <img className="max-h-max" src={image?.url} alt={name} />
          ) : null}
        </div>
      </div>
    </Link>
  );
};
