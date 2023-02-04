from fastapi import FastAPI, Request, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
import json
import multiprocessing as mp
import sys
sys.path.append("..")

from .modelfiles import model as m
from .modelfiles.auth import auth_bearer as ab
from .modelfiles.auth import auth_handler as ah

todos = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]
app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
users = []
def check_user(data: m.UserLoginSchema):
    for user in users:
        if user.email == data.email and user.password == data.password:
            return True
    return False
app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return { "data": todos }


@app.post("/todo", tags=["todos"])
async def add_todo(todo: dict) -> dict:
    todos.append(todo)
    return {
        "data": { "Todo added." }
    }


@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: int, body: dict) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todo["item"] = body["item"]
            return {
                "data": f"Todo with id {id} has been updated."
            }

    return {
        "data": f"Todo with id {id} not found."
    }


@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: int) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todos.remove(todo)
            return {
                "data": f"Todo with id {id} has been removed."
            }

    return {
        "data": f"Todo with id {id} not found."
    }


# signup endpoint
@app.post("/signup",tags=["users"])
def create_user(user: m.UserSchema = Body(...)):
    users.append(user) 
    return ah.signJWT(user.email)

# login endpoint
@app.post("/login",tags=["users"])
def user_login(user: m.UserLoginSchema = Body(...)):
    if check_user(user):
        return ah.signJWT(user.email)
    return {
        "error": "Wrong login details!"
    }
    
# gauth endpoint
@app.post("/gauth",tags=["users"])
def user_login(cred=Body(...)):
    if users == []:
        return {
        "error": "empty users"
        }
    else:
        for user in users:
            if ah.signJWT(user.email)["access_token"] == cred['cred']:
                return True
    return False
    