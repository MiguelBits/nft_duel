import json
from web3 import Web3, HTTPProvider


# truffle development blockchain address
blockchain_address = 'http://127.0.0.1:7545'
# Client instance to interact with the blockchain
web3 = Web3(HTTPProvider(blockchain_address))
# Set the default account (so we don't need to set the "from" for every transaction call)
web3.eth.defaultAccount = web3.eth.accounts[0]

compiled_contract_path = 'build/contracts/DuelCoin.json'
deployed_contract_address = '0xd8C4B517CA1c339A55Dc41008d788B80F8EFB84f'

with open(compiled_contract_path) as file:
    contract_json = json.load(file)  # load contract info as JSON
    contract_abi = contract_json['abi']

contract = web3.eth.contract(address=deployed_contract_address, abi=contract_abi)

result = contract.functions.setValue(69).transact() # use transact to store value in blockchain
print(result)
print(result.hex())
message = contract.functions.getValue().call()
print(message)