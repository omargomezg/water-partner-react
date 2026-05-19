import { Select } from "antd";
import { FC } from "react";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  width?: string;
};

export const SelectDiameter: FC<Props> = ({
  value,
  onChange,
  width = "100%",
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ width: width || "200px" }}
      options={[
        { value: "", label: "Seleccione una opción" },
        { value: "THIRTEEN", label: "13 mm" },
        { value: "NINETEEN", label: "19 mm" },
        { value: "TWENTY_FIVE", label: "25 mm" },
        { value: "THIRTY_EIGHT", label: "38 mm" },
      ]}
    />
  );
};
