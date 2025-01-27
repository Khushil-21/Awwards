import { useRef } from "react";
import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

export default function HeroSection() {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);

	const totalVideos = 4;
	const nextVideoRef = useRef(null);
	const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

	function handleMiniVdClick() {
		setHasClicked(true);
		setCurrentIndex(upcomingVideoIndex);
	}

	function handleVideoLoad() {
		setLoadedVideos((prevLoaded) => prevLoaded + 1);
	}

	const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

	return (
		<div className="h-dvh w-dvw relative">
			<div
				id="video-frame"
				className="relative z-10 h-dvh w-dvw overflow-hidden bg-blue-75"
			>
				<div>
					<div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
						<div
							onClick={handleMiniVdClick}
							className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
						>
							<video
								ref={nextVideoRef}
								src={getVideoSrc(upcomingVideoIndex)}
								onLoadedData={handleVideoLoad}
								autoPlay
								loop
								muted
								id="current-video"
								className="size-64 origin-center scale-150 object-cover object-center"
							/>
						</div>
					</div>
					<video
						ref={nextVideoRef}
						src={getVideoSrc(currentIndex)}
						onLoadedData={handleVideoLoad}
						autoPlay
						muted
						loop
						id="next-video"
						className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
					/>
					<video
						src={getVideoSrc(currentIndex)}
						onLoadedData={handleVideoLoad}
						autoPlay
						muted
						loop
						className="absolute left-0 top-0 size-full object-cover object-center"
					/>
					<h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
						G<b>A</b>MING
					</h1>
					<div className="absolute left-0 top-0 z-40 size-full">
						<div className="mt-24 px-5 sm:px-10">
							<h1 className="special-font hero-heading text-blue-100">
								redefi<b>n</b>e
							</h1>

							<p className="mb-5 max-w-64 font-robert-regular text-blue-100">
								Enter the Metagame Layer <br /> Unleash the Play Economy
							</p>

							<Button
								id="watch-trailer"
								title="Watch trailer"
								leftIcon={<TiLocationArrow />}
								containerClass="bg-yellow-300 flex-center gap-1"
							/>
						</div>
					</div>
				</div>
			</div>
			<h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
				G<b>A</b>MING
			</h1>
		</div>
	);
}
