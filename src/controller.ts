import {
  NameRegistered as NameRegisteredEvent
} from "../generated/RegistrarController/RegistrarController"
import {
  Registration,
  RegistrationEvent
} from "../generated/schema"
import { createEventID, createRegistrationID } from "./utils"

export function handleControllerNameRegistered(event: NameRegisteredEvent): void {
  let registration = Registration.load(createRegistrationID(event.params.label))
  if (registration != null) {
    registration.save()
  }
} 