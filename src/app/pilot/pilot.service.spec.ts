import { TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { PilotService } from './pilot.service';
import { Pilot } from './pilot';
import { Observable } from 'rxjs';

class FakeHttp {
  get() {}
  post() {}
  put() {}
}


fdescribe('PilotService', () => {
  let pilotService, httpService;
    
  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
        PilotService,
        {provide: Http, useClass: FakeHttp}
      ]
    });
    pilotService = TestBed.get(PilotService);
    httpService = TestBed.get(Http);
  });

  describe('getPilots', () => {
    let expectedCollection;

    beforeEach(() => {
      const pilotAttrs = {firstName: 'Mike', lastName: 'Tomsky'};
      spyOn(httpService, 'get').and.returnValue(Observable.of({json: () => [pilotAttrs]}));
      pilotService.getPilots().subscribe((pilots) => expectedCollection = pilots);
    });

    it('should make a request for pilots', () => {
      expect(httpService.get).toHaveBeenCalledWith('/api/pilots');
    });

    it('should return collection of pilots', () => {
   expect(expectedCollection[0] instanceof  Pilot).toBeTruthy();
    });
  });

  describe('getPilot', () => {
    let expectedPilot;

    beforeEach(() => {
      const pilotAttrs = {firstName: 'Mike', lastName: 'Tomsky'};
      spyOn(httpService, 'get').and.returnValue(Observable.of({json: () => pilotAttrs}));
      pilotService.getPilot(1).subscribe((pilot) => expectedPilot = pilot);
    });

    it('should make a request for pilot', () => {
      expect(httpService.get).toHaveBeenCalledWith('/api/pilots/1');
    });

    it('should return pilot object', () => {
      expect(expectedPilot instanceof  Pilot).toBeTruthy();
    
    });
  });
     describe('savePilot', () => {
    let pilot;

    describe('when pilot is persisted', () => {
      beforeEach(() => {
        pilot = new Pilot({id: 1, fullName: 'Mike Tomsky'});
        spyOn(httpService, 'put').and.returnValue(Observable.of({}));
        pilotService.savePilot(pilot);
      });

      it('should make post request', () => {
        expect(httpService.put).toHaveBeenCalledWith('/api/pilots/1', pilot);
      });
    });

    describe('when pilot is not persisted', () => {
      beforeEach(() => {
        pilot = new Pilot({id: null, fullName: 'Mike Tomsky'});
        spyOn(httpService, 'post').and.returnValue(Observable.of({}));
        pilotService.savePilot(pilot);
      });

      it('should make put request', () => {
        expect(httpService.post).toHaveBeenCalledWith('/api/pilots', pilot);
      });
    });
  });
  
});