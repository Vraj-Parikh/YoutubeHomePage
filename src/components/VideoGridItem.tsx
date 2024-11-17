import { Dot, Check } from "lucide-react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimesAgo";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
const VIEW_FORMATTER = new Intl.NumberFormat("en-US", {
  notation: "compact",
});
type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    url: string;
    profileUrl: string;
    subscribers: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};
function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(duration);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleVideoEnd = () => {
    if (videoRef.current == null) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setVideoDuration(duration);
    const intervalId = setInterval(() => {
      setVideoDuration((prev) => (prev - 1 > 0 ? prev - 1 : 0));
    }, 1000);
  };
  useEffect(() => {
    if (videoRef.current == null) return;
    let intervalId: number | null = null;
    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      intervalId = setInterval(() => {
        setVideoDuration((prev) => (prev - 1 > 0 ? prev - 1 : 0));
      }, 1000);
      videoRef.current.addEventListener("ended", handleVideoEnd);
    } else {
      setVideoDuration(duration);
      videoRef.current.pause();
    }
    return () => {
      setVideoDuration(duration);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isVideoPlaying, duration]);

  return (
    <div className="flex flex-col gap-2 ">
      <div
        className="relative"
        onMouseEnter={() => setIsVideoPlaying(true)}
        onMouseLeave={() => setIsVideoPlaying(false)}
      >
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          className="aspect-video"
        >
          <img
            src={thumbnailUrl}
            className={twMerge(
              "block w-full h-full object-cover rounded-xl transition-[border-radius] duration-200",
              isVideoPlaying ? "rounded-none" : "rounded-xl"
            )}
          />
          <video
            ref={videoRef}
            src={videoUrl}
            className={twMerge(
              "block w-full h-full object-cover transition-opacity duration-200 inset-0 absolute z-20",
              isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
            )}
            muted
            playsInline
          />
          <div className="absolute bottom-1 right-2 z-30 bg-secondary-dark text-secondary px-0.5 text-sm rounded">
            <h1>{formatDuration(videoDuration)}</h1>
          </div>
        </a>
      </div>
      <div className="flex gap-2">
        <a href={channel?.url}>
          <img
            src={channel?.profileUrl}
            alt="channel logo"
            className="shrink-0 rounded-full size-9"
          />
        </a>
        <div className="flex-grow space-y-0.5">
          <a href={videoUrl}>
            <h1 className="font-semibold">{title}</h1>
          </a>
          <a
            href={channel?.url}
            className="flex gap-2 items-center font-semibold"
            title={channel?.name}
          >
            <h3>{channel?.name}</h3>
            {Number(channel?.subscribers) > 100000 && (
              <Check
                size={16}
                className="bg-gray-500 p-0.5 rounded-full text-white font-bold"
              />
            )}
          </a>
          <div className="flex items-center">
            <h3>{VIEW_FORMATTER.format(views)} views</h3>
            <Dot />
            <h3>{formatTimeAgo(postedAt)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGridItem;
