import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaceShip } from '../ships/space-ship';
import { FighterShip} from '../ships/fighter-ship';
import { BomberShip} from '../ships/bomber-ship';
import { Pilot } from '../pilot/pilot';
import { PilotRoomComponent } from '../pilot/pilot-room/pilot-room.component';
import { SpaceShipService } from '../ships/space-ship.service';

@Component({
  selector: 'app-hangar',
  templateUrl: './hangar.component.html',
  styleUrls: ['./hangar.component.css']
})
export class HangarComponent implements OnInit {

    @ViewChild(PilotRoomComponent) pilotRoom: PilotRoomComponent;
  selectedPilot: Pilot = null;
ships$: Observable<SpaceShip[]>;
/*lub ship: ship[] = [];*/
     
  constructor(private spaceShipService: SpaceShipService) { }

  ngOnInit() {
    
    this.ships$ = this.spaceShipService.hangarShips$;
  }

  assignPilot(ship: SpaceShip) {
    ship.pilot = this.selectedPilot;
    this.pilotRoom.pilotLeave(this.selectedPilot);
    this.pilotRoom.selectPilot(null);
   }
 
  deassignPilot(ship: SpaceShip) {
    this.pilotRoom.pilotReturn(ship.pilot);
    ship.pilot = null;
  }
 }
     



