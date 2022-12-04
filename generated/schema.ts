// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Token must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get chainId(): BigInt {
    let value = this.get("chainId");
    return value!.toBigInt();
  }

  set chainId(value: BigInt) {
    this.set("chainId", Value.fromBigInt(value));
  }

  get name(): string | null {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (!value) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(<string>value));
    }
  }

  get symbol(): string | null {
    let value = this.get("symbol");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set symbol(value: string | null) {
    if (!value) {
      this.unset("symbol");
    } else {
      this.set("symbol", Value.fromString(<string>value));
    }
  }

  get coinKey(): string | null {
    let value = this.get("coinKey");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set coinKey(value: string | null) {
    if (!value) {
      this.unset("coinKey");
    } else {
      this.set("coinKey", Value.fromString(<string>value));
    }
  }

  get logoURI(): string | null {
    let value = this.get("logoURI");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set logoURI(value: string | null) {
    if (!value) {
      this.unset("logoURI");
    } else {
      this.set("logoURI", Value.fromString(<string>value));
    }
  }

  get decimals(): BigInt | null {
    let value = this.get("decimals");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set decimals(value: BigInt | null) {
    if (!value) {
      this.unset("decimals");
    } else {
      this.set("decimals", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class SwapEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SwapEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SwapEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SwapEvent", id.toString(), this);
    }
  }

  static load(id: string): SwapEvent | null {
    return changetype<SwapEvent | null>(store.get("SwapEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get fromAddress(): string {
    let value = this.get("fromAddress");
    return value!.toString();
  }

  set fromAddress(value: string) {
    this.set("fromAddress", Value.fromString(value));
  }

  get fromAmountUSD(): string | null {
    let value = this.get("fromAmountUSD");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fromAmountUSD(value: string | null) {
    if (!value) {
      this.unset("fromAmountUSD");
    } else {
      this.set("fromAmountUSD", Value.fromString(<string>value));
    }
  }

  get fromAmount(): string | null {
    let value = this.get("fromAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fromAmount(value: string | null) {
    if (!value) {
      this.unset("fromAmount");
    } else {
      this.set("fromAmount", Value.fromString(<string>value));
    }
  }

  get fromPriceUSD(): string | null {
    let value = this.get("fromPriceUSD");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fromPriceUSD(value: string | null) {
    if (!value) {
      this.unset("fromPriceUSD");
    } else {
      this.set("fromPriceUSD", Value.fromString(<string>value));
    }
  }

  get fromToken(): string {
    let value = this.get("fromToken");
    return value!.toString();
  }

  set fromToken(value: string) {
    this.set("fromToken", Value.fromString(value));
  }

  get toAddress(): string {
    let value = this.get("toAddress");
    return value!.toString();
  }

  set toAddress(value: string) {
    this.set("toAddress", Value.fromString(value));
  }

  get toAmountUSD(): string | null {
    let value = this.get("toAmountUSD");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set toAmountUSD(value: string | null) {
    if (!value) {
      this.unset("toAmountUSD");
    } else {
      this.set("toAmountUSD", Value.fromString(<string>value));
    }
  }

  get toAmount(): string | null {
    let value = this.get("toAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set toAmount(value: string | null) {
    if (!value) {
      this.unset("toAmount");
    } else {
      this.set("toAmount", Value.fromString(<string>value));
    }
  }

  get toPriceUSD(): string | null {
    let value = this.get("toPriceUSD");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set toPriceUSD(value: string | null) {
    if (!value) {
      this.unset("toPriceUSD");
    } else {
      this.set("toPriceUSD", Value.fromString(<string>value));
    }
  }

  get toToken(): string {
    let value = this.get("toToken");
    return value!.toString();
  }

  set toToken(value: string) {
    this.set("toToken", Value.fromString(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalValueSwapedUSD(): BigDecimal {
    let value = this.get("totalValueSwapedUSD");
    return value!.toBigDecimal();
  }

  set totalValueSwapedUSD(value: BigDecimal) {
    this.set("totalValueSwapedUSD", Value.fromBigDecimal(value));
  }

  get totalNumberSwaps(): BigInt {
    let value = this.get("totalNumberSwaps");
    return value!.toBigInt();
  }

  set totalNumberSwaps(value: BigInt) {
    this.set("totalNumberSwaps", Value.fromBigInt(value));
  }
}