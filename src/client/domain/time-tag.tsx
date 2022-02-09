import { Badge } from "@chakra-ui/react";
import { Tag } from "../components/tag";
import { TagCollection } from "../components/tag-collection";
interface ITimeTag {
  time: Recipe["time"];
}

const TimeTag: React.FC<ITimeTag> = ({ time }) => {
  const total = time.find((givenTime) => givenTime.label === "Total");

  if (total) {
    const { units } = total;
    const tags = [
      units.map((unit) => `${unit.measurement} ${unit.label} `).join(", "),
    ];

    return <TagCollection id="time" tags={tags} />;
  }

  return null;
};

export { TimeTag };
