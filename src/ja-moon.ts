import { BigDecimal, BigInt, Bytes, ipfs, json, JSONValueKind, log } from "@graphprotocol/graph-ts"
import { JaMoon, Swap } from "../generated/JaMoon/JaMoon"
import { Account, SwapEvent, Token } from "../generated/schema"

interface tokenType {
  address: string;
  symbol: string;
  decimals: number;
  chainId: number;
  name: string;
  coinKey: string;
  priceUSD: string;
  logoURI: string;
}
interface dataType {
  id: string;
  fromChainId: number;
  fromAmountUSD: string;
  fromAmount: string;
  fromToken: tokenType;
  fromAddress: string;
  toChainId: number;
  toAmountUSD: string;
  toAmount: string;
  toToken: tokenType;
  toAddress: string;
  gasCostUSD: string;
  containsSwitchChain: boolean;
}


export function handleSwap(event: Swap): void {
  let cid = event.params.cid;
  let dataBytes = ipfs.cat(cid)
  if(!dataBytes) {
    log.info("no dataBytes",[])
    return;
  }
  let jsonData = json.fromBytes(dataBytes);
  // if(jsonData.kind != JSONValueKind.OBJECT) {
  //   return;
  // }

  let data = jsonData.toObject();
  if(!data) {
    return;
  }
  let fromAddress = data.get("fromAddress");
  let fromAmountUSD = data.get("fromAmountUSD")
  let toAddress = data.get("toAddress");
  let toAmountUSD = data.get("toAmountUSD")
  let fromTokenData = data.get("fromToken");


  if(!fromAddress || !fromAmountUSD || !toAddress || !toAmountUSD || !fromTokenData) {
    return;
  }
  log.info("fromAddress: {}",[fromAddress.toString()])


  let fromAccount = Account.load(fromAddress.toString());
  if(!fromAccount) {
    fromAccount = new Account(fromAddress.toString());
    fromAccount.totalValueSwapedUSD = new BigDecimal(BigInt.fromI64(0));
    fromAccount.totalNumberSwaps = BigInt.fromI32(0);
  }
  fromAccount.totalValueSwapedUSD = BigDecimal.fromString(fromAmountUSD.toString()).plus( fromAccount.totalValueSwapedUSD);
  fromAccount.totalNumberSwaps = BigInt.fromI32(1).plus(fromAccount.totalNumberSwaps);
  fromAccount.save();

  let toAccount = Account.load(toAddress.toString());
  if(!toAccount) {
    toAccount = new Account(toAddress.toString());
    toAccount.totalValueSwapedUSD = new BigDecimal(BigInt.fromI64(0));
    toAccount.totalNumberSwaps = BigInt.fromI32(0);
  }
  if(toAccount.id != fromAccount.id){
    toAccount.totalValueSwapedUSD = BigDecimal.fromString(toAmountUSD.toString()).plus( toAccount.totalValueSwapedUSD);
    toAccount.totalNumberSwaps = BigInt.fromI32(1).plus(toAccount.totalNumberSwaps);
    toAccount.save();
  }

  let fromTokenObj = fromTokenData.toObject();
  let fromTokenObjAddress = fromTokenObj.get("address");
  let fromTokenObjChainId = fromTokenObj.get("chainId");
  let fromTokenObjName = fromTokenObj.get("name");
  let fromTokenObjSymbol = fromTokenObj.get("symbol");
  let fromTokenObjDecimals = fromTokenObj.get("decimals");
  let fromTokenObjCoinKey = fromTokenObj.get("coinKey");
  let fromTokenObjPriceUSD = fromTokenObj.get("priceUSD");
  let fromTokenObjLogoURI = fromTokenObj.get("logoURI");


  if(!fromTokenObjAddress || !fromTokenObjChainId || !fromTokenObjName || !fromTokenObjSymbol || !fromTokenObjDecimals || !fromTokenObjCoinKey || !fromTokenObjPriceUSD || !fromTokenObjLogoURI) {
    return;
  }
  log.info("fromTokenObjAddress: {}",[fromTokenObjAddress.toString()])



  let fromTokenId = fromTokenObjChainId.toBigInt().toString()+"-"+fromTokenObjAddress.toString();
  let fromToken = Token.load(fromTokenId)
  if(!fromToken) {
    fromToken = new Token(fromTokenId);
    fromToken.address = fromTokenObjAddress.toString();
    fromToken.chainId = fromTokenObjChainId.toBigInt();
    fromToken.name = fromTokenObjName.toString();
    fromToken.symbol = fromTokenObjSymbol.toString();
    fromToken.coinKey = fromTokenObjCoinKey.toString();
    fromToken.logoURI = fromTokenObjLogoURI.toString();
    fromToken.decimals = fromTokenObjDecimals.toBigInt();

  }
  fromToken.save()


  let toTokendata = data.get("toToken");
  if(!toTokendata) {
    return;
  }
  let toTokenObj = toTokendata.toObject()
  let toTokenObjChainId = toTokenObj.get("chainId");
  let toTokenObjAddress = toTokenObj.get("address");
  let toTokenObjName = toTokenObj.get("name");
  let toTokenObjSymbol = toTokenObj.get("symbol");
  let toTokenObjDecimals = toTokenObj.get("decimals");
  let toTokenObjCoinKey = toTokenObj.get("coinKey");
  let toTokenObjPriceUSD = toTokenObj.get("priceUSD");
  let toTokenObjLogoURI = toTokenObj.get("logoURI");

  if(!toTokenObjAddress || !toTokenObjChainId || !toTokenObjName || !toTokenObjSymbol || !toTokenObjDecimals || !toTokenObjCoinKey || !toTokenObjPriceUSD || !toTokenObjLogoURI) {
    return;
  }
  log.info("toTokenObjAddress: {}",[toTokenObjAddress.toString()])


  let toTokenId = toTokenObjChainId.toBigInt().toString()+"-"+toTokenObjAddress.toString();
  let toToken = Token.load(toTokenId)
  if(!toToken) {
    toToken = new Token(toTokenId);
    toToken.address = toTokenObjAddress.toString();
    toToken.chainId = toTokenObjChainId.toBigInt();
    toToken.name = toTokenObjName.toString();
    toToken.symbol = toTokenObjSymbol.toString();
    toToken.coinKey = toTokenObjCoinKey.toString();
    toToken.logoURI = toTokenObjLogoURI.toString();
    toToken.decimals = toTokenObjDecimals.toBigInt();
  }
  toToken.save()

  let id = data.get("id")
  let fromAmount = data.get("fromAmount")
  let toAmount = data.get("toAmount")
  let fromPriceUSD = fromTokenObj.get("priceUSD")
  let toPriceUSD = toTokenObj.get("priceUSD")

  if(!id || !fromAmount || !toAmount || !fromPriceUSD || !toPriceUSD) {
    return;
  }
  log.info("id: {}",[id.toString()])

  let swap = new SwapEvent(id.toString());
  swap.timestamp = event.block.timestamp;
  swap.fromAddress = fromAddress.toString();
  swap.toAddress = toAddress.toString();
  swap.fromToken = fromTokenId;
  swap.toToken = toTokenId;
  swap.fromAmountUSD = fromAmountUSD.toString();
  swap.fromAmount = fromAmount.toString();
  swap.toAmountUSD = toAmountUSD.toString();
  swap.toAmount = toAmount.toString();
  swap.fromPriceUSD = fromPriceUSD.toString();
  swap.toPriceUSD = toPriceUSD.toString();

  swap.save();

  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())

  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())

  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }

  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // // Entity fields can be set based on event parameters
  // entity.cid = event.params.cid

  // // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}
