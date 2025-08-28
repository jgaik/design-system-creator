import { getTypedObjectEntries } from "@yamori-shared/react-utilities";
import { useStore } from "../store";
import type { Mappings } from "../types";
import { useMemo } from "react";

type MappingPickerProps = {
  name: Mappings;
};

export const MappingPicker: React.FC<MappingPickerProps> = ({ name }) => {
  const shades = useStore((state) => state.colors);
  const mapping = useStore((state) => state.mappings[name]);
  const setMapping = useStore((state) => state.setMapping);

  const allShades = useMemo(
    () =>
      getTypedObjectEntries(shades)
        .map(([color, info]) =>
          info.shades.map(
            ([lightness, shade]) => [`${color}-${lightness}`, shade] as const
          )
        )
        .flat(),
    [shades]
  );

  return (
    <details open>
      <summary>{name}</summary>
      <ul>
        {Object.entries(mapping).map(([mappingName, mappingValue]) => (
          <li key={mappingName}>
            <label>
              {name}-{mappingName}
              <select
                onFocus={(e) => {
                  e.currentTarget.size = allShades.length;
                }}
                onBlur={(e) => {
                  e.currentTarget.size = 0;
                }}
                onChange={(e) => {
                  setMapping(name, mappingName, e.currentTarget.value);
                  e.currentTarget.size = 1;
                  e.currentTarget.blur();
                }}
                style={{
                  backgroundColor: allShades.find(
                    ([shade]) => shade === mappingValue
                  )?.[1],
                }}
                value={mappingValue}
              >
                {allShades.map(([shadeName, shadeColor]) => (
                  <option
                    key={shadeName}
                    value={shadeName}
                    style={{ backgroundColor: shadeColor }}
                  >
                    {shadeName}
                  </option>
                ))}
              </select>
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
};
