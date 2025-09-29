import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderedWindow } from './rendered-window';

describe('RenderedWindow', () => {
  let component: RenderedWindow;
  let fixture: ComponentFixture<RenderedWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderedWindow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderedWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
