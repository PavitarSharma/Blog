import React, { useState } from "react";

type InputProp = {
  id: string;
  name: string;
  type?: string;
  value: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
  placeholder: string;
  icon?: string;
};

const Input: React.FC<InputProp> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={
          type === "password" ? (passwordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        id={id}
        autoComplete={"off"}
        value={value}
        onChange={onChange}
        className="input-box"
      />
      <i className={`fi ${icon} input-icon`}></i>

      {type === "password" ? (
        <i
          onClick={() => setPasswordVisible((currentValue) => !currentValue)}
          className={`fi ${passwordVisible ? "fi-rr-eye-crossed": "fi-rr-eye"} absolute top-1/2 -translate-y-1/2 left-[auto] right-4 cursor-pointer`}
        ></i>
      ) : null}
    </div>
  );
};

export default Input;
