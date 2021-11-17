import React, { useState,useRef } from 'react';
import ReactToPdf from 'react-to-pdf'
import emailjs from "emailjs-com";

function PdfDocument() {
 
  const [name, setName] = useState("")
  const [errName, setErrName] = useState("")
  const [email, setEmail] = useState("")
  const [errMail, setErrMail] = useState("")
  const [phone, setPhone] = useState("")
  const [errPhone,setErrPhone]=useState("")
  const [err,setErr]=useState("")
  
  let flag=false
  const ref = useRef()
  const lsproducts=JSON.parse(localStorage.getItem("allProducts"))
  const markedsProduct=lsproducts?lsproducts.filter((el)=>el.amount>0):[]

  var html = `<table dir="rtl" border="1px solid blue" style="color:rgb(10, 40, 97); margin:0 auto;"> 
                  <thead >
                  <tr>
                    <th width="150px" style="text-align: center;">תיאור</th>
                    <th width="20px"  style="text-align: center;">כמות</th>
                    <th width="100px" style="text-align: center;">מחיר לפני מע"מ </th>
                    <th width="100px" style="text-align: center;">מחיר כולל מע"מ</th>
                  </tr>
                </thead>
              <tbody dir="rtl" border="1px solid blue" >`;


        markedsProduct.forEach(p => {
        html += `<tr dir="rtl" border="1px solid blue">
                <td width="150px" style="text-align: center;">${p.description}</td>
                <td width="20p" height="40px"   style="text-align: center;">${p.amount} </td>
                <td width="100px" height="40px" style="text-align: center;">${p.price * p.amount} </td>
                <td width="100px" height="40px" style="text-align: center;"> ${(p.price* p.amount*1.17).toFixed(2)}</td>
          </tr>`
        })
            html+=`</tbody>
                      <tr><td colspan="4" style="text-align: center;" > סה"כ:${((markedsProduct.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0))*1.17).toFixed(2)}</td></tr>
                      </table>
                  <div  dir="rtl" style="color:rgb(10, 40, 97); margin:0 auto; width:200px;" >
                    <u style="font-size:18px; font-weight:bold">פרטי לקוח:</u>
                    <p style="font-size:16px;">שם:${name}</p>
                    <p style="font-size:16px;">מייל:${email} </p>
                    <p style="font-size:16px;">טלפון:${phone}</p>
                  </div>`

    const sendEmail=()=>
    {
     changeName()
     changeEmail()
     changePhone()

     if(errMail===""&& errName==="" && errPhone==="" && flag===false){
      setErr("הכנס פרטיך")
     }
     if(errMail===""&& errName==="" && errPhone==="" && flag===true){
       setName("")
       setEmail("")
       setPhone("")
      var templateParams = {
          name:html
      };
    
       emailjs.send('service_o2n4bpq', 'template_dxxjusg', templateParams,"user_vLhhvBzlmb0caFnkYzt2q")

       .then(function(response) {
          alert("הצעת המחיר נשלחה אלינו בהצלחה")
        }, function(error) {
      
        });
      }
     }
        const changeName=(val)=>
        {setErr("")
           setName(val)
           if (val==="")
           { flag=false
             setErrName("הכנס שם")
           }
           else{
              flag=true
              setErrName("")
             }
        }
        const changeEmail=(val)=>
        { setErr("")
           setEmail(val)
           if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email))
           {
            flag=false
             setErrMail("הכנס מייל תקין")
           }
           else{
            flag=true 
            setErrMail("")
          }

        }
        const changePhone=(val)=>
        {
           setPhone(val)
           setErr("")
           if(!/^(\+972|0)[5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/.test(phone)
             || !/^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(phone))
           { flag=false
             setErrPhone("הכנס מספר טלפון תקין")
           } 
           else{
            setErrPhone("")
           }
        }

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
             <td><img src={el.exImage} width="100px" height="80px" alt="" /></td>
             <td>{el.description}</td> 
             <td>{el.amount}</td>     
             <td>{el.price}</td>
             <td>{(el.price *el.amount).toFixed(2)}</td>       
             <td>{(el.price *1.17).toFixed(2)}</td>
           </tr>
        )
       )}
       </tbody>
       </table>
       <table className="total">
        <tr>
            <td >סה"כ&nbsp;לפני&nbsp;מע"מ </td>
            <td >
              {(markedsProduct.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0)).toFixed(2)}
            </td>
        </tr>
        <tr>
            <td >  סה"כ &nbsp;אחרי&nbsp;מע"מ  </td>
            <td >
            {((markedsProduct.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0))*1.17).toFixed(2)}
            </td>
        </tr>
        <tr>
            <p className="p-table">*המחיר אינו סופי ויכול להשתנות לפי תנאי&nbsp; השטח  </p>
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
            <button className="send mt-2 mb-2" onClick={toPdf}>download pdf</button>
        )}
       </ReactToPdf>
       <p>הכנס פרטיך:</p>
       <form>
        <div class="mb-3">
          <input type="text" value={name} onChange={(e)=>changeName(e.target.value)} placeholder="שם מלא" class="form-control-sm" id="InputName"/>
        </div>
        <div class="mb-3">
          <input type="email" value={email} onChange={(e)=>changeEmail(e.target.value)} placeholder="מייל" class="form-control-sm" aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          <input type="phone" value={phone} onChange={(e)=>changePhone(e.target.value)} placeholder="טלפון" class="form-control-sm" id="InputPhone"/>
        </div>
     </form>
     <div className="error">
       <ul >
         {err!=="" && <li>{err}</li>}
         {errName!=="" &&<li>{errName}</li>}
         {errMail!==""&&<li>{errMail}</li>}
         {errPhone!=="" &&<li>{errPhone}</li>}
       </ul>
     </div>
    
   <button className="send" onClick={sendEmail} >שלח אלינו את ההצעה <i class="fa fa-envelope-o"  aria-hidden="true"></i> </button>
   </div>}
    </>
  );
}
export default PdfDocument