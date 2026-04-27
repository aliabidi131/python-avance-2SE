Pydantic Tutorial
Python’s Dynamic Typing Problem
How To Use Pydantic
Validating Data with Pydantic
Custom Field Validation
JSON Serialization
Pydantic vs Dataclasses
Python’s Dynamic Typing Problem
One of the biggest issues with Python as a programming language is the lack of static typing. Python uses dynamic typing , which means that when you create a variable you don’t have to declare it is type, example:

# Python
x = 10

# Java
int x = 10;
Once a Python variable is created, you can also override it with a different type:

x = 10
x = 'hello'
This does make it easier to get started with Python, but it can cause a lot of problems later on. For example, as your app gets bigger, it becomes harder and harder to keep of all your variables and what type they should be. But the biggest downside of using dynamic types is that it allows you to create an invalid object:

ali = Person("Ali", 24)    # Correct
ali = Person("Ali", "24")  # Mistake
Both of them might work at the beginning, Python will allow you to do this. But eventually, when you do try to use that age as a number, it will fail. This can be very hard to debug because the failure could occur any time in your program.

Python has a lot of tools you can use to solve these problems. This includes dataclasss,type-hinting and Pydantic library:

@dataclass
class Person:
    name: str
    age: str

# Using Pydantic
class Person(BaseModel):
    name: str
    email: EmailStr
    account_id: int
How To Use Pydantic
Pydantic is an external library that gives tools to model your data and solve all the problems mentioned above.

Pydantic is a data validation library in Python. It’s main benefits are that by modeling your data, you get:

IDE type Hints: better IDE support for type-hints and autocomplete.
Data validation: when you create an object, you can be 100% sure that it’s valid, and it won’t fail later.
JSON serialisation: easy way to serialize objects to JSON.
Installation
pip install pydantic
To create Pydantic model, first define a class that inherits from the BaseModel class:
from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    account_id: int
We can create an instance of the model:
user = User(
    name = "Salah",
    email = "[email protected]",
    account_id = 12345
)
Another way to create an instance of the model by unpacking a dictionary:
user_data = {
    'name': 'Salah',
    'email': '[email protected]',
    'account_id': 12345
}

user = User(**user_data)
If the data that you have passed in is valid, then the user object will be successfully created:
print(user.name)    # Salah
print(user.email)    # [email protected]
print(user.account_id)    # 12345
Validating Data with Pydantic
Pydantic also provides data validation right out of the box. This means that if you try to create an object with the wrong type of data, it will fail. This is good, because if your software has to fail, it’s better that it fails as early as possible. This will make it easier to debug.

Example, if you try to create a user with an account_id that’s not an integer, it will fail showing a validation error:
from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    account_id: int

# It will fail and show a validation error
user = User(name = 'Ali', email = 'ali@gmailcom', account_id = 'hello')
print(user)
We can also validate more complex types of data. For example, let’s validate that the email attribut of User class is an email, so let’s import EmailStr from pydantic and change the email type to EmailStr:
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str
    email: EmailStr     # pip install pydantic[email]
    account_id: int

# It will fail and show a validation error with email = 'ali'
user = User(name = 'Ali', email = 'ali', account_id = 1234)
print(user)
Custom Field Validation
If none of the inbuilt validation types cover you needs, you can also add custom validation logic to your model.

For example, let’s say that we want to enforce that all account IDs must be a positive number, so we don’t accept negative integers for account_id. For that import field_validator from pydantic and add the following function to User class:
@field_validator("account_id")
def validate_account_id(cls, value):
    if value <= 0:
        raise ValueError(f"account_id must be positive: {value}")
    return value
If you run the example with a negative account_id, you will get a validation error:
# you will get a validation error with account_id = -12
user = User(name = 'Ali', email = 'ali', account_id = -12)
print(user)
JSON Serialization
Another great thing about Pydantic is that it provides built-in support for JSON serialization, makes it easy to convert Pydantic models to or from JSON.

To convert a Pydantic model to JSON, you can call the model_dump_json() method on the model instance:
user_json_str = user.model_dump_json()
# this will return a JSON strinf representation of the model's data
print(user_json_str)
You will get some thing like this:
{"name": "Ali, "email": "[email protected]", "account_id": 1234}
And if you don’t want a JSON string, but you just want a plain Python dictionary object instead, you can use the model_dump method:
user_json_obj = user.model_dump()
If you have a JSON string that you want to convert back into a Pydantic model, you can use the parse_raw() method:
json_str = {"name": "Ali, "email": "ali@gmail.com", "account_id": 1234}
user = user.parse_raw(json_str)
Pydantic vs Dataclasses
If we compare Pydantic to Dataclasses, which is Python’s built’in module that solves a similar problem (data validation).

Python actually does ship with some data modeling and type hinting capabilities on its own.

For example, you can specify type hints like the following code:
# Python 3.6+
x: int = 0
y: str = "hello"
There is also an inbuilt module called dataclass in Python that lets you create a class with fields:
from dataclasses import dataclass

@dataclass
class User:
    name: str
    email: str
    account_id: int
It’s very similar to Pydantic, except instead of extending from a BaseModel class, we use @dataclass decorator instead.

Pydantic and Dataclass comparaison:
pydantic	dataclass
Type Hints	🟢	🟢
Data Validation	🟢	🔴
Serialisation	🟢	🟡
Built-in	🔴	🟢
By Wahid Hamdi