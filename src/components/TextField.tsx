import React from "react";

export interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id: string;
  type: string;
}

const TextField = ({ type, id, placeholder, onChange }) => {
  return <input type={type} id={id} placeholder={placeholder} onChange={onChange} />;
};

export default TextField;
