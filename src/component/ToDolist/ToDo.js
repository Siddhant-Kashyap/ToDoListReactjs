import React ,{useState,useEffect}  from  'react'
import "./style.css"




const ToDo = () => {
    
const getLocalData = () => {
    const list = localStorage.getItem("MyToDoList");
    if(list){
        return JSON.parse(list)
    }
    else{
        return[];
    }
}
   const [inputData,setinputData] = useState('');
   const [item,setItem]=useState(getLocalData());
   const [isEditItem,setIsEditedItem] =useState("");
   const [toggleBtn,setToggleBtn] = useState(false)




   const addItems = () => {
       if(!inputData){
           alert('Please Enter The Data')
       }
       else if (inputData && toggleBtn){
           setItem(
               item.map((curElem)=>{
               if(curElem.id === isEditItem){
                    return {...curElem , name: inputData }
               }
               return curElem;
           }))
            setinputData("");
            setIsEditedItem(null);
            setToggleBtn(false);

       }
       
       else{
           const myNewInputData = {
               id: new Date().getTime().toString(),
               name: inputData,
               
           };
           
           setItem([...item,myNewInputData])
           setinputData("")
         
           
       }
   }
   const deleteItem=  (index) => {
            const updatedList=item.filter((curElem) => {
                return curElem.id !== index;
            });
            setItem(updatedList);

   }

   const removeAll = () => {
       setItem([]);
   }

const editItem = (index) =>{
    const item_todo_edited =item.find((curElem)=>{
        return curElem.id === index;
    })
    setinputData(item_todo_edited);
    setIsEditedItem(index);
    setToggleBtn(true);

    

}


// local storage saving 
useEffect(() =>{

    localStorage.setItem("MyToDoList",JSON.stringify(item),[item])

})








    return (
        <>
        <div id="background-wrap">
    <div class="bubble x1"></div>
    <div class="bubble x2"></div>
    <div class="bubble x3"></div>
    <div class="bubble x4"></div>
    <div class="bubble x5"></div>
    <div class="bubble x6"></div>
    <div class="bubble x7"></div>
    <div class="bubble x8"></div>
    <div class="bubble x9"></div>
    <div class="bubble x10"></div>
</div>
        <div className="main-div"  >
        
            
            <div className="child-div">
                <figure>
                    <img src="./todoicon.png" alt="todoLogo" />
                    <figcaption>Add Your List Here</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text"
                    placeholder="✍ ADD ITEM"
                    className="form-control"
                       value={inputData}
                        onChange={(event)=>setinputData(event.target.value)}

                    
                    />
                    {toggleBtn ?<i className="far fa-edit add-btn" onClick={addItems}></i>:<i className="fa fa-plus add-btn" onClick={addItems}></i>}
                     </div>
                        {/*iteams to be shown*/}
                        

                        <div className="showItems">
                            {
                                item.map((curElem,index)=>{
                                    return(
                                        <div className="eachItem" key={curElem.id}>
                                             <h3> {curElem.name} </h3>
                                              <div className="todo-btn">
                                                      <i className="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
                                                      <i className="far fa-trash-alt add-btn " onClick={()=>{
                                                          deleteItem(curElem.id)
                                                      }}></i>
                                             </div>
                                
                                         </div>

                                    );
                                })
                            }
                            
                            
                        </div>



                 <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} ><span>CHECKLIST</span></button>
                </div>
           </div>
        </div>
    </>
    )
}

export default ToDo
