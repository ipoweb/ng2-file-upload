import { Component } from '@angular/core';
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploader } from './file-uploader.class';
import { FileUploadModule } from './file-upload.module';

@Component({
  selector: 'container',
  template: `<input type="file" ng2FileSelect [uploader]="uploader" [ng2FileSelectFilters]="filters" />`
})
export class ContainerComponent {
  public uploader:FileUploader = new FileUploader({url: 'localhost:3000'});
  public filters:any;
}

describe('Directive: FileSelectDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileUploadModule],
      declarations: [ContainerComponent],
      providers: [ContainerComponent]
    });
  });

  it('should be fine', inject([ContainerComponent], (fixture:ComponentFixture<ContainerComponent>) => {
    expect(fixture).not.toBeNull();
  }));

  it('should apply custom filters', () => {
    const fixture = TestBed.createComponent(ContainerComponent);
    const comp = fixture.componentInstance;
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    comp.filters = [{ name: 'acceptNone', fn: () => false }];
    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    Object.defineProperty(input, 'files', { value: [file] });
    input.dispatchEvent(new Event('change'));
    expect(comp.uploader.queue.length).toBe(0);
  });
});
