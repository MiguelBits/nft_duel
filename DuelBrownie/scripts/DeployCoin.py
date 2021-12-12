from brownie import DuelCoin, accounts

def main():  
    DuelCoin.deploy("Test Token", "TST", 18, 1e23, {'from': accounts[0]})