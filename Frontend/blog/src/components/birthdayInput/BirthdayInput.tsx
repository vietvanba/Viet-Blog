import React, { useEffect, useState } from "react";
import "./birthdayInput.scss";
interface BirthdayProps {
  onBirthdayChange: (birthday: string) => void;
  brithday: string | undefined;
  isEditMode: boolean;
}
const BirthdayInput: React.FC<BirthdayProps> = ({
  onBirthdayChange,
  brithday,
  isEditMode,
}) => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const days = Array.from(Array(31), (_, i) => (i + 1).toString());

  const months = Array.from(Array(12), (_, i) => (i + 1).toString());

  const currentYear = new Date().getFullYear();
  const years = Array.from(Array(122), (_, i) => (currentYear - i).toString());
  const formatValue = (value: string): string => {
    return value.padStart(2, "0");
  };
  const removeLeadingZero = (value: string) => {
    if (value.length === 2) {
      if (
        value.charAt(0) === "0" &&
        ["01", "02", "03", "04", "05", "06", "07", "08", "09"].includes(value)
      ) {
        return value.charAt(1);
      }
    }
    return value;
  };
  const handleChange = () => {
    if (day && month && year) {
      const formattedDay = formatValue(day);
      const formattedMonth = formatValue(month);
      const birthday = `${year}-${formattedMonth}-${formattedDay}`;
      onBirthdayChange(birthday);
    }
  };
  const splitDay = () => {
    if (brithday != undefined && brithday != "") {
      const birthDaySplited = brithday?.split("T")[0].split("-");
      setDay(removeLeadingZero(birthDaySplited[2]));
      setMonth(removeLeadingZero(birthDaySplited[1]));
      setYear(removeLeadingZero(birthDaySplited[0]));
    }
  };
  useEffect(() => {
    handleChange();
  }, [day, month, year]);
  useEffect(() => {
    splitDay();
  }, [brithday]);
  return (
    <div className="birthday">
      <select
        value={day}
        onChange={(e) => {
          setDay(e.target.value);
        }}
        disabled={!isEditMode}
      >
        <option value="">Day</option>
        {days.map((dayOption) => (
          <option key={dayOption} value={dayOption}>
            {dayOption}
          </option>
        ))}
      </select>
      <select
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
        }}
        disabled={!isEditMode}
      >
        <option value="">Month</option>
        {months.map((monthOption) => (
          <option key={monthOption} value={monthOption}>
            {monthOption}
          </option>
        ))}
      </select>
      <select
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
        }}
        disabled={!isEditMode}
      >
        <option value="">Year</option>
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BirthdayInput;
