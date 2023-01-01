import React from "react";
import styles from "../styles";

const regex = /^[A-Za-z0-9]+$/;

const CustomInput = ({
  label,
  type,
  placeholder,
  value,
  handleValueChange,
}) => {
  return (
    <>
      <label htmlFor="name" className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={() => {
          if (e.target.value !== "" || regex.test(e.target.value))
            handleValueChange(e.target.value);
        }}
      />
    </>
  );
};

export default CustomInput;
