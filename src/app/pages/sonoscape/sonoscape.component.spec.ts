import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonoscapeComponent } from './sonoscape.component';

describe('SonoscapeComponent', () => {
  let component: SonoscapeComponent;
  let fixture: ComponentFixture<SonoscapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SonoscapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonoscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
