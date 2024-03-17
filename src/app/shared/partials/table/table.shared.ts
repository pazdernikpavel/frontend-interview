import { Directive, HostBinding, input } from '@angular/core';

export type WidthInPX = `${number}px`;

export type TextAlign = 'left' | 'center' | 'right';

@Directive()
export class CommonTableInputs {
  public readonly appWidth = input<WidthInPX>();
  public readonly appAlign = input<TextAlign>('left');

  @HostBinding('style.width')
  public get cellWidth(): WidthInPX | string {
    return this.appWidth() || 'none';
  }

  @HostBinding('class.text-left')
  public get alignLeft(): boolean {
    return this.appAlign() === 'left';
  }

  @HostBinding('class.text-center')
  public get alignCenter(): boolean {
    return this.appAlign() === 'center';
  }

  @HostBinding('class.text-left')
  public get alignRight(): boolean {
    return this.appAlign() === 'right';
  }
}
