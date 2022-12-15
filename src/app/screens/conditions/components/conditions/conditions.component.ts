import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit {

  settings:any
  loading=true
  constructor(private settingsService:SettingsService,
    private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('الشروط  والأحكام')
    this.settingsService.getSettings().subscribe(
      (res:any) => {
        this.settings=res?.data?.description
        this.loading=false
      }
    )
  }

}
