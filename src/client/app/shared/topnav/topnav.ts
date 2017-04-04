import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'top-nav',
  templateUrl: 'topnav.html',
  styles: [`
    .topnav-user-name {
      margin-right: 3em;
    }

    .user-image {
      border-radius: 20px;
      width: 40px;
      position: fixed;
      right: 5px;
      border: solid 1px;
      top: 5px;
    }
  `]
})

export class TopNavComponent implements OnInit {
  activeUserName: string;
  activeUserImageUrl: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getActiveUser()
      .then(user => {
        this.activeUserName = (user !== null) ? user.displayName : null;
        this.activeUserImageUrl = user.imageURL;
      });
  }

  changeTheme(color: string): void {
    var link: any = $('<link>');
    link
      .appendTo('head')
      .attr({type: 'text/css', rel: 'stylesheet'})
      .attr('href', 'themes/app-' + color + '.css');
  }

  rtl(): void {
    var body: any = $('body');
    body.toggleClass('rtl');
  }

  sidebarToggler(): void {
    var sidebar: any = $('#sidebar');
    var mainContainer: any = $('.main-container');
    sidebar.toggleClass('sidebar-left-zero');
    mainContainer.toggleClass('main-container-ml-zero');
  }
}
