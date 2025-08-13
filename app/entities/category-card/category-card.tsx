import { Link } from "react-router";

import { type CategoryOut } from "~/types/client-schemas";

type Props = {
  category: CategoryOut;
};

export const CategoryCard = ({ category }: Props) => {
  const { id, name } = category;

  return (
    <Link to={`category/${id}`}>
      <div className="flex cursor-pointer items-start justify-center gap-24 rounded-[16px] bg-gray-800 p-4 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_4px_rgba(255,255,255,0.3)]">
        <p>{name}</p>
        <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-[50%]">
          <img className="max-h-max" src="/images/img.png" alt={name} />
        </div>
      </div>
    </Link>
  );
};
