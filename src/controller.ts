import {
  NameRegistered as NameRegisteredEvent
} from "../generated/RegistrarController/RegistrarController"
import {
  Registration
} from "../generated/schema"

export function handleControllerNameRegistered(event: NameRegisteredEvent): void {
  let registration = Registration.load(event.params.label.toHex())
  if (registration != null) {
    registration.save()
  }
}
