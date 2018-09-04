import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreadMessageComponent } from './unread-message.component';

describe('UnreadMessageComponent', () => {
  let component: UnreadMessageComponent;
  let fixture: ComponentFixture<UnreadMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnreadMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreadMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
