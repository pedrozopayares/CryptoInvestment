import { Component } from "react"
import { TableHeadType } from "./TableTypes";

// componente de th
export default class TableHead extends Component<TableHeadType> {

    render(): React.ReactNode {
        const { title, align, className } = this.props;
        let alignmentClass = 'text-left';

        if (align === 'left') alignmentClass = 'text-left';
        if (align === 'right') alignmentClass = 'text-right';
        if (align === 'center') alignmentClass = 'text-center';
        if (align === 'top') alignmentClass = 'align-text-top';
        if (align === 'bottom') alignmentClass = 'align-text-bottom';
        if (align === 'top-left') alignmentClass = 'text-left align-text-top';
        if (align === 'top-right') alignmentClass = 'text-right align-text-top';
        if (align === 'bottom-left') alignmentClass = 'text-left align-text-bottom';
        if (align === 'bottom-right') alignmentClass = 'text-right align-text-bottom';

        return (
            <th 
            className={
                `border-b dark:border-slate-600 font-medium px-4 text-slate-400 
                dark:text-slate-200 ${alignmentClass} ${className}`
            }
            >{title}</th>
        )
    }
}  