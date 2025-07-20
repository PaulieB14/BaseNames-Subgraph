import {
  NameRegistered as NameRegisteredEvent,
  NameRenewed as NameRenewedEvent
} from "../generated/BaseRegistrar/BaseRegistrar"
import {
  Registration,
  NameRegistered,
  NameRenewed
} from "../generated/schema"
import { createRegistrationID, createDomainID } from "./utils"

export function handleNameRegistered(event: NameRegisteredEvent): void {
  let registration = new Registration(createRegistrationID(event.params.id.toHexString()))
  registration.domain = createDomainID(event.params.id.toHexString())
  registration.registrationDate = event.block.timestamp
  registration.expiryDate = event.params.expires
  registration.registrant = event.params.owner.toHexString()
  registration.save()

  let nameRegistered = new NameRegistered(createRegistrationID(event.params.id.toHexString()))
  nameRegistered.registration = registration.id
  nameRegistered.blockNumber = event.block.number
  nameRegistered.transactionID = event.transaction.hash.toHexString()
  nameRegistered.registrant = event.params.owner.toHexString()
  nameRegistered.expiryDate = event.params.expires
  nameRegistered.save()
}

export function handleNameRenewed(event: NameRenewedEvent): void {
  let registration = Registration.load(createRegistrationID(event.params.id.toHexString()))
  if (registration != null) {
    registration.expiryDate = event.params.expires
    registration.save()
  }

  let nameRenewed = new NameRenewed(createRegistrationID(event.params.id.toHexString()))
  if (registration != null) {
    nameRenewed.registration = registration.id
  }
  nameRenewed.blockNumber = event.block.number
  nameRenewed.transactionID = event.transaction.hash.toHexString()
  nameRenewed.expiryDate = event.params.expires
  nameRenewed.save()
}
