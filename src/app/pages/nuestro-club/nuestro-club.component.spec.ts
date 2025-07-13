import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestroClubComponent } from './nuestro-club.component';

describe('NuestroClubComponent', () => {
  let component: NuestroClubComponent;
  let fixture: ComponentFixture<NuestroClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestroClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestroClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
