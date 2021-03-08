import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  registro(){
    this.router.navigate(['/registro'])
  }
  inicio(){
    this.router.navigate(['/login'])
  }
}
