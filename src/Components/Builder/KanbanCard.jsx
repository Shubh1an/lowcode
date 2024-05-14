import React from 'react'
import  CustomInput from "../inputs/CustomInput";
import  Multiselect from "../inputs/Multiselect";
export default function KanbanCard({field ,onChange}) {
     console.log("props",field)
  return (
    field.type==="text" ?
   <CustomInput inputs={field}  onChange={onChange} />: <Multiselect inputs={field}  onChange={onChange}/>



  )
}
