import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Pilot } from '../pilot';
import { PilotService } from '../pilot.service';

@Component({
  selector: 'app-pilot-room',
  templateUrl: './pilot-room.component.html',
  styleUrls: ['./pilot-room.component.css']
})
export class PilotRoomComponent implements OnInit {
  selectedPilot: Pilot = null;
  pilots: Pilot[] = [];
  fetchingPilots: boolean = false;

 @Output() onPilotSelect = new EventEmitter();
 
  constructor(private pilotService: PilotService) { }
    
   ngOnInit() {
   this.pilotService.getPilots()
     .subscribe(this.onGetSuccess.bind(this),
     this.onGetFailure.bind(this),
     this.onGetCompleted.bind(this));
  } 
    
    
    selectPilot(pilot: Pilot) {
    this.selectedPilot = pilot;
    this.onPilotSelect.emit(pilot);
  }

  pilotLeave(pilot: Pilot) {
    const pilotIndex = this.pilots.indexOf(pilot);
    this.pilots.splice(pilotIndex, 1);
  }

  pilotReturn(pilot: Pilot) {
    this.pilots.push(pilot);
  }
    private onGetSuccess(pilots: Pilot[]) {
    this.pilots = pilots;
  }

  private onGetFailure(errorMessage: string) {
    alert(errorMessage);
  }

  private onGetCompleted() {
    this.fetchingPilots = false;
  }
}