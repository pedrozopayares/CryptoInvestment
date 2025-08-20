export interface InputProps {
    children?: React.ReactNode;
    onClick?: () => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number | readonly string[] | undefined;
    type?: 'email' | 'text' | 'password' | 'number';
    className?: string;
    id?: string;
    name?: string;
    placeholder?: string;
}