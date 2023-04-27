import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServerListComponent } from './server-list.component';
import { ServerService } from '../services/server.service';

describe('ServerListComponent', () => {
  let component: ServerListComponent;
  let fixture: ComponentFixture<ServerListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ServerListComponent],
      providers: [ServerService],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all servers with empty filters', () => {
    const mockServers = [
      {
        "model": "Dell R210Intel Xeon X3440",
        "ram": "16GBDDR3",
        "hdd": "2x2TBSATA2",
        "hardDiskType": "SATA2",
        "storage": "4000",
        "location": "AmsterdamAMS-01",
        "price": "\u20ac49.99" 
      },
      { 
        "model": "HP DL180G62x Intel Xeon E5620",
        "ram": "32GBDDR3",
        "hdd": "8x2TBSATA2",
        "hardDiskType": "SATA2",
        "storage": "16000",
        "location": "AmsterdamAMS-01",
        "price": "\u20ac119.00"
      }
    ];

    component.getServerList();

    const req = httpMock.expectOne('http://127.0.0.1:8000/server/list');
    expect(req.request.method).toEqual('GET');

    req.flush({ data: mockServers });
    expect(component.servers).toEqual(mockServers);
  });
});
