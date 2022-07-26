import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import queryString from "query-string";
import { useRouter } from "next/router";

import { HOLIDAYS, MEAL_TYPES, METHODS, PROTEINS } from "../../constants/tags";
import { useQueryFilters } from "../hooks/use-query-filters";

const removeFromArray = (arr: string[], str: string): void => {
  const index = arr.indexOf(str);

  if (index > -1) {
    arr.splice(index, 1);
  }
};

type IFilters = {
  onChange?: () => void;
};

const FILTERS = [
  { name: "Protein", tags: PROTEINS },
  { name: "Meal", tags: MEAL_TYPES },
  { name: "Methods", tags: METHODS },
  { name: "Holidays", tags: HOLIDAYS },
];

const Filters: React.FC<IFilters> = ({ onChange }) => {
  const router = useRouter();
  const filters = useQueryFilters();

  const onTagClick = (tag: string) => () => {
    const newFilters = [...filters];

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

    onChange?.();
  };

  return (
    <Stack direction={["column", "row"]} width="100%">
      {FILTERS.map(({ name, tags }) => (
        <FormControl as="fieldset" key={`${name}-filter-group`}>
          <FormLabel as="legend">{name}</FormLabel>
          <CheckboxGroup>
            <Stack direction="column" spacing={[1, 3, 5]}>
              {tags.map((tagName) => (
                <Checkbox
                  isChecked={filters.includes(tagName)}
                  key={`${name}-${tagName}`}
                  onChange={onTagClick(tagName)}
                >
                  {tagName}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      ))}
    </Stack>
  );
};

export { Filters };
