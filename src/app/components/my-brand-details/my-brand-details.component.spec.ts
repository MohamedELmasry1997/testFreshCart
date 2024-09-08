import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBrandDetailsComponent } from './my-brand-details.component';

describe('MyBrandDetailsComponent', () => {
  let component: MyBrandDetailsComponent;
  let fixture: ComponentFixture<MyBrandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBrandDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyBrandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
