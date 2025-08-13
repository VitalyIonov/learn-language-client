import { DataSection } from "~/shared/components/data-section/data-section";

import { Row } from "./elements/row/row";

type Props = {
  className?: string;
};

const mockData = [
  {
    wordName: "example",
    level: "A1",
    progress: 50,
    todayProgress: 10,
  },
  {
    wordName: "test",
    level: "B2",
    progress: 70,
    todayProgress: 20,
  },
  {
    wordName: "sample",
    level: "C1",
    progress: 30,
    todayProgress: 5,
  },
  {
    wordName: "demo",
    level: "A2",
    progress: 90,
    todayProgress: 15,
  },
];

export const WordStatistics = ({ className }: Props) => {
  return (
    <DataSection className={className}>
      {mockData.map((item, index) => {
        const isLastItem = index === mockData.length - 1;

        return (
          <Row
            key={index}
            wordName={item.wordName}
            isLast={isLastItem}
            level={item.level}
            progress={item.progress}
            todayProgress={item.todayProgress}
          />
        );
      })}
    </DataSection>
  );
};
