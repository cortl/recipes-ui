import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import queryString from "query-string";
import { useRouter } from "next/router";

import { MEAL_TYPES, PROTEINS } from "../../utils/tags";
import { useQueryFilters } from "../hooks/useQueryFilters";

const removeFromArray = (arr: string[], str: string) => {
  const index = arr.indexOf(str);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

const Filters: React.FC = () => {
  const router = useRouter();
  const filters = useQueryFilters();

  const onTagClick = (tag: string) => () => {
    let newFilters = [...filters];

    if (!newFilters.includes(tag)) {
      newFilters.push(tag);
    } else {
      removeFromArray(newFilters, tag);
    }

    if (newFilters.length) {
      router.push(
        `/?${queryString.stringify({
          filters: newFilters,
        })}`,
        undefined,
        {
          shallow: true,
        }
      );
    } else {
      router.push("/", undefined, {
        shallow: true,
      });
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="protein">{"Protein"}</FormLabel>
        <ButtonGroup alignItems="left" variant={"outline"}>
          {PROTEINS.map((tagName) => (
            <Button
              key={`protein-${tagName}`}
              onClick={onTagClick(tagName)}
              isActive={filters.includes(tagName)}
            >
              {tagName}
            </Button>
          ))}
        </ButtonGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="meal">{"Meal"}</FormLabel>
        <ButtonGroup alignItems="left" variant={"outline"}>
          {MEAL_TYPES.map((tagName) => (
            <Button
              key={`meal-${tagName}`}
              onClick={onTagClick(tagName)}
              isActive={filters.includes(tagName)}
            >
              {tagName}
            </Button>
          ))}
        </ButtonGroup>
      </FormControl>
    </>
  );
};

export { Filters };
