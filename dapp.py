from flask import Flask, render_template,request

from web3 import Web3, HTTPProvider

app = Flask(__name__)

@app.route('/',methods = ['POST', 'GET'])
def index():
   
   return render_template("index.html")

@app.route('/collections',methods = ['POST', 'GET'])
def collections():
   
   return render_template("collections.html")

if __name__ == '__main__':
   app.run()