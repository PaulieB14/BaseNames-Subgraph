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

export function handleWrappedDomainTransfer(event: TransferSingleEvent): void {
  let account = new Account(createAccountID(event.params.to))
  account.save()

  let wrappedDomain = new WrappedDomain(createWrappedDomainID(event.params.id))
  wrappedDomain.owner = account.id
  wrappedDomain.save()
}

export function handleWrappedDomainBatchTransfer(event: TransferBatchEvent): void {
  let account = new Account(createAccountID(event.params.to))
  account.save()

  for (let i = 0; i < event.params.ids.length; i++) {
    let wrappedDomain = new WrappedDomain(createWrappedDomainID(event.params.ids[i]))
    wrappedDomain.owner = account.id
    wrappedDomain.save()
  }
} 