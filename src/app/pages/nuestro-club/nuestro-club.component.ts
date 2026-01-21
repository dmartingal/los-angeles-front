import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CLUB_IMAGES } from './club-images';

@Component({
  selector: 'app-nuestro-club',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nuestro-club.component.html',
  styleUrl: './nuestro-club.component.css'
})
export class NuestroClubComponent implements OnInit, OnDestroy {
  clubImages = CLUB_IMAGES;
  activeIndex = 0;
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.clubImages.length;
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.clubImages.length) % this.clubImages.length;
  }

  goTo(index: number): void {
    this.activeIndex = index;
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.intervalId || this.clubImages.length < 2) {
      return;
    }
    this.intervalId = setInterval(() => this.next(), 4000);
  }

  private stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
