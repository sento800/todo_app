import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { optionsFilterDay } from "@/lib/data";
import type optionsDateFilterType from "@/types/optionsDateFilterType";
export function DateTimeFilter({
  dateQuery,
  setDateQuery,
}: {
  dateQuery: string;
  setDateQuery: (value: string) => void;
}) {
  return (
    <Combobox
      items={optionsFilterDay}
      itemToStringValue={(option: optionsDateFilterType) => option.label}
    >
      <ComboboxInput
        value={
          dateQuery
            ? optionsFilterDay.find((option) => option.value === dateQuery)
                ?.label
            : optionsFilterDay[0].label
        }
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(option) => (
            <ComboboxItem
              key={option.value}
              value={option}
              onClick={() => setDateQuery(option.value)}
            >
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default DateTimeFilter;
