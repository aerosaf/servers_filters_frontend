import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

interface Server {
  model: string;
  storage: string;
  ram: string;
  hdd: string;
  hardDiskType: string;
  location: string;
  price: string;
}

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
  providers: [ServerService]
})
export class ServerListComponent implements OnInit {
  constructor(private serverService: ServerService) { }
  
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
  locationOptions: string[] = [];
  ramOptions: string[] = ['2GB', '4GB', '8GB', '12GB', '16GB', '24GB', '32GB', '48GB', '64GB', '96GB'];

 

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





