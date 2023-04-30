import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    private apiUrl = '/api';

    constructor(private http: HttpClient) { }

    getServers(): Observable<any> {
        return this.http.get(`/server/list`);
    }

    filterServers(filter: any): Observable<any> {
        let ramString = Object.keys(filter.ram).join(',');
        return this.http.get(`/server/list?minStorage=${filter.minStorage}&maxStorage=${filter.maxStorage}&ram=${ramString}&harddisk_type=${filter.harddiskType}&location=${filter.location}`)
    }

    locationOptions(): Observable<any> {
        return this.http.get(`/server/location`);
    }
}
export class Server {
    model: string;
    storage: string;
    ram: string;
    hdd: string;
    hardDiskType: string;
    location: string;
    price: string;

    constructor(model: string, storage: string, ram: string, hdd: string, hardDiskType: string, location: string, price: string) {
        this.model = model;
        this.storage = storage;
        this.ram = ram;
        this.hdd = hdd;
        this.hardDiskType = hardDiskType;
        this.location = location;
        this.price = price;
    }
}

