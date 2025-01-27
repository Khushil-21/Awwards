import { useEffect, useRef } from "react";
import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [previousIndex, setPreviousIndex] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(1);

	const totalVideos = 4;
	const nextVideoRef = useRef(null);
	const mainVideoRef = useRef(null);
	const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

	function handleMiniVdClick() {
		setPreviousIndex(currentIndex);
		setHasClicked(true);
		setCurrentIndex(upcomingVideoIndex);
	}

	function handleVideoLoad() {
		setLoadedVideos((prevLoaded) => prevLoaded + 1);
	}

	const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

	useEffect(() => {
		if (loadedVideos === totalVideos) {
			setIsLoading(false);
		}
	}, [loadedVideos]);

	// GSAP Animations
	useGSAP(
		() => {
			if (hasClicked) {
				const tl = gsap.timeline();
				
				// Set initial visibility
				gsap.set("#next-video", {
					visibility: "visible",
				});

				// Expand the current preview to full screen
				tl.to("#next-video", {
					width: "100vw",
					height: "100vh",
					duration: 1,
					ease: "power1.inOut",
					onStart: () => nextVideoRef.current.play(),
					onComplete: () => {
						mainVideoRef.current.src = getVideoSrc(currentIndex);
						mainVideoRef.current.play();
					},
				});

				// Simultaneously animate the new preview from center
				tl.from("#preview-video", {
					scale: 0,
					duration: 1,
					ease: "power1.inOut",
				}, "<"); // The "<" makes this animation start at the same time as previous one
			}
		},
		{ dependencies: [currentIndex], revertOnUpdate: true }
	);

	useGSAP(() => {
		gsap.set("#video-frame", {
			clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
			borderRadius: "0% 0% 40% 10%",
		});
		gsap.from("#video-frame", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			borderRadius: "0% 0% 0% 0%",
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-frame",
				start: "center center",
				end: "bottom center",
				scrub: true,
			},
		});
	});

	return (
		<div className="h-dvh w-dvw relative">
			{isLoading && (
				<div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
					<div className="three-body">
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
					</div>
				</div>
			)}
			<div
				id="video-frame"
				className="relative z-10 h-dvh w-dvw overflow-hidden bg-blue-75"
			>
				<div>
					<div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
						<div
							onClick={handleMiniVdClick}
							className="origin-center opacity-0 transition-all duration-500 ease-in hover:opacity-100"
						>
							<video
								src={getVideoSrc(upcomingVideoIndex)}
								onLoadedData={handleVideoLoad}
								loop
                muted
								id="preview-video"
								className="size-64 origin-center object-cover object-center"
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
						ref={mainVideoRef}
						src={getVideoSrc(previousIndex)}
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
