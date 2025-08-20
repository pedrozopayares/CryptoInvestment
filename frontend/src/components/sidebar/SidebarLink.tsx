import { Link } from "react-router-dom";

interface SidebarLinkProps {
    link: String,
    icon: React.ReactNode,
    name: String
}
export const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
    const { link, icon, name } = props;

    return (
        <Link to={`${link}`}>
            <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-success hover:text-white text-white"
            >
                <>{icon}</>
                <span className="text-[15px] ml-4 text-black hover:font-bold">
                    {name}
                </span>
            </div>
        </Link>
    )
}

export default SidebarLink;