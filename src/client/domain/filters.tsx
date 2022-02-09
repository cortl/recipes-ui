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
      {FILTERS.map(({ name, tags }) => (
        <FormControl as="fieldset" key={`${name}-filter-group`}>
          <FormLabel as="legend">{name}</FormLabel>
          <CheckboxGroup>
            <Stack spacing={[1, 3, 5]} direction={["column", "column", "row"]}>
              {tags.map((tagName) => (
                <Checkbox
                  key={`${name}-${tagName}`}
                  onChange={onTagClick(tagName)}
                  isChecked={filters.includes(tagName)}
                >
                  {tagName}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      ))}
    </>
  );
};

export { Filters };
