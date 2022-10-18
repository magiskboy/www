import React, { HTMLAttributes, useMemo } from "react";

const DateTime: React.FC<Props & HTMLAttributes<HTMLSpanElement>> = ({
  value,
  ...rest
}) => {
  const dateString = useMemo(() => {
    const rawValue = value === "now" ? new Date() : value;
    let stringVal = "";
    stringVal += DAYS[rawValue.getDay()];
    stringVal += ", ngày ";
    stringVal += rawValue.getDate();
    stringVal += " tháng ";
    stringVal += rawValue.getMonth();
    stringVal += " năm ";
    stringVal += rawValue.getFullYear();
    return stringVal;
  }, [value]);

  return (
    <span className="date-time" {...rest}>
      {dateString}
    </span>
  );
};

interface Props {
  value: Date | "now";
  time?: boolean;
}

const DAYS = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ 7",
];

export default DateTime;
