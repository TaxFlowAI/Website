export default function WaveDivider({ fill = "#1C5472" }) {
  return (
    <div className="relative w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block h-12 w-full min-w-[1440px] md:h-16"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
