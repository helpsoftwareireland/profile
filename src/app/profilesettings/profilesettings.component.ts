import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '../_services/profile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrls: ['./profilesettings.component.css']
})
export class ProfilesettingsComponent implements OnInit {
  public title = 'Profile';
  public user: IProfile;
  public name = '';
  public isLoading = true;
  public isSaving = false;
  public isError = false;
  msgError: any;
  constructor(private profile: ProfileService, private translate: TranslateService) { }
  ngOnInit() { this.getProfile(); }
  getProfile() {
    this.isLoading = true;
    this.isSaving = false;
    this.isError = false;
    this.profile.getProfileUser()
      .then(
        res => {
          console.log(res);
          if (res) {
            this.user = res;
            this.isLoading = !this.isLoading;
          }
        },
        msg => { // Error
          console.log(msg);
          this.getProfile();
        }
      );
  }
  changeName(val: string) {
    if (val !== this.user.firstName) { this.isError = false; }
  }
  saveProfile() {
    this.isSaving = true;
    this.isError = false;
    this.profile.setName(this.user.firstName, this.user.lastName)
      .then(
        res => {
          console.log(res);
          if (res) {
            this.setEmail();
          }
        },
        msg => { // Error
          this.isError = true;
          this.isSaving = false;
          this.msgError = msg.error;
        }
      );
  }
  setEmail() {
    this.profile.setEmail(this.user.firstName, this.user.lastName)
      .then(
        res => {
          console.log(res);
          if (res) {
            this.isSaving = false;
          }
        },
        msg => { // Error
          this.isError = true;
          this.isSaving = false;
          this.msgError = msg.error;
        }
      );
  }
  switchLanguage(language: string) {
    this.translate.use(language);
    this.getProfile();
  }
}
