import { Link } from "react-router";

import { type CategoryOutBase } from "~/types/client-schemas";

type Props = {
  category: CategoryOutBase;
};

export const CategoryCard = ({ category }: Props) => {
  const { id, name, image } = category;

  return (
    <Link to={`category/${id}`}>
      <div className="flex cursor-pointer items-start justify-between gap-24 rounded-[16px] bg-gray-800 p-4 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_4px_rgba(255,255,255,0.3)]">
        <p>{name}</p>
        <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-[50%]">
          {image?.imageUrl ? (
            <img className="max-h-max" src={image?.imageUrl} alt={name} />
          ) : null}
        </div>
      </div>
    </Link>
  );
};
