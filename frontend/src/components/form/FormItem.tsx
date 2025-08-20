import React from "react"

const formLabel = "block text-gray-700 font-bold mb-2";
const formControl = "shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline"

interface props {
    label: string,
    placeholder: string
  }

export const FormItem: React.FC<props> = ({ label, placeholder }) => {
    return (
      <div className="mb-4">
        <label className={formLabel}>{label}</label>
        <input type="text" className={formControl} placeholder={placeholder} />
      </div>
    )
  }

export default FormItem;