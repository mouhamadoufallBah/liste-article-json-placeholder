import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleByUserComponent } from './list-article-by-user.component';

describe('ListArticleByUserComponent', () => {
  let component: ListArticleByUserComponent;
  let fixture: ComponentFixture<ListArticleByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArticleByUserComponent]
    });
    fixture = TestBed.createComponent(ListArticleByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
