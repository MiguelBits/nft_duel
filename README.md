#Connecting Ganache to Moralis
https://www.youtube.com/watch?v=aRRS394is1U&t=18s

cd "C:\Users\mcvco\Downloads\DuelETH_Video_Tutorials-main\FRP_connect_ganache_to_moralis\"
frpc.exe -c frpc.ini

#Compile and Deploy Contracts
truffle compile
truffle migrate --reset