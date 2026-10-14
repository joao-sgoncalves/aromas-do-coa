import { FaFacebook, FaInstagram } from "react-icons/fa6";

import { socials } from "@/content/site";

const links = [
  { href: socials.instagram, label: "Instagram", Icon: FaInstagram },
  { href: socials.facebook, label: "Facebook", Icon: FaFacebook },
];

/** The brand's social profiles as bare icons (official marks from react-icons). */
export function SocialLinks() {
  return (
    <ul className="-ml-2.5 flex gap-1">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink grid size-11 place-items-center opacity-75 transition-opacity hover:opacity-100"
          >
            <Icon size={20} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
