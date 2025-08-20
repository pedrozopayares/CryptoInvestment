interface FormControlLabelProps {
    children: any;
    label: String;
    id?: string;
}

const FormControlLabel: React.FC<FormControlLabelProps> = ({ children, label, id }) => {
    const formItemLabelStyle = "block text-gray-700 font-bold mb-2";
    return (
        <div className="mb-4">
            <label className={formItemLabelStyle} id={id}> {label} </label>
            {children}
        </div>
    )
}

export default FormControlLabel
