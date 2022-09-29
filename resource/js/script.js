const form=document.getElementById("transactionForm");
        form.addEventListener("submit",function(event){
            event.preventDefault();
            let transactionFormData=new FormData(form);
            let transactionObj=convertFormDataToTransactionObj(transactionFormData);
           

            saveTransactionObj(transactionObj);             
            insertRowInTransactionTable(transactionObj);
            
            form.reset();       
                

        } ); 
        document.addEventListener("DOMContentLoaded",function(event){
          draw_category();
            let transactionObjArray=JSON.parse(localStorage.getItem("transactionData"));
            transactionObjArray.forEach(
              function(arrayElement){
                insertRowInTransactionTable(arrayElement);
                console.log("Se inserto el elemento");
              }    
            );
        });
        
        function getNewTransactionId(){
          
          let lastTransactionId=localStorage.getItem('lastTransactionId') || "1";
          let newTransactionId=JSON.parse(lastTransactionId)+1;
          localStorage.setItem("lastTransactionId",JSON.stringify(newTransactionId));
          
          return newTransactionId;
        }
        //Funcion que convierte el FormData a un Objeto de Transaccion
        function convertFormDataToTransactionObj(transactionFormData){
          
          let transactionType=transactionFormData.get("transactionType");
          let transactionDescription=transactionFormData.get("transactionDescription");
          let transactionAmount=transactionFormData.get("transactionAmount");
          let transactionCategory=transactionFormData.get("transactionCategory");
          let transactionId=getNewTransactionId();
          return {
            "transactionType":transactionType,
            "transactionDescription":transactionDescription,
            "transactionAmount":transactionAmount,
            "transactionCategory":transactionCategory,
            "transactionId":transactionId
          }
        }
        
        function draw_category(){
          let allCategories=[
            "Alquiler",
            "Comida",
            "Viaticos",
            "vestimenta",
            "Gastos Varios"           
          ];
          for(let index=0;index<allCategories.length;index++){
            insertCategory(allCategories[index]);
          }
        }
        ///Inserta Categorias en el Select
        function insertCategory(categoryName){
          const selectElement=document.getElementById("transactionCategory");
          let htmlToInsert=`<option value=${categoryName}>${categoryName}</option>`
          selectElement.insertAdjacentHTML("beforeend",htmlToInsert);
        }

        function insertRowInTransactionTable(transactionObj){
          let transactionTableRef= document.getElementById("transactionTable");
          //Crea una fila en la tabla
          let newTransactionRowRef=transactionTableRef.insertRow(-1);
          newTransactionRowRef.setAttribute("data-transaction-id",transactionObj["transactionId"]);
          //Crea una celda o columna e inserta un valor 
          let newTypeCellRef=newTransactionRowRef.insertCell(0);
            newTypeCellRef.textContent=transactionObj["transactionType"];

            //Crea una celda o columna e inserta un valor 
            newTypeCellRef=newTransactionRowRef.insertCell(1);
            newTypeCellRef.textContent=transactionObj["transactionDescription"];

            //Crea una celda o columna e inserta un valor 
            newTypeCellRef=newTransactionRowRef.insertCell(2);
            newTypeCellRef.textContent=transactionObj["transactionAmount"];

            //Crea una celda o columna e inserta un valor 
            newTypeCellRef=newTransactionRowRef.insertCell(3);
            newTypeCellRef.textContent=transactionObj["transactionCategory"];

            let newDeleteCell=newTransactionRowRef.insertCell(4);
            let deleteButton=document.createElement("button");
            deleteButton.textContent="Eliminar";
            newDeleteCell.appendChild(deleteButton);
            deleteButton.addEventListener("click", (event)=>{
              let transactionRow=event.target.parentNode.parentNode;
              let transactionId=transactionRow.getAttribute("data-transaction-id");
              transactionRow.remove();
              deleteTransactionObj(transactionId);
            }); 
        }
        
        function deleteTransactionObj(transactionId)
        {
          //Obtengo mis transacciones de mi localStorage
          let transactionObjArray=JSON.parse(localStorage.getItem("transactionData"));
          //Busco el indice de la transaccion que deseo eliminar
          let transactionIndexInArray=transactionObjArray.findIndex(element=>
          element.transactionId.toString()===transactionId);
          //Elimino el elemento de esa posicion
          transactionObjArray.splice(transactionIndexInArray,1);
          //Convierto a JSON mi Objeto
          let transactionArrayJSON=JSON.stringify(transactionObjArray);
          //Guardo mi array de transaccion en formato JSON en el local Storage
          localStorage.setItem("transactionData",transactionArrayJSON);
        }

        function saveTransactionObj(transactionObj){
          let myTransactionArray=JSON.parse(localStorage.getItem('transactionData')) || [];
          myTransactionArray.push(transactionObj);
          
          //Convierto el Array de Transacciones a JSON
          let transactionArrayJSON=JSON.stringify(myTransactionArray);
          //Guardo Mi Array de Transaccion en formato JSON en el local Storage
          localStorage.setItem("transactionData",transactionArrayJSON);
        }
        
    