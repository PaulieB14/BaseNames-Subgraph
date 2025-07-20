import {
  TransferSingle as TransferSingleEvent,
  TransferBatch as TransferBatchEvent
} from "../generated/NameWrapper/NameWrapper"
import {
  WrappedDomain,
  Domain,
  Account
} from "../generated/schema"
import { createWrappedDomainID, createAccountID } from "./utils"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleWrappedDomainTransfer(event: TransferSingleEvent): void {
  let account = new Account(createAccountID(event.params.to))
  account.save()

  let wrappedDomain = WrappedDomain.load(createWrappedDomainID(event.params.id))
  if (wrappedDomain == null) {
    wrappedDomain = new WrappedDomain(createWrappedDomainID(event.params.id))
    // For now, we'll need to create a placeholder domain or get the actual domain
    // This is a simplified approach - in a real implementation, you'd need to map the token ID to the actual domain
    let domainId = "placeholder-domain-" + event.params.id.toString()
    wrappedDomain.domain = domainId
    wrappedDomain.expiryDate = BigInt.fromI32(0) // Placeholder
    wrappedDomain.fuses = BigInt.fromI32(0) // Placeholder
    wrappedDomain.name = "" // Placeholder
  }
  wrappedDomain.owner = account.id
  wrappedDomain.save()
}

export function handleWrappedDomainBatchTransfer(event: TransferBatchEvent): void {
  let account = new Account(createAccountID(event.params.to))
  account.save()

  for (let i = 0; i < event.params.ids.length; i++) {
    let wrappedDomain = WrappedDomain.load(createWrappedDomainID(event.params.ids[i]))
    if (wrappedDomain == null) {
      wrappedDomain = new WrappedDomain(createWrappedDomainID(event.params.ids[i]))
      // For now, we'll need to create a placeholder domain or get the actual domain
      let domainId = "placeholder-domain-" + event.params.ids[i].toString()
      wrappedDomain.domain = domainId
      wrappedDomain.expiryDate = BigInt.fromI32(0) // Placeholder
      wrappedDomain.fuses = BigInt.fromI32(0) // Placeholder
      wrappedDomain.name = "" // Placeholder
    }
    wrappedDomain.owner = account.id
    wrappedDomain.save()
  }
} 