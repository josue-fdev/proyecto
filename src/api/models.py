from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(250), unique=True, nullable=False)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    myFood = db.relationship("MyFood", lazy=True)
    
    
    def __repr__(self):
        return '<User %r>' % self.id

    def serialize_user(self):
        return {
            "id": self.id,
            "user_name" : self.user_name,
            "first_name" : self.first_name,
            "last_name" : self.last_name,
            "email": self.email,
            "RRSS": self.RRSS,

            # do not serialize the password, its a security breach
        }



class MyFood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    dish_name = db.Column(db.String(250), nullable=False)

    def __repr__(self):
        return '<MyFood %r>' % self.id

    def serialize_MyFood(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "dish_name": self.dish_name
        }

    def check_existance(self, variable, Pizzas, MyFood):
        pizzas = list(filter(lambda x : x["name"]==variable, pizzas))
        myFood = list(filter(lambda x : x==variable, myFood))
        return variable if  len(pizzas) > 0 and len(myFood)==0 else None



    
class Pizzas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    
    

    def __repr__(self):
        return '<Pizzas %r>' % self.id

    def serialize_Pizzas(self):
        return {
            "id": self.id,
            "name": self.name  
        }

    
    

