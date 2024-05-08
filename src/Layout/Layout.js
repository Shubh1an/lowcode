import React ,{useState ,PropsWithChildren} from 'react'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout(props:PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
    <div>
      <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
    </div>

    <div className="grid md:grid-cols-sidebar">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {props.children}
    </div>
  </div>
  )
}
