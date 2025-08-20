import React from 'react';

export interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  options?: { value: string | number; label: string }[];
  value?: string | number | boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, type, placeholder, disabled, options, value, onChange }) => {
  if (type === 'select' && options) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <select
          name={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          disabled={disabled}
          value={value as string | number}
          onChange={onChange}
        >
          <option value="">Selecciona una opción</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        disabled={disabled}
        value={value as string | number}
        onChange={onChange}
      />
    </div>
  );
};

interface Field {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number | boolean;
  }
  
  interface FormProps {
    fields: Field[];
    onSubmit: (e: React.FormEvent) => void;
  }
  
  const Form: React.FC<FormProps> = ({ onSubmit }, children) => {
  
    return (
      <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={onSubmit}>
         { children }
      </form>
    );
  };
  
  export default Form;