import { FormControl } from '@angular/forms';
import { Pilot } from './pilot';
import { PilotService } from './pilot.service';

export class PilotValidators {
  static pilotName(formControl: FormControl) {
    return !formControl.value || /^[A-Z]/.test(formControl.value) ? null : {pilotName: {valid: false}};
  }

  static pilotUniq(pilot: Pilot, pilotService: PilotService) {
    return (formControl: FormControl) => {
      return pilotService.getPilotByLastName(formControl.value)
        .map((fetchedPilot) => (fetchedPilot && fetchedPilot.id !== pilot.id) ? {pilotUniq: {valid: false}} : null);
    }
  }
}