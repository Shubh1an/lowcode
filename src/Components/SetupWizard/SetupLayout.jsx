import React from 'react'
import Logo from "../../assets/Logo.svg"
import SetupHead from "../../assets/setup-head.svg"
import SetupBottom from "../../assets/setup-bottom.svg"

const SetupLayout = ({children}) => {
  return (
    <div className="w-full h-[100vh] bg-[#FCF9EE] flex flex-row">
        <div className="w-1/2 h-full bg-setup-pattern bg-white flex flex-col">
            <div className="w-full mt-[25%]">
                <img src={Logo} className="w-1/3 mx-auto" />
            </div>
            <div className="w-full mt-[10%]">
                <img src={SetupHead} className="w-[90%] mx-auto" />
            </div>
            <div className="w-full mt-auto ">
                <img src={SetupBottom} className="w-[90%] mx-auto" />
            </div>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center">
            {children}
        </div>
    </div>
  )
}

export default SetupLayout