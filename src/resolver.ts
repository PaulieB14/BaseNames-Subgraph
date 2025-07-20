import {
  AddrChanged as AddrChangedEvent,
  AddressChanged as AddressChangedEvent,
  ABIChanged as ABIChangedEvent,
  PubkeyChanged as PubkeyChangedEvent,
  TextChanged as TextChangedEvent,
  ContenthashChanged as ContenthashChangedEvent,
  InterfaceChanged as InterfaceChangedEvent,
  AuthorisationChanged as AuthorisationChangedEvent,
  VersionChanged as VersionChangedEvent
} from "../generated/L2Resolver/L2Resolver"
import {
  Resolver,
  AddrChanged,
  MulticoinAddrChanged,
  NameChanged,
  AbiChanged,
  PubkeyChanged,
  TextChanged,
  ContenthashChanged,
  InterfaceChanged,
  AuthorisationChanged,
  VersionChanged,
  ResolverEvent,
  Account
} from "../generated/schema"
import { createEventID } from "./utils"

export function handleAddrChanged(event: AddrChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    // Create or load the account
    let account = new Account(event.params.a.toHex())
    account.save()
    
    resolver.addr = account.id
    resolver.save()

    let addrChanged = new AddrChanged(createEventID(event.transaction.hash, event.logIndex))
    addrChanged.resolver = resolver.id
    addrChanged.blockNumber = event.block.number
    addrChanged.blockTimestamp = event.block.timestamp
    addrChanged.transactionHash = event.transaction.hash
    addrChanged.a = event.params.a
    addrChanged.save()
  }
}

export function handleMulticoinAddrChanged(event: AddressChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    let multicoinAddrChanged = new MulticoinAddrChanged(createEventID(event.transaction.hash, event.logIndex))
    multicoinAddrChanged.resolver = resolver.id
    multicoinAddrChanged.blockNumber = event.block.number
    multicoinAddrChanged.blockTimestamp = event.block.timestamp
    multicoinAddrChanged.transactionHash = event.transaction.hash
    multicoinAddrChanged.coinType = event.params.coinType
    multicoinAddrChanged.newAddress = event.params.newAddress
    multicoinAddrChanged.save()
  }
}

export function handleAbiChanged(event: ABIChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    let abiChanged = new AbiChanged(createEventID(event.transaction.hash, event.logIndex))
    abiChanged.resolver = resolver.id
    abiChanged.blockNumber = event.block.number
    abiChanged.blockTimestamp = event.block.timestamp
    abiChanged.transactionHash = event.transaction.hash
    abiChanged.contentType = event.params.contentType
    abiChanged.save()
  }
}

export function handlePubkeyChanged(event: PubkeyChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    let pubkeyChanged = new PubkeyChanged(createEventID(event.transaction.hash, event.logIndex))
    pubkeyChanged.resolver = resolver.id
    pubkeyChanged.blockNumber = event.block.number
    pubkeyChanged.blockTimestamp = event.block.timestamp
    pubkeyChanged.transactionHash = event.transaction.hash
    pubkeyChanged.x = event.params.x
    pubkeyChanged.y = event.params.y
    pubkeyChanged.save()
  }
}

export function handleTextChanged(event: TextChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    let textChanged = new TextChanged(createEventID(event.transaction.hash, event.logIndex))
    textChanged.resolver = resolver.id
    textChanged.blockNumber = event.block.number
    textChanged.blockTimestamp = event.block.timestamp
    textChanged.transactionHash = event.transaction.hash
    textChanged.indexedKey = event.params.indexedKey.toString()
    textChanged.key = event.params.key
    textChanged.save()
  }
}

export function handleContenthashChanged(event: ContenthashChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    resolver.contentHash = event.params.hash
    resolver.save()

    let contenthashChanged = new ContenthashChanged(createEventID(event.transaction.hash, event.logIndex))
    contenthashChanged.resolver = resolver.id
    contenthashChanged.blockNumber = event.block.number
    contenthashChanged.blockTimestamp = event.block.timestamp
    contenthashChanged.transactionHash = event.transaction.hash
    contenthashChanged.hash = event.params.hash
    contenthashChanged.save()
  }
}

export function handleInterfaceChanged(event: InterfaceChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    let interfaceChanged = new InterfaceChanged(createEventID(event.transaction.hash, event.logIndex))
    interfaceChanged.resolver = resolver.id
    interfaceChanged.blockNumber = event.block.number
    interfaceChanged.blockTimestamp = event.block.timestamp
    interfaceChanged.transactionHash = event.transaction.hash
    interfaceChanged.interfaceID = event.params.interfaceID
    interfaceChanged.implementer = event.params.implementer
    interfaceChanged.save()
  }
}

export function handleAuthorisationChanged(event: AuthorisationChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    let authorisationChanged = new AuthorisationChanged(createEventID(event.transaction.hash, event.logIndex))
    authorisationChanged.resolver = resolver.id
    authorisationChanged.blockNumber = event.block.number
    authorisationChanged.blockTimestamp = event.block.timestamp
    authorisationChanged.transactionHash = event.transaction.hash
    authorisationChanged.owner = event.params.owner
    authorisationChanged.target = event.params.target
    authorisationChanged.isAuthorized = event.params.isAuthorized
    authorisationChanged.save()
  }
}

export function handleVersionChanged(event: VersionChangedEvent): void {
  let resolver = Resolver.load(event.address.toHex())
  if (resolver != null) {
    let versionChanged = new VersionChanged(createEventID(event.transaction.hash, event.logIndex))
    versionChanged.resolver = resolver.id
    versionChanged.blockNumber = event.block.number
    versionChanged.blockTimestamp = event.block.timestamp
    versionChanged.transactionHash = event.transaction.hash
    versionChanged.version = event.params.newVersion
    versionChanged.save()
  }
} 