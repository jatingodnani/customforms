import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to to-cyan-400 text-transparent hover:cursor-pointer bg-clip-text"
    >
      CustomFormify
    </Link>
  );
}

export default Logo;
