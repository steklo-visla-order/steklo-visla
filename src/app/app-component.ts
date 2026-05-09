import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { concat, filter, map, switchMap, timer } from 'rxjs';

@Component({
  selector: 'visla-root',
  imports: [RouterOutlet],
  templateUrl: './app-component.html',
  styleUrl: './app-component.scss',
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly splashPhase = signal<'on' | 'leaving' | 'off'>('on');

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        switchMap(() => {
          this.splashPhase.set('on');
          const leavingAfterMs = 200 + Math.floor(Math.random() * (520 - 200 + 1));

          return concat(
            timer(leavingAfterMs).pipe(map(() => 'leaving' as const)),
            timer(220).pipe(map(() => 'off' as const)),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((phase) => this.splashPhase.set(phase));
  }
}
