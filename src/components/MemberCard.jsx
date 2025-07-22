import React from "react";

const socialIcons = {
  instagram: "/icons/instagram.svg",
  tiktok: "/icons/tiktok.svg",
  twitter: "/icons/twitter.svg",
  youtube: "/icons/youtube.svg",
  linkedin: "/icons/linkedin.svg",
  // onlyfans: "/icons/glove.svg", // you can add it later if you want
};

const MemberCard = ({ name, title, bio, social = {} }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition duration-300">
      <h3 className="text-xl font-semibold text-[#231F56]">{name}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-sm mt-2 text-gray-700">{bio}</p>
      <div className="flex gap-3 mt-4">
        {Object.entries(socialIcons).map(([key, iconPath]) => (
          social[key] ? (
            <a
              key={key}
              href={social[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 hover:opacity-80 transition"
            >
              <img
                src={iconPath}
                alt={`${key} icon`}
                className="w-full h-full"
              />
            </a>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default MemberCard;
