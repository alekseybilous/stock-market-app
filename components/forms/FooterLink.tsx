import Link from "next/link";

type FooterLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

const FooterLink = ({ linkText, text, href }: FooterLinkProps) => (
  <div className="text-center pt-4 ">
    <p className="text-sm text-gray-500">
      {text}{" "}
      <Link href={href} className="footer-link">
        {linkText}
      </Link>
    </p>
  </div>
);

export default FooterLink;
