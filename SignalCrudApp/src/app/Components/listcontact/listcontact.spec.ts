import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listcontact } from './listcontact';

describe('Listcontact', () => {
  let component: Listcontact;
  let fixture: ComponentFixture<Listcontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listcontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listcontact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
