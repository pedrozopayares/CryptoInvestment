
interface props {
    title: string;
    actions?:Array<any>;
}
const PageTitle: React.FC<props> = (props) => {
    const { title, actions } = props;
    return (
        <div className='flex justify-between items-center'>
            <div className=""><h2 className="text-4xl font-bold">{title}</h2></div>
            <div className="flex  space-x-4 "> {actions?.map((accion,index)=> <div key={"accion_"+index}>{accion}</div>)}</div>
           
        </div>
    )
}

export default PageTitle;