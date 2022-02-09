import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
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

interface IFilters {
  onChange?: () => void;
}

const Filters: React.FC<IFilters> = ({ onChange }) => {
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

    onChange && onChange();
  };

  return (
    <>
      <FormControl as="fieldset">
        <FormLabel as="legend">{"Protein"}</FormLabel>
        <CheckboxGroup>
          <Stack spacing={[1, 3, 5]} direction={["column", "column", "row"]}>
            {PROTEINS.map((tagName) => (
              <Checkbox
                key={`protein-${tagName}`}
                onChange={onTagClick(tagName)}
                isChecked={filters.includes(tagName)}
              >
                {tagName}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </FormControl>
      <FormControl as="fieldset">
        <FormLabel as="legend">{"Meal"}</FormLabel>
        <CheckboxGroup>
          <Stack spacing={[1, 3, 5]} direction={["column", "column", "row"]}>
            {MEAL_TYPES.map((tagName) => (
              <Checkbox
                key={`meal-${tagName}`}
                onChange={onTagClick(tagName)}
                isChecked={filters.includes(tagName)}
              >
                {tagName}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </FormControl>
    </>
  );
};

export { Filters };
