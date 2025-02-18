import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechesService } from 'src/app/services/speeches.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent {

  api_toggle_showVideoOverlay: string = 'http://localhost:2003/api/toggle-show-video-overlay';
  api_toggle_showRecentSpeech: string = 'http://localhost:2003/api/toggle-show-recen-speech/';

  constructor(
    public user: UserService,
    private router: Router,
    public speechesService: SpeechesService,
    private toast: ToastService,
    private http: HttpClient,
  ) {}

  clear() {
    this.user.clearUser();
    this.speechesService.clearSelectedSpeechData();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  downloadQrCode(): void {
    const user = this.user.getUser();
    const qrCodeUrl = user.qrcode;
    const fileName = 'Quiet Rest - ' + user.firstName + ' ' + user.lastName + '.png';
    
    const anchor = document.createElement('a');
    anchor.href = qrCodeUrl;
    anchor.download = fileName;
    anchor.click();
  }

  copyID(): void {
    const userId = this.user.getUser().id;
    if (userId) {
      navigator.clipboard.writeText(userId).then(() => {
        this.toast.showToast('Your ID is copied successfully', 0, 'success');
      })
      .catch((err) => {
        this.toast.showToast('can not copy ID', 2, 'failed');
      });
    }
  }
  
  toggleVideoOverlayBoolean(): void {
    const userID = this.user.getUser().id;
    
    this.http.post(this.api_toggle_showVideoOverlay, { userID }).subscribe({
        next: (user: any) => {
          this.user.setUser(user);
        },
        error: (err) => {
          console.log(err);
          this.toast.showToast("An error occurred", 2, 'Try again');
        }
    });
  }


  toggleRecentSpeechBoolean(): void {
    const userID = this.user.getUser().id;
    
    this.http.post(this.api_toggle_showRecentSpeech, { userID }).subscribe({
        next: (user: any) => {
          this.user.setUser(user);
        },
        error: (err) => {
          console.log(err);
          this.toast.showToast("An error occurred", 2, 'Try again');
        }
    });
  }
  
}
