import {
  NameRegistered as NameRegisteredEvent,
  NameRenewed as NameRenewedEvent
} from "../generated/BaseRegistrar/BaseRegistrar"
import {
  Registration,
  NameRegistered,
  NameRenewed,
  Account,
  Domain
} from "../generated/schema"

export function handleNameRegistered(event: NameRegisteredEvent): void {
  let id = event.params.id.toHex()
  let registrantId = event.params.owner.toHex()

  // Ensure Account exists
  let registrant = Account.load(registrantId)
  if (!registrant) {
    registrant = new Account(registrantId)
    registrant.save()
  }

  // Ensure Domain exists
  let domainId = event.params.id.toHex()
  let domain = Domain.load(domainId)
  if (!domain) {
    domain = new Domain(domainId)
    domain.owner = registrant.id
    domain.subdomainCount = 0
    domain.isMigrated = true
    domain.createdAt = event.block.timestamp
    domain.save()
  }

  // Registration entity
  let registration = new Registration(id)
  registration.domain = domain.id
  registration.registrationDate = event.block.timestamp
  registration.expiryDate = event.params.expires
  registration.registrant = registrant.id
  registration.save()

  // NameRegistered event entity
  let nameRegistered = new NameRegistered(id)
  nameRegistered.registration = registration.id
  nameRegistered.blockNumber = event.block.number
  nameRegistered.blockTimestamp = event.block.timestamp
  nameRegistered.transactionHash = event.transaction.hash
  nameRegistered.registrant = registrant.id
  nameRegistered.expiryDate = event.params.expires
  nameRegistered.save()
}

export function handleNameRenewed(event: NameRenewedEvent): void {
  let id = event.params.id.toHex()
  let registration = Registration.load(id)
  if (registration != null) {
    registration.expiryDate = event.params.expires
    registration.save()
  }

  let nameRenewed = new NameRenewed(id)
  if (registration != null) {
    nameRenewed.registration = registration.id
  }
  nameRenewed.blockNumber = event.block.number
  nameRenewed.blockTimestamp = event.block.timestamp
  nameRenewed.transactionHash = event.transaction.hash
  nameRenewed.expiryDate = event.params.expires
  nameRenewed.save()
}
