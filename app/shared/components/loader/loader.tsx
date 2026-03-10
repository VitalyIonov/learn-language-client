import { cn } from "~/shared/lib/utils";

type Props = {
  className?: string;
};

export const Loader = ({ className }: Props) => {
  return (
    <video
      className={cn("h-[120px] w-[120px]", className)}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/images/cow-drink-milk.webm" type="video/webm" />
    </video>
  );
};
