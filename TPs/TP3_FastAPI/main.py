from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

items = []


class Item(BaseModel):
    text: str
    is_done: bool = False


@app.get("/")
def root():
    return {"message": "Welcome to the To-Do API"}


@app.post("/items", response_model=Item)
def create_item(item: Item):
    items.append(item)
    return item


@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int) -> Item:
    if item_id < len(items):
        return items[item_id]
    else:
        raise HTTPException(status_code=404, detail=f"Item {item_id} not found")


@app.get("/items", response_model=list[Item])
def list_items(limit: int = 10):
    return items[0:limit]