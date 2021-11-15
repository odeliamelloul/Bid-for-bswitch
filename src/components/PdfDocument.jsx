import React, { useState,useRef } from 'react';
import ReactToPdf from 'react-to-pdf'
import logo from '../logo.png'

function PdfDocument() {
 const [displayTable, setDisplayTable] = useState("d-none")
  const ref = useRef()
  const lsproducts=JSON.parse(localStorage.getItem("allProducts"))
  const markedsProduct=lsproducts?lsproducts.filter((el)=>el.amount>0):[]
  return (
    <>
    { markedsProduct.length>0 &&<div>
      
    <div className="taple-pdf" ref={ref}>
      <h1>סיכום</h1>
      <table >           
         <thead>
           <tr>
           <th>מוצר</th>
           <th>&nbsp;תיאור&nbsp;המוצר</th>
           <th>כמות</th>
           <th>מחיר &nbsp;ליחידה &nbsp;לפני&nbsp; מע"מ</th>
           <th>סה"כ &nbsp;לפני&nbsp; מע"מ </th>
           <th> סה"כ&nbsp; מחיר כולל&nbsp; מע"מ</th>
           </tr>
         </thead><tbody>
       {markedsProduct.map((el)=>
        (
         
           <tr>
             <td>
             <img src={el.exImage} width="100px" height="80px" alt="" />
             </td>
             <td>
               {el.description}
             </td>
             <td>
               {el.amount}
             </td>
             <td>
               {el.price}
             </td>
             <td>
               {(el.price *el.amount).toFixed(2)}
             </td>
             <td>
               {(el.price *1.17).toFixed(2)}
             </td>
           </tr>
        )
       )}</tbody></table>
       <table className="total">
        <tr>
            <td >
               סה"כ&nbsp;לפני&nbsp;מע"מ
            </td>
            <td >
            {(markedsProduct.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0)).toFixed(2)}
            </td>
        </tr>
        <tr>
            <td >
              סה"כ &nbsp;אחרי&nbsp;מע"מ  
            </td>
            <td >
            {((markedsProduct.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0))*1.17).toFixed(2)}
            </td>
        </tr>
        <tr >
            <p>*המחיר אינו סופי ויכול להשתנות לפי תנאי&nbsp; השטח  </p>
        </tr>
      </table>
         <table>
            <tbody>
              <tr>

              </tr>
            </tbody>
         </table>
       </div>
       <ReactToPdf targetRef={ref} filename="estimate-bswitch.pdf">
        {({toPdf}) => (
            <button onClick={toPdf}>download pdf</button>
        )}
       </ReactToPdf>
    </div>}
    </>
  );
}
export default PdfDocument