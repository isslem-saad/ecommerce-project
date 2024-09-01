import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss'
})
export class VideoGalleryComponent implements OnInit {
  videos = [
    { src: 'assets/vid1.mp4', type: 'video/mp4' ,showLabel: false },
    { src: 'assets/vid2.mp4', type: 'video/mp4' ,showLabel: false},
    { src: 'assets/vid3.mp4', type: 'video/mp4',showLabel: false }
  ];

  constructor() { }
  ngOnInit(): void {
    this.showComingSoonLabel(1, 9000); 
  }

  showComingSoonLabel(index: number, delay: number): void {
    setTimeout(() => {
      this.videos[index].showLabel = true;
    }, delay);
  }
}
