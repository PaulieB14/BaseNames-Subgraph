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
import { getKnownDomainName, buildDomainName, generateReadableName } from "./utils"
import { Bytes } from "@graphprotocol/graph-ts"

export function handleNameRegistered(event: NameRegisteredEvent): void {
  const id = event.params.id.toHex()
  const registrantId = event.params.owner.toHex()

  // Ensure Account exists
  let registrant = Account.load(registrantId)
  if (!registrant) {
    registrant = new Account(registrantId)
    registrant.save()
  }

  // Get the domain name from known mappings or generate a readable name
  const labelName = getKnownDomainName(id)
  const fullName = labelName != "" ? buildDomainName(labelName, "base") : generateReadableName(id, id) + ".base"

  // Ensure Domain exists
  const domainId = event.params.id.toHex()
  let domain = Domain.load(domainId)
  if (!domain) {
    domain = new Domain(domainId)
    domain.owner = registrant.id
    domain.labelName = labelName != "" ? labelName : generateReadableName(id, id)
    domain.name = fullName
    // Convert BigInt to Bytes for labelhash
    domain.labelhash = Bytes.fromByteArray(Bytes.fromBigInt(event.params.id))
    domain.subdomainCount = 0
    domain.isMigrated = true
    domain.createdAt = event.block.timestamp
    domain.save()
  } else {
    // Update existing domain with name if we found it
    if (labelName != "" || domain.name == null) {
      domain.labelName = labelName != "" ? labelName : generateReadableName(id, id)
      domain.name = fullName
      // Ensure labelhash is set
      domain.labelhash = Bytes.fromByteArray(Bytes.fromBigInt(event.params.id))
      domain.save()
    }
  }

  // Registration entity
  const registration = new Registration(id)
  registration.domain = domain.id
  registration.labelName = labelName != "" ? labelName : generateReadableName(id, id)
  registration.registrationDate = event.block.timestamp
  registration.expiryDate = event.params.expires
  registration.registrant = registrant.id
  registration.save()

  // NameRegistered event entity
  const nameRegistered = new NameRegistered(id)
  nameRegistered.registration = registration.id
  nameRegistered.blockNumber = event.block.number
  nameRegistered.blockTimestamp = event.block.timestamp
  nameRegistered.transactionHash = event.transaction.hash
  nameRegistered.registrant = registrant.id
  nameRegistered.expiryDate = event.params.expires
  nameRegistered.save()
}

export function handleNameRenewed(event: NameRenewedEvent): void {
  const id = event.params.id.toHex()
  const registration = Registration.load(id)
  if (registration != null) {
    registration.expiryDate = event.params.expires
    registration.save()

    // Only create NameRenewed event if registration exists
    const nameRenewed = new NameRenewed(id)
    nameRenewed.registration = registration.id
    nameRenewed.blockNumber = event.block.number
    nameRenewed.blockTimestamp = event.block.timestamp
    nameRenewed.transactionHash = event.transaction.hash
    nameRenewed.expiryDate = event.params.expires
    nameRenewed.save()
  }
  // If registration doesn't exist, we skip creating the NameRenewed event
  // This prevents the non-nullable field error
}
