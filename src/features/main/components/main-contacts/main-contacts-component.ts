import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import * as L from 'leaflet';

import { CONTACTS } from './constants/contacts.const';

@Component({
  selector: 'visla-main-contacts',
  imports: [],
  templateUrl: './main-contacts-component.html',
  styleUrl: './main-contacts-component.scss',
})
export class MainContactsComponent implements AfterViewInit, OnDestroy {
  readonly c = CONTACTS;

  private readonly mapHost = viewChild<ElementRef<HTMLElement>>('mapHost');
  private map: L.Map | null = null;
  private mapResizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    queueMicrotask(() => this.scheduleMapInit());
  }

  ngOnDestroy(): void {
    this.mapResizeObserver?.disconnect();
    this.mapResizeObserver = null;
    this.map?.remove();
    this.map = null;
  }

  /** Leaflet падает при 0×0 и при раннем invalidateSize — ждём реальный размер wrap. */
  private scheduleMapInit(attempt = 0): void {
    const el = this.mapHost()?.nativeElement;
    if (!el || this.map) {
      return;
    }
    const wrap = el.parentElement;
    const w = wrap?.clientWidth ?? el.clientWidth;
    const h = wrap?.clientHeight ?? el.clientHeight;
    if (w < 2 || h < 2) {
      if (attempt < 48) {
        requestAnimationFrame(() => this.scheduleMapInit(attempt + 1));
      }
      return;
    }
    this.initMap();
  }

  private invalidateMapSize(map: L.Map): void {
    const container = map.getContainer();
    if (!container.isConnected || container.clientWidth < 2 || container.clientHeight < 2) {
      return;
    }
    map.invalidateSize({ animate: false, pan: false });
  }

  private initMap(): void {
    const el = this.mapHost()?.nativeElement;
    if (!el || this.map) {
      return;
    }

    const { lat, lng, zoom } = CONTACTS.map;
    const { address } = CONTACTS;

    const map = L.map(el, {
      scrollWheelZoom: false,
    }).setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.icon({
      iconUrl: '/leaflet/marker-icon.png',
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      shadowUrl: '/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([lat, lng], { icon }).addTo(map).bindPopup(address);

    this.map = map;
    map.whenReady(() => {
      requestAnimationFrame(() => this.invalidateMapSize(map));
    });

    this.mapResizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        if (this.map === map) {
          this.invalidateMapSize(map);
        }
      });
    });
    this.mapResizeObserver.observe(el.parentElement ?? el);
  }
}
