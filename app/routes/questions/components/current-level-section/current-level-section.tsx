import { DataSection } from "~/shared/components/data-section/data-section";

type Props = {
  level: string;
  className?: string;
};

export const CurrentLevelSection = ({ className, level }: Props) => {
  return (
    <DataSection className={className}>
      <div className="flex flex-col justify-between gap-8">
        <h2>Текущий уровень</h2>
        <p className="self-end pr-4 pb-4 text-5xl">{level}</p>
      </div>
    </DataSection>
  );
};
