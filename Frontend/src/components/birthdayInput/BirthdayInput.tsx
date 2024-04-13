import React, { useEffect, useState } from "react";
import "./birthdayInput.scss";
interface BirthdayProps {
  onBirthdayChange: (birthday: string) => void;
}
const BirthdayInput: React.FC<BirthdayProps> = ({ onBirthdayChange }) => {
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
  const handleChange = () => {
    if (day && month && year) {
      const formattedDay = formatValue(day);
      const formattedMonth = formatValue(month);
      const birthday = `${year}-${formattedMonth}-${formattedDay}`;
      onBirthdayChange(birthday);
    }
  };
  useEffect(() => {
    handleChange();
  }, [day, month, year]);
  return (
    <div className="birthday">
      <select
        value={day}
        onChange={(e) => {
          setDay(e.target.value);
        }}
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
