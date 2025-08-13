import { useParams } from "react-router";

import { Question } from "~/entities/question/question";

export default function Questions() {
  const { id } = useParams();

  return (
    <div>
      <Question categoryId={Number(id)} />
    </div>
  );
}
