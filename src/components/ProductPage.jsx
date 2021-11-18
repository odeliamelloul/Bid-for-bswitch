import React,{useState,useEffect,useRef} from 'react'
import allProducts from '../allproduct'
import Header from './Header'
import PdfDocument from './PdfDocument'

const ProductPage = () => {

    let lsProducts=localStorage.getItem("allProducts")?JSON.parse(localStorage.getItem("allProducts")):allProducts
    let searchProduct =[]
    const itemEls = useRef([])
    itemEls.current=[]
    const [updatedProducts, setupdatedProducts] = useState([])
    const [keyWord, setKeyWord] = useState("")

    const addToRef=(el)=>
    {
      if(el && !itemEls.current.includes(el) )
      {
        itemEls.current.push(el)
      }
    }
    //dQL&9js27tJ8az#


    useEffect(() => {
    if(!localStorage.getItem("allProducts"))
        localStorage.setItem("allProducts",JSON.stringify(allProducts))

    lsProducts=JSON.parse(localStorage.getItem("allProducts"))
    setupdatedProducts(lsProducts)

    localStorage.setItem("searchProduct",JSON.stringify([]))

    },[] )

const updateDisplayProduct=()=>
{
    localStorage.setItem("allProducts",JSON.stringify(lsProducts))

    let searchData=localStorage.getItem("searchProduct")!=="[]"?JSON.parse(localStorage.getItem("searchProduct")):lsProducts
   
    searchData.forEach(searchEl => {
        lsProducts.forEach((p)=>{
            if (p.id===searchEl.id) 
             searchEl.amount=p.amount} 
        )
    });

    setupdatedProducts(searchData)
}

const addOne=(id,index)=>
{ 
    lsProducts.forEach(el =>{
        if(el.id===id)
        {
            el.amount=Number(el.amount+1)
            itemEls.current[index].value=el.amount
        }
    });
    updateDisplayProduct()
}

const removeOne=(id,index)=>{
    lsProducts.forEach(el =>{
        if(el.id===id && el.amount>0)
        {
            el.amount=Number(el.amount-1)
            itemEls.current[index].value=el.amount
        }
    });
    updateDisplayProduct()

}

const changeAmount=(e,id,index)=>
{
    lsProducts.forEach(el =>{
        if(el.id===id)
        {
         el.amount= Number(e.target.value)
         itemEls.current[index].value=el.amount 
        }
    });
    updateDisplayProduct()
}

const submitHandler=(val)=>
{
    lsProducts.forEach(el =>{
        if((el.description+" ").includes(val))
        {
            searchProduct.push(el)
            localStorage.setItem("searchProduct",JSON.stringify(searchProduct))
        }
    });
    setupdatedProducts(searchProduct)
}

return (
<>
<Header/>

 <input  onChange={(e)=>submitHandler(e.target.value)}  className="form-control-sm m-2" type="Search"  placeholder="חיפוש" aria-label="Search"/>

 <div className=" productPage" >
   {updatedProducts.length===0? 
   <p>לא נמצא מוצר תואם לחיפושך</p>
   : <table>
    <tr className="header-grid">
        <th> תיאור המוצר </th>
        <th>כמות</th>
        <th>מחיר ליחידה</th>
        <th>סה"כ לפני מע"מ </th>
        <th> סה"כ כולל מע"מ</th>
        {/* <div className="col">אביזר פנימי</div> */}
    </tr>


    {updatedProducts.map((product,index)=>
    <tr> 
        <td className="productDetails"><img src={product.exImage} alt="" />
        <div className="productName">{product.description}</div> 
        </td>

        <td>
            <button className="add" onClick={()=>addOne(product.id,index)} >+</button>
               <input id={index} ref={addToRef} value={product.amount} onChange={(e)=>changeAmount(e,product.id,index)}></input>
            <button className="remove" onClick={()=>removeOne(product.id,index)}>-</button>
        </td>
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
    </table>}
 </div>
<PdfDocument/>

{/* <GeneratePdf/> */}
</>
    )
}

export default ProductPage
