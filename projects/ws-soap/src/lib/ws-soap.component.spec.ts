import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsSoapComponent } from './ws-soap.component';

describe('WsSoapComponent', () => {
  let component: WsSoapComponent;
  let fixture: ComponentFixture<WsSoapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsSoapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsSoapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
