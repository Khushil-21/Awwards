import { useRef } from "react";
import { useState } from "react";

export default function HeroSection() {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);

	const totalVideos = 3;
	const nextVideoRef = useRef(null);

	function handleMiniVdClick() {
		setHasClicked(true);
		setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
	}

	function handleVideoLoad() {
		setLoadedVideos((prevLoaded) => prevLoaded + 1);
	}

	const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

	return (
		<div className="h-dvh w-dvw relative">
			<div
				id="video-frame"
				className="relative z-10 h-dvh w-dvw overflow-hidden rounded-lg bg-blue-75"
			>
				<div>
					<div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
						<div
							onClick={handleMiniVdClick}
							className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
						>
							<video
								ref={nextVideoRef}
								src={getVideoSrc(currentIndex + 1)}
								onLoadedData={handleVideoLoad}
								autoPlay
								loop
								muted
								id="current-video"
								className="size-64 origin-center scale-150 object-cover object-center"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
