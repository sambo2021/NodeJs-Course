const fs = require('fs');
//function to split input by = cuse it enters as [title="title to do one ", body="body of to do 1"]
//convert it to {
//    title : "title to do one ", 
//    body : "body of to do 1"
//}
function parseArgs(options){
    const parsedOptions= options.reduce(
     (cum,element) => {
        const[key,value] = element.split('=')  
         cum[key] = value
         return cum 
     },{})
    return parsedOptions ;
}

//function return all existing todos to use it in add and edit and delete and list 
function existingTodosParsed(){
    if(!fs.existsSync('./db.json')){
        fs.writeFileSync('./db.json',JSON.stringify([])) //create a file with empty array
    }
    const todos = fs.readFileSync('./db.json','utf-8') //json format needs to be barsed to js object
     return JSON.parse(todos) // now it is javascript array of objects
}
//add function 
function add(parsedOptions){
        const todosParsed = existingTodosParsed();
        if(todosParsed.length==0) id=1 
        else id = todosParsed[todosParsed.length-1].id +1 
        //const id = todosParsed.length==0 ? 1 : todosParsed.length+1 ;
        const newTodo = {
            id: id,
            title: parsedOptions.title,
            body: parsedOptions.body,
            checked: false,
        }
        todosParsed.push(newTodo);
        fs.writeFileSync('./db.json',JSON.stringify(todosParsed));
}

//list function 
function list(parsedOptions){
    const todosParsed = existingTodosParsed();
    if(todosParsed.length >= 1){
      if (parsedOptions.type=="checked"){
          todosParsed.filter(e=> {
              if (e.checked == true){
                  console.log(e.title)
                  console.log(e.body)
                  console.log("**************")
                  }
               });
        }       
      else if (parsedOptions.type=="unchecked"){
          todosParsed.filter(e=> {
              if (e.checked == false){
                    console.log(e.title)
                    console.log(e.body)
                    console.log("**************")
                  }
              });
        }
      else {
            todosParsed.filter(e=> {
                      console.log(e.title)
                      console.log(e.body)
                      console.log("**************")
                });
          }
    }
}

//edit function for body editing 
function edit(parsedOptions){
     const todosParsed = existingTodosParsed(); 
     const edited = todosParsed.map(e => {
        if(e.id == parsedOptions.id)
           e.body = parsedOptions.body 
        return e
     })
     fs.writeFileSync('./db.json',JSON.stringify(edited));
}

//add function 
function del(parsedOptions){
    const todosParsed = existingTodosParsed(); 
    const afterDel = todosParsed.filter(e => e.id != parsedOptions.id)
    fs.writeFileSync('./db.json',JSON.stringify(afterDel));
}

//check function 
function check(parsedOptions){
    const todosParsed = existingTodosParsed();
    todosParsed.map(e => {
       if(e.id == parsedOptions.id)
          e.checked = true 
    })
    fs.writeFileSync('./db.json',JSON.stringify(todosParsed));
}

//uncheck function 
function uncheck(parsedOptions){
    const todosParsed = existingTodosParsed();
    todosParsed.map(e => {
       if(e.id == parsedOptions.id)
          e.checked = false 
    })
    fs.writeFileSync('./db.json',JSON.stringify(todosParsed));
}

module.exports={
    parseArgs,add,list,del,check,edit,uncheck
}