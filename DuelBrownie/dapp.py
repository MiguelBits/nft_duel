from flask import Flask, render_template,request
import json
from web3 import Web3, HTTPProvider

app = Flask(__name__,static_url_path="/static")

blockchain_address = 'http://127.0.0.1:7545'
# Client instance to interact with the blockchain
web3 = Web3(HTTPProvider(blockchain_address))
# Set the default account (so we don't need to set the "from" for every transaction call)
web3.eth.defaultAccount = web3.eth.accounts[0]


#Get Compiled Contract
DuelToken_compiled_contract_path = 'build/contracts/DuelToken.json'
DuelToken_deployed_contract_address = '0x4534f7583AdC4DF45eCF0a58A3Ff3d0D345dF623'

with open(DuelToken_compiled_contract_path) as file:
   contract_json = json.load(file)  # load contract info as JSON
   DuelToken_contract_abi = contract_json['abi']


@app.route('/',methods = ['POST', 'GET'])
def index():
   
   #TODO only for demonstration purposes
   
   return render_template("index.html")

@app.route('/login',methods = ['POST'])
def login():
   #json request
   account = request.get_json()["address"]
   #lower case address to web3 address
   accountWeb3 = Web3.toChecksumAddress(account)
   #erc20 token
   address_balance = str(checkBalance(accountWeb3))
   return render_template("index.html", amount = address_balance)

def checkBalance(account):
   #access contract
   contract = web3.eth.contract(address=DuelToken_deployed_contract_address, abi=DuelToken_contract_abi)
   #access functions of contract
   result = contract.functions.balanceOf(account).call()

   return result

if __name__ == '__main__':
   app.run()