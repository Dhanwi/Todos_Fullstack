const express = require("express");
const fs = require("fs");
const app = express();

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://todofrontend-xi-bay.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));


/************  part1 ****************/

// app.get("/", (req, res)=>{
//     res.send("successfull")
// })

// app.get("/add/:a/:b", (req, res)=>{
//     const params = req.params;
//     const y = Number(params.a) + Number(params.b);
//     res.send(y)
// })
// app.post("/add/:a/:b", (req, res)=>{
//     const params = req.params
//     const x = Number(params.a) + Number(params.b)
//     res.send(x)
// })
// app.post("/add", (req, res)=>{ // query parameter is written in key value pair in url itself
// url -> https//localhost:3000?a=2&b=3
//     const query = req.query
//     const x = Number(query.a) + Number(query.b)
//     res.send(x)
// })


/************  part2 (normal storing in array instead of db) ****************/

// let items = [];
// app.post("/addTodos", (req, res)=>{
//     const {id, todos, date, priority} = req.body;
//     const newItem = {id, todos, date, priority};
//     items.push(newItem);
//     res.status(201).json({message: "successfully created", data: {id, todos, date, priority}})
//     // res.status(201).json({message: "successfully created", data: newItem})

// })

// app.get("/addTodos", (req, res)=>{
//     res.json({items})
// })
// app.put("/addTodos", (req,res)=>{
//     const {id, todos, date, priority} = req.body;
//     const idx = items.findIndex(item=>item.id == id)
//     if(idx == -1) return res.status(404)

//     items[idx] = {id, todos, date, priority}
//     res.json({message: "updated", data: items[idx]})
// })

// app.delete("/addTodos" , (req,res)=>{
//     const {id, todos, date, priority} = req.body;
//     items = items.filter((todo)=>todo.id !== id)
//     res.json({items})
// })


/************  part2 (now storing in file instead of db) ****************/

app.post("/addTodos", (req,res)=>{
    const body = req.body;
    const allTodos = fs.readFileSync('./todos.txt')
    const parsedAllTodos = JSON.parse(allTodos);
    parsedAllTodos.push({...body, id:parsedAllTodos.length + 1});
    fs.writeFileSync('./todos.txt', JSON.stringify(parsedAllTodos))
    res.send("created successfully")
})

app.get("/addTodos", (req,res)=>{
    const todos = fs.readFileSync("./todos.txt", "utf-8")
    const todosParsed = JSON.parse(todos)
    res.json(todosParsed)
})

app.put("/addTodos", (req,res)=>{
    const body = req.body;
    const todos = fs.readFileSync('./todos.txt', 'utf-8')
    const parsedTodos = JSON.parse(todos);
    parsedTodos.map((todo)=>{
        if(todo.id == body.id){
            todo.todos = body.todos
            todo.date = body.date
            todo.priority = body.priority
        }
    })
    fs.writeFileSync('./todos.txt', JSON.stringify(parsedTodos))
    res.send("updated successfully")
})

app.delete("/addTodos/:id", (req,res)=>{
    const params = req.params;
    console.log(params.id)
    const todos = fs.readFileSync('./todos.txt', 'utf-8')
    const parsedTodos = JSON.parse(todos)
    const newTodos = parsedTodos.filter((todo)=>
        todo.id != params.id
    )
    console.log(newTodos)
    fs.writeFileSync('./todos.txt', JSON.stringify(newTodos))
    res.send("deleted successfully")
})

app.post('/todo/signUp', (req,res)=>{
    
    const credential = fs.readFileSync('./credentials.txt', 'utf-8');
    const parsedCredential = JSON.parse(credential || "[]"); // if not present then initialize with empty array
    
    const body = req.body;
    const newUser = {
        email: body.email,
        password: body.password,
        userName: body.userName
    }

    if(parsedCredential.some((user)=>user.email === newUser.email)){
       return res.send("user already exist")
    }
    
    parsedCredential.push(newUser);
    fs.writeFileSync('./credentials.txt', JSON.stringify(parsedCredential))
    res.send("user registered successfully");
})

app.listen(PORT, ()=>{
    console.log(`Successfully on running on http://localhost:${PORT}`)
})