import React, { HTMLAttributes, useMemo } from "react";
import style from './DateTime.module.scss';

export const DateTime: React.FC<Props & HTMLAttributes<HTMLSpanElement>> = ({
  value,
  locale,
  ...rest
}) => {
  const dateString = useMemo(() => {
    const rawValue = value === "now" ? new Date() : value;
    let stringVal = "";
    if (locale === 'en') {
      const month = monthNames[rawValue.getMonth()];
      const day = rawValue.getDay();
      const year = rawValue.getFullYear();
      stringVal = `${month} ${day}, ${year}`;
    }
    else {
      stringVal += DAYS[rawValue.getDay()];
      stringVal += ", ngày ";
      stringVal += rawValue.getDate();
      stringVal += " tháng ";
      stringVal += rawValue.getMonth() + 1;
      stringVal += " năm ";
      stringVal += rawValue.getFullYear();
    }
    
    return stringVal;
  }, [value, locale]);

  return (
    <span className={style.root} {...rest}>
      {dateString}
    </span>
  );
};

interface Props {
  value: Date | "now";
  locale?: string;
}

const DAYS = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
