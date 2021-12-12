from flask import Flask, render_template,request
import json
from web3 import Web3, HTTPProvider

app = Flask(__name__)

@app.route('/',methods = ['POST', 'GET'])
def index():
   
   setvalue = request.form['set-value']
   setOnEthereum(setvalue)
   ethereumValue = getOnEthereum()

   return render_template("index.html", value = ethereumValue)


def getOnEthereum():
   blockchain_address = 'http://127.0.0.1:7545'
   # Client instance to interact with the blockchain
   web3 = Web3(HTTPProvider(blockchain_address))
   # Set the default account (so we don't need to set the "from" for every transaction call)
   web3.eth.defaultAccount = web3.eth.accounts[0]

   compiled_contract_path = 'build/contracts/DuelCoin.json'
   deployed_contract_address = '0x830F9011E10F27bD26061b39390D0949756eb317'

   with open(compiled_contract_path) as file:
      contract_json = json.load(file)  # load contract info as JSON
      contract_abi = contract_json['abi']
   
   #access contract
   contract = web3.eth.contract(address=deployed_contract_address, abi=contract_abi)

   result = contract.functions.getValue().call()

   return result

def setOnEthereum(setvalue):
   blockchain_address = 'http://127.0.0.1:7545'
   # Client instance to interact with the blockchain
   web3 = Web3(HTTPProvider(blockchain_address))
   # Set the default account (so we don't need to set the "from" for every transaction call)
   web3.eth.defaultAccount = web3.eth.accounts[0]

   compiled_contract_path = 'build/contracts/DuelCoin.json'
   deployed_contract_address = '0x830F9011E10F27bD26061b39390D0949756eb317'

   with open(compiled_contract_path) as file:
      contract_json = json.load(file)  # load contract info as JSON
      contract_abi = contract_json['abi']
   
   #access contract
   contract = web3.eth.contract(address=deployed_contract_address, abi=contract_abi)

   result = contract.functions.setValue(int(setvalue)).transact() # use transact to store value in blockchain

if __name__ == '__main__':
   app.run()