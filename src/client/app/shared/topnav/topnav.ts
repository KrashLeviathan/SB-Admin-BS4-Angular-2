import {Component, OnInit} from '@angular/core';
import {User} from '../user/user';
import {UserService} from '../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'top-nav',
  templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit {
  activeUserName: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getActiveUser()
      .then(user => this.activeUserName = (user !== null) ? user.displayName : null);
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
