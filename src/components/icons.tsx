import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 11V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h5" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <circle cx="17" cy="17" r="3.5" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.8-4.8" />
    </Icon>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 3.5h3l2.6 11.2a1 1 0 0 0 1 .8h8.6" />
      <path d="M6.6 7h13.9l-1.7 6H8" />
      <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="19.5" r="1.4" fill="currentColor" />
    </Icon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1" />
    </Icon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20.5s-8-4.9-8-10.6A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8 2.6c0 5.7-8 10.6-8 10.6Z" />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function SmileIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 13.5a4.6 4.6 0 0 0 9 0Z" fill="currentColor" />
      <path d="M9 9.2v.6M15 9.2v.6" strokeWidth={2.6} />
    </Icon>
  );
}

export function GamepadIcon(props: IconProps) {
  return (
    <Icon strokeWidth={1.2} {...props}>
      <path d="M7.5 7h9a5 5 0 0 1 4.9 4.1l.9 4.6a2.4 2.4 0 0 1-4.2 2L16 15.5H8l-2.1 2.2a2.4 2.4 0 0 1-4.2-2l.9-4.6A5 5 0 0 1 7.5 7Z" />
      <path d="M7 10.5v3M5.5 12h3" />
      <circle cx="15.5" cy="11" r=".8" fill="currentColor" />
      <circle cx="17.8" cy="12.8" r=".8" fill="currentColor" />
    </Icon>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M22 4h14a14 14 0 0 1 14 14v6a14 14 0 0 1-14 14H22A14 14 0 0 1 8 24v-6A14 14 0 0 1 22 4Z"
        fill="#9BE01B"
      />
      <path
        d="M30 20h16a14 14 0 0 1 14 14v6a14 14 0 0 1-3 8.7V58l-7.600-4H30a14 14 0 0 1-14-14v-6a14 14 0 0 1 14-14Z"
        fill="#1D4AE8"
      />
      <circle cx="29" cy="37" r="3" fill="#fff" />
      <circle cx="38" cy="37" r="3" fill="#fff" />
      <circle cx="47" cy="37" r="3" fill="#fff" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 15 6-6 6 6" />
    </Icon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.600L12 17.500l-5.900 3.200 1.200-6.600L2.500 9.500l6.600-.9L12 2.500Z" />
    </Icon>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 13h2.500v5H5a1 1 0 0 1-1-1v-4ZM20 13h-2.500v5H19a1 1 0 0 0 1-1v-4Z" />
      <path d="M19 18v.5a2.500 2.500 0 0 1-2.500 2.500H13" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.500 7 8.500 6 8.500-6" />
    </Icon>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4v-6.500h2.300l.4-2.800H15V9.900c0-.8.3-1.400 1.500-1.400h1.300V6a15 15 0 0 0-2-.1c-2.100 0-3.500 1.300-3.500 3.600v2.200H10v2.800h2.300V21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    </Icon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Icon strokeWidth={2.4} {...props}>
      <rect x="3.500" y="3.500" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="3.600" />
      <circle cx="16.800" cy="7.200" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path
        fillRule="evenodd"
        d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1.500 7v7.500H9V10H6.500Zm1.250-3.600a1.400 1.400 0 1 0 0 2.800 1.400 1.400 0 0 0 0-2.800ZM11 10v7.500h2.500v-4c0-1 .6-1.600 1.400-1.600s1.100.6 1.100 1.600v4h2.500v-4.600c0-2-1.100-3.100-2.700-3.100-1 0-1.800.5-2.300 1.200V10H11Z"
      />
    </Icon>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.220 9.210 3.600l6.850-6.850C35.900 2.380 30.470 0 24 0 14.620 0 6.510 5.380 2.560 13.220l7.980 6.190C12.430 13.720 17.740 9.500 24 9.500z"
      />
      <path
        fill="#4285F4"
        d="M46.980 24.550c0-1.570-.15-3.090-.38-4.550H24v9.020h12.940c-.58 2.960-2.260 5.480-4.780 7.180l7.730 6c4.510-4.180 7.090-10.360 7.090-17.650z"
      />
      <path
        fill="#FBBC05"
        d="M10.530 28.590c-.48-1.450-.76-2.990-.76-4.590s.27-3.140.76-4.590l-7.980-6.190C.92 16.460 0 20.120 0 24c0 3.880.92 7.540 2.560 10.780l7.970-6.190z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.480 0 11.930-2.130 15.890-5.810l-7.730-6c-2.150 1.450-4.920 2.300-8.160 2.300-6.260 0-11.570-4.220-13.470-9.910l-7.980 6.190C6.510 42.620 14.620 48 24 48z"
      />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m15 6-6 6 6 6" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M12 11v6M12 7.200v.1"
        stroke="#fff"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

export function TrendIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
    </Icon>
  );
}
