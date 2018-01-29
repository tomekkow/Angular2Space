import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PilotValidators } from './pilot-validators';
import { Pilot } from './pilot';

fdescribe('PilotValidators', () => {
  describe('pilotName', () => {
    describe('when value is empty', () => {
      it('should return null', () => {
        const control = new FormControl('');
        expect(PilotValidators.pilotName(control)).toBeNull();
      });
    });

    describe('when starts from uppercase letter', () => {
      it('should return null', () => {
        const control = new FormControl('Adam');
        expect(PilotValidators.pilotName(control)).toBeNull();
      });
    });

    describe('when starts from lowcase letter', () => {
      it('should return validation object', () => {
        const control = new FormControl('adam');
        expect(PilotValidators.pilotName(control)).toEqual({pilotName: {valid: false}});
      });
    });
  });

 describe('pilotUniq', () => {
    let control, editedPilot, pilotService, testConfig, expectedResult, validator;

    beforeEach(() => {
      testConfig = { response: null };
      control = new FormControl('Adam');
      editedPilot = new Pilot({id: 1, firstName: 'Adama'});
      pilotService = {getPilotByLastName: () => Observable.of(testConfig.response)};
      validator = PilotValidators.pilotUniq(editedPilot, pilotService);
    });

    describe('when other pilot does not exist', () => {
      beforeEach(() => {
        testConfig.response = null;
        validator(control)
          .subscribe((result) => expectedResult = result);
      });

      it('should return observable with null', () => {
        expect(expectedResult).toBeNull();
      });
    });

    describe('when pilot exists', () => {
      describe('when pilot is same as edited', () => {
        beforeEach(() => {
          testConfig.response = editedPilot;
          validator(control)
            .subscribe((result) => expectedResult = result);
        });

        it('should return observable with null', () => {
          expect(expectedResult).toBeNull();
        });
      });

      describe('when pilot is different then edited', () => {
        beforeEach(() => {
          testConfig.response = new Pilot({id: 2, lastName: 'Adamek'});
          validator(control)
            .subscribe((result) => expectedResult = result);
        });

        it('should return observable with validation object', () => {
          expect(expectedResult).toEqual({pilotUniq: {valid: false}});
        });
      });
    });
  });
});