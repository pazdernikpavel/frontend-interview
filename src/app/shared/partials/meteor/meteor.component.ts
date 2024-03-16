import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-meteor',
  templateUrl: './meteor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true,
})
export class MeteorComponent {
  public count = input(20);
  public meteorCount = computed(() => new Array(this.count()).fill(0));

  public randomizeLeftPosition(): string {
    return Math.floor(Math.random() * 800 - 600) + 'px';
  }

  public randomizeAnimationDelay(): string {
    return Math.random() * (0.8 - 0.2) + 0.2 + 's';
  }

  public randomizeAnimationDuration(): string {
    return Math.floor(Math.random() * (10 - 2) + 2) + 's';
  }
}
