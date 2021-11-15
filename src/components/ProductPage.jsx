import React,{useState,useEffect,useRef} from 'react'
import allProducts from '../allproduct'
import Header from './Header'
import PdfDocument from './PdfDocument'
const ProductPage = () => {

    let lsProducts=localStorage.getItem("allProducts")?JSON.parse(localStorage.getItem("allProducts")):allProducts

    const itemEls = useRef([])
    itemEls.current=[]
    const [updatedProducts, setupdatedProducts] = useState([])

    const addToRef=(el)=>
    {
      if(el && !itemEls.current.includes(el) )
      {
        itemEls.current.push(el)
      }
    }

    useEffect(() => {
    if(!localStorage.getItem("allProducts"))
        localStorage.setItem("allProducts",JSON.stringify(allProducts))

    lsProducts=JSON.parse(localStorage.getItem("allProducts"))
    setupdatedProducts(lsProducts)


    },[] )


const changeAmount=(e,id)=>
{
    console.log(e.target.value);
    lsProducts.forEach(el =>{
        if(el.id===id)
        {
            el.amount= Number(e.target.value)
            itemEls.current[id].value=el.amount 
        }
    });
    localStorage.setItem("allProducts",JSON.stringify(lsProducts))
    setupdatedProducts(lsProducts)
}
return (
<>
 <Header/>
<div className=" productPage" >
    <table>
    <tr className="header-grid">
        <th>אביזר חיצוני</th>
        <th>תיאור המוצר</th>
        <th>כמות</th>
        <th>מחיר ליחידה לפני מע"מ</th>
        <th>סה"כ לפני מע"מ </th>
        <th> סה"כ מחיר כולל מע"מ</th>
        {/* <div className="col">אביזר פנימי</div> */}
    </tr>


    {updatedProducts.map((product,index)=>
    <tr> 
        <td className="image-column">
        <img src={product.exImage} alt="" />
        </td> 
        <td>
            {product.description}
        </td>
        <td>
            <input id={index} ref={addToRef} value={product.amount} onChange={(e)=>changeAmount(e,product.id)}></input>    </td>
        <td>
            {product.price}
        </td>
        <td>
        {(product.price * product.amount).toFixed(2)}
        </td>
        <td>
        {(product.price * product.amount *1.17).toFixed(2)}
        </td>
    </tr>

    )
    }
    </table>
    {/* <div className="container total">
        <div className="row" >
            <div className="col-2" >
            {(updatedProducts.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0)).toFixed(2)}
            </div>
            <div className="col-2" >
            סה"כ לפני מע"מ
            </div>
        </div>
        <div className="row" >
        <div className="col-2" >
            {(updatedProducts.map((item)=>item.price*item.amount).reduce((prev,next)=>prev+next,0)*1.17).toFixed(2)}
            </div>
            <div className="col-2" >
            סה"כ אחרי מע"מ
            </div>
        </div>
    </div> */}

    </div>
<PdfDocument/>
  <p>שלח אלינו את ההצעה:</p>
    <button className="send">    
        <i class="fa fa-whatsapp" aria-hidden="true"></i>whatsapp
    </button>
    <button className="send">
        <i class="fa fa-envelope-o "  aria-hidden="true"></i>email
    </button>
{/* <GeneratePdf/> */}
</>
    )
}

export default ProductPage
