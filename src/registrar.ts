import {
  NameRegistered as NameRegisteredEvent,
  NameRenewed as NameRenewedEvent,
  Transfer as TransferEvent
} from "../generated/BaseRegistrar/BaseRegistrar"
import {
  Registration,
  NameRegistered,
  NameRenewed,
  NameTransferred,
  RegistrationEvent,
  Domain,
  Account
} from "../generated/schema"
import { createEventID, createRegistrationID, createAccountID, createDomainID } from "./utils"

export function handleNameRegistered(event: NameRegisteredEvent): void {
  let account = new Account(createAccountID(event.params.owner))
  account.save()

  let registration = new Registration(createRegistrationID(event.params.label))
  registration.domain = createDomainID(event.params.label)
  registration.registrationDate = event.block.timestamp
  registration.expiryDate = event.params.expires
  registration.cost = event.params.cost
  registration.registrant = account.id
  registration.labelName = event.params.name
  registration.save()

  let nameRegistered = new NameRegistered(createEventID(event))
  nameRegistered.registration = registration.id
  nameRegistered.blockNumber = event.block.number
  nameRegistered.blockTimestamp = event.block.timestamp
  nameRegistered.transactionHash = event.transaction.hash
  nameRegistered.registrant = account.id
  nameRegistered.expiryDate = event.params.expires
  nameRegistered.save()
}

export function handleNameRenewed(event: NameRenewedEvent): void {
  let registration = Registration.load(createRegistrationID(event.params.label))
  if (registration != null) {
    registration.expiryDate = event.params.expires
    registration.save()

    let nameRenewed = new NameRenewed(createEventID(event))
    nameRenewed.registration = registration.id
    nameRenewed.blockNumber = event.block.number
    nameRenewed.blockTimestamp = event.block.timestamp
    nameRenewed.transactionHash = event.transaction.hash
    nameRenewed.expiryDate = event.params.expires
    nameRenewed.save()
  }
}

export function handleNameTransferred(event: TransferEvent): void {
  let account = new Account(createAccountID(event.params.to))
  account.save()

  let registration = Registration.load(event.params.tokenId.toString())
  if (registration != null) {
    registration.registrant = account.id
    registration.save()

    let nameTransferred = new NameTransferred(createEventID(event))
    nameTransferred.registration = registration.id
    nameTransferred.blockNumber = event.block.number
    nameTransferred.blockTimestamp = event.block.timestamp
    nameTransferred.transactionHash = event.transaction.hash
    nameTransferred.newOwner = account.id
    nameTransferred.save()
  }
} 