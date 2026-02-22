import React, { FC } from "react";

interface SocialsListProps {
  className?: string;
  itemClass?: string;
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: "📘" },
  { name: "Twitter", href: "#", icon: "🐦" },
  { name: "Instagram", href: "#", icon: "📷" },
  { name: "LinkedIn", href: "#", icon: "💼" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300",
}) => {
  return (
    <div className={`flex space-x-2.5 ${className}`}>
      {socialLinks.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={itemClass}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
        >
          <span>{item.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialsList;













