import { afterNextRender, Component, DestroyRef, inject, Injector, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { concat, filter, map, Observable, switchMap, take, timer } from 'rxjs';

/** Совпадает с `transition` у `.app-splash--leaving` */
const SPLASH_LEAVE_MS = 220;

/** Не держим экран бесконечно, если картинки или сеть подвисли */
const IMAGE_WAIT_CAP_MS = 2500;

function waitForMinimalSettle(injector: Injector): Observable<void> {
  return new Observable<void>((subscriber) => {
    afterNextRender(
      () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            subscriber.next();
            subscriber.complete();
          });
        });
      },
      { injector },
    );
  });
}

function waitForRouteReady(injector: Injector): Observable<void> {
  return new Observable<void>((subscriber) => {
    afterNextRender(
      () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            void settleDomThenImages().then(
              () => {
                subscriber.next();
                subscriber.complete();
              },
              () => {
                subscriber.next();
                subscriber.complete();
              },
            );
          });
        });
      },
      { injector },
    );
  });
}

async function settleDomThenImages(): Promise<void> {
  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }

  const main = document.getElementById('main-content');
  if (!main) {
    return;
  }

  await Promise.race([
    waitForImages(main),
    new Promise<void>((resolve) => setTimeout(resolve, IMAGE_WAIT_CAP_MS)),
  ]);
}

function waitForImages(root: HTMLElement): Promise<void> {
  const imgs = Array.from(root.querySelectorAll('img'));
  if (imgs.length === 0) {
    return Promise.resolve();
  }

  return Promise.all(
    imgs.map((img) => {
      if (img.complete) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        const done = () => resolve();
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
    }),
  ).then(() => undefined);
}

@Component({
  selector: 'visla-root',
  imports: [RouterOutlet],
  templateUrl: './app-component.html',
  styleUrl: './app-component.scss',
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);

  readonly splashPhase = signal<'on' | 'leaving' | 'off'>('on');

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        switchMap((start) => {
          this.splashPhase.set('on');
          return this.router.events.pipe(
            filter(
              (e): e is NavigationEnd | NavigationCancel | NavigationError =>
                (e instanceof NavigationEnd ||
                  e instanceof NavigationCancel ||
                  e instanceof NavigationError) &&
                e.id === start.id,
            ),
            take(1),
            switchMap((e) =>
              e instanceof NavigationEnd
                ? waitForRouteReady(this.injector)
                : waitForMinimalSettle(this.injector),
            ),
            switchMap(() =>
              concat(
                timer(0).pipe(map(() => 'leaving' as const)),
                timer(SPLASH_LEAVE_MS).pipe(map(() => 'off' as const)),
              ),
            ),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((phase) => this.splashPhase.set(phase));
  }
}
