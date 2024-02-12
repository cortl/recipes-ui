import {
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useColorMode,
} from "@chakra-ui/react";

import type { Statistics } from "../../../types/statistics";

type StatsOverviewProps = Pick<
  Statistics,
  "averageRating" | "favoriteTag" | "numberOfTopRatings" | "totalRecipesMade"
>;

const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalRecipesMade,
  averageRating,
  numberOfTopRatings,
  favoriteTag,
}) => {
  const { colorMode } = useColorMode();

  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";

  return (
    <StatGroup
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      flexWrap="wrap"
      ml="auto"
      mr="auto"
      padding="5"
    >
      <Stat>
        <StatLabel>{"Total recipes made"}</StatLabel>
        <StatNumber>{totalRecipesMade}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>{"Average rating"}</StatLabel>
        <StatNumber>{averageRating}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>{"Number of top ratings"}</StatLabel>
        <StatNumber>{numberOfTopRatings}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>{"Favorite category"}</StatLabel>
        <StatNumber>{favoriteTag}</StatNumber>
      </Stat>
    </StatGroup>
  );
};

export { StatsOverview };
