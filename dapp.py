from flask import Flask, render_template,request

from web3 import Web3, HTTPProvider

app = Flask(__name__)

@app.route('/',methods = ['POST', 'GET'])
def index():
   
   return render_template("index.html")

@app.route('/collection')
def collection_page():
   return render_template("collection.html")

if __name__ == '__main__':
   app.run()