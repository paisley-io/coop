const MemberCard = ({ name, title, bio, avatar, twitter, website, linkedin, instagram, tiktok }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      {avatar && (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
      )}
      <h3 className="text-xl font-semibold text-center text-[#231F56]">{name}</h3>
      <p className="text-sm text-center text-gray-500">{title}</p>
      <p className="mt-3 text-sm text-gray-700 text-center">{bio}</p>

      {/* Social Links */}
      <div className="flex justify-center mt-4 space-x-4">
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
          </a>
        )}
        {tiktok && (
          <a href={tiktok} target="_blank" rel="noopener noreferrer">
            <img src="/icons/tiktok.svg" alt="TikTok" className="w-5 h-5" />
          </a>
        )}
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <img src="/icons/globe.svg" alt="Website" className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
