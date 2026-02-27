/** Full Frontline Financial logo — header; static file from public/images/logos */
export default function FrontlineLogoFull({ className = "h-10 w-auto", white, ...props }) {
  const src = "/images/logos/frontline-logo.svg?v=2";
  const imgClass = white ? `${className} brightness-0 invert` : className;

  return (
    <img
      src={src}
      alt="Frontline Financial"
      width={200}
      height={48}
      className={imgClass}
      {...props}
    />
  );
}
