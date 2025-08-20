import navigationConfig from '@/configs/navigationConfig';
import SidebarLink from './SidebarLink';
import { Component } from 'react'

export class Sidebar extends Component {
  render() {
    return (
      <div className="p-2 overflow-y-auto text-center bg-gray-100 h-full">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="text-black text-[25px] ml-3">Menu</h1>
            <i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
          </div>
          <div className="my-2 bg-gray-300 h-[1px]"></div>
        </div>
        
        {navigationConfig.map((item, index)=> {
          return <SidebarLink key = {"Link-"+index} link={item.link} name={item.name} icon={item.icon}/>
        }) }
      <div className="my-4 bg-gray-300 h-[1px]"></div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-success hover:text-white text-black">
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-[15px] ml-4 text-black font-bold">Logout</span>
      </div>
    </div>
    )
  }
}

export default Sidebar;
