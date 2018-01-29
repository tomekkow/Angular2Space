import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pilot } from '../pilot';
import { PilotService } from '../pilot.service';
import { PilotValidators } from '../pilot-validators';
@Component({
  selector: 'app-pilot-form',
  templateUrl: './pilot-form.component.html',
  styleUrls: ['./pilot-form.component.css']
})
export class PilotFormComponent implements OnInit {
  pilot: Pilot;
  form: FormGroup;
  defaultAvatarUrl: string = Pilot.defaultImageUrl;

  constructor(private pilotService: PilotService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(this.onParamsChanged.bind(this));
  }
   onSubmit() {
    const editedPilot = new Pilot(this.form.value);
    editedPilot.id = this.pilot.id;
    this.pilotService.savePilot(editedPilot)
      .subscribe(this.onSaveSuccess.bind(this), this.onSaveFailure.bind(this));
  } 


  private onParamsChanged(params) {
    if (params.id) {
      this.pilotService.getPilot(params.id)
        .subscribe(this.onPilotFetched.bind(this), this.onFetchFailure.bind(this));
    } else {
      this.onPilotFetched(new Pilot());
    }
  }

  private onPilotFetched(pilot: Pilot) {
    this.pilot = pilot;
    this.form = this.formBuilder.group({
      firstName: [
        pilot.firstName,
        [Validators.required, PilotValidators.pilotName]
      ],
      lastName: [
        pilot.lastName,
        [Validators.required, PilotValidators.pilotName],
        PilotValidators.pilotUniq(this.pilot, this.pilotService)
      ],
        
      imageUrl: [pilot.imageUrl]
    })
  }

  private onFetchFailure(errorMessage: string) {
    alert(errorMessage);
  }
    private onSaveSuccess() {
    this.router.navigate(['/']);
  }

  private onSaveFailure(errorMessage: string) {
    alert(errorMessage);
  }
    
    
    
    
}