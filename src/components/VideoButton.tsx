import React from 'react';
import { Play } from 'lucide-react';

interface VideoButtonProps {
  videoUrl: string;
}

export const VideoButton: React.FC<VideoButtonProps> = ({ videoUrl }) =>
  videoUrl ? (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg
                 hover:bg-red-700 transform hover:-translate-y-0.5 transition-all duration-200
                 shadow-lg hover:shadow-xl font-semibold"
      aria-label="Watch recipe video on YouTube"
    >
      <Play className="w-5 h-5" aria-hidden="true" />
      Watch Video
    </a>
  ) : null;
