import React, { useState,useRef } from 'react';
import ReactToPdf from 'react-to-pdf'
import emailjs from "emailjs-com";

function PdfDocument() {
 
  const [name, setName] = useState("")
  const [errName, setErrName] = useState("")
  const [email, setEmail] = useState("")
  const [errMail, setErrMail] = useState("")
  const [flag, setFlag] = useState(false)
  const [phone, setPhone] = useState("")
  const [errPhone,setErrPhone]=useState("")

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
     if(name==="")
     setErrName("הכנס שם")
     if(email==="")
     setErrMail("הכנס מייל ")
      if(phone==="")
      setErrPhone("הכנס מספר טלפון ")

     if(errMail===""&& errName==="" && errPhone==="" && flag){
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
        {
           setName(val)
           if (val==="")
           { setFlag(false)
             setErrName("הכנס שם")
           }
           else{
              setFlag(true)
              setErrName("")
             }
        }
        const changeEmail=(val)=>
        { 
           setEmail(val)
           if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(val))
           {
            setFlag(false)
             setErrMail("הכנס מייל תקין")
           }
           else{
            setFlag(true) 
            setErrMail("")
          }

        }
        const changePhone=(val)=>
        {
          console.log(val)
           setPhone(val)
           
           if(!/^[0][5]\d{1}\-?\d{7}$/.test(val))
           { 
             setFlag(false)
             setErrPhone("הכנס מספר טלפון תקין")
           } 
           else{
            setFlag(true)
            setErrPhone("")
           }
        }

  return (
    <>
    {markedsProduct.length>0 &&
   <div>
    <div className="taple-pdf" ref={ref}>
      <h1>סיכום</h1>
      <table>
    <tr className="header-grid">
        <th> תיאור המוצר </th>
        <th>כמות</th>
        <th>מחיר ליחידה</th>
        <th>סה"כ לפני מע"מ </th>
        <th> סה"כ כולל מע"מ</th>
        {/* <div className="col">אביזר פנימי</div> */}
    </tr>


    {markedsProduct.map((product,index)=>
    <tr> 
        <td className="productDetails"><img src={product.exImage} alt="" />
        <div className="productName">{product.description}</div> 
        </td>
        <td>{product.amount}</td>
        <td>
            {product.price}
        </td>
        <td>
        {(product.price * product.amount).toFixed(2)}
        </td>
        <td>
        {(product.price * product.amount *1.17).toFixed(2)}
        </td>
    </tr> )}  
    </table>
       <table className="total">
        <tr>
            <td >סה"כ&nbsp;לפני&nbsp;מע"מ : &nbsp;
              {(markedsProduct.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0)).toFixed(2)}
            </td>
        </tr>
        <tr>
            <td >  סה"כ &nbsp;אחרי&nbsp;מע"מ :&nbsp; 
            {((markedsProduct.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0))*1.17).toFixed(2)}
            </td>
        </tr>
        <tr>
            <p className="p-table">*המחיר אינו סופי ויכול להשתנות לפי תנאי&nbsp; השטח  </p>
        </tr>
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
     {!flag && <div className="error">
         {errName}
         {errMail}
         {errPhone}
     </div>}
    
   <button className="send" onClick={sendEmail} >שלח אלינו את ההצעה <i class="fa fa-envelope-o"  aria-hidden="true"></i> </button>
   </div>}
    </>
  );
}
export default PdfDocument