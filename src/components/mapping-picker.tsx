import { useStore } from "../store";
import type { Mappings } from "../types";
import { useMemo } from "react";
import { MappingPickerRow } from "./mapping-picker-row";

type MappingPickerProps = {
  name: Mappings;
};

export const MappingPicker: React.FC<MappingPickerProps> = ({ name }) => {
  const mapping = useStore((state) => state.mappings[name]);

  const mappingEntries = useMemo(() => Object.entries(mapping), [mapping]);

  return (
    <>
      <tr>
        <th scope="row" rowSpan={mappingEntries.length + 1}>
          {name}
        </th>
      </tr>
      {mappingEntries.map(([mappingName, mappingValue]) => (
        <MappingPickerRow
          mapping={name}
          name={mappingName}
          value={mappingValue}
        />
      ))}
    </>
  );
};
