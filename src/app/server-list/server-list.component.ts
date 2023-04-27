import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

interface Server {
  model: string;
  ram: string;
  hdd: string;
  location: string;
  price: number;
}

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  filter: {
    minStorage: number;
    maxStorage: number;
    ram: any;
    harddiskType: string;
    location: string;
  } = {
    minStorage: 0,
    maxStorage: 24000,
    ram: [],
    harddiskType: '',
    location: ''
  };
  servers: Server[] = [];
  locationOptions: string[] = ['AmsterdamAMS-01', 'AmsterdamAMS-02', 'FrankfurtFRA-01', 'LondonLON-01', 'New YorkNYC-01', 'ParisCDG-01', 'San FranciscoSFO-01', 'SingaporeSIN-01', 'SydneySYD-01', 'TorontoYYZ-01'];
  ramOptions: string[] = ['2GB', '4GB', '8GB', '12GB', '16GB', '24GB', '32GB', '48GB', '64GB', '96GB'];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getServerList();
    this.getLocationOptions();
  }

  getServerList(): void {
    this.serverService.getServers().subscribe((data) => {
      this.servers = data.data;
    });
  }

  filterServers(): void {
    // Remove unchecked RAM options
    for (let option in this.filter.ram) {
      if (!this.filter.ram[option]) {
        delete this.filter.ram[option];
      }
    }
    if (this.filter.harddiskType === "" && !this.filter.ram && this.filter.location) {
      this.getServerList();
    } else {
      this.serverService.filterServers(this.filter).subscribe((data) => {
        this.servers = data.data;
      });
    }
  }

  getLocationOptions(): void {
    this.serverService.locationOptions().subscribe((data) => {
      this.locationOptions = data.data;
    });
  }
}





