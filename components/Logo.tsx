import Link from "next/link";

export function Logo() {
  return <Link href="/" className="logo" aria-label="BuilderSignal home">
    <span className="logoMark" aria-hidden="true"><span></span><span></span><span></span></span>
    <span>Builder<span className="logoAccent">Signal</span></span>
  </Link>;
}
