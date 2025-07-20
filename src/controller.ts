import {
  NameRegistered as NameRegisteredEvent
} from "../generated/RegistrarController/RegistrarController"
import {
  Registration,
  Domain,
  Account
} from "../generated/schema"
import { buildDomainName } from "./utils"

export function handleControllerNameRegistered(event: NameRegisteredEvent): void {
  let labelName = event.params.name // This is the actual readable name!
  let labelhash = event.params.label
  let registrant = event.params.owner
  let expires = event.params.expires

  // Ensure Account exists
  let registrantId = registrant.toHex()
  let registrantAccount = Account.load(registrantId)
  if (!registrantAccount) {
    registrantAccount = new Account(registrantId)
    registrantAccount.save()
  }

  // Get or create Domain
  let domainId = labelhash.toHex()
  let domain = Domain.load(domainId)
  if (!domain) {
    domain = new Domain(domainId)
    domain.labelhash = labelhash
    domain.labelName = labelName
    domain.name = buildDomainName(labelName, "base")
    domain.owner = registrantAccount.id
    domain.subdomainCount = 0
    domain.isMigrated = true
    domain.createdAt = event.block.timestamp
    domain.save()
  } else {
    // Update existing domain with the readable name
    domain.labelName = labelName
    domain.name = buildDomainName(labelName, "base")
    domain.save()
  }

  // Update Registration
  let registrationId = labelhash.toHex()
  let registration = Registration.load(registrationId)
  if (registration != null) {
    registration.labelName = labelName
    registration.expiryDate = expires
    registration.save()
  }
}
