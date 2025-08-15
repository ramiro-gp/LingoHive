// src/components/LogoBee.jsx
export default function LogoBee({
  variant = 'yellow',
  className = ''
}) {

  const logoSources = {
    yellow: '/lingoHive/YellowBee.png',
    white: '/lingoHive/WhiteBee.png',
    black: '/lingoHive/BlackBee.png'
  };

  const imageSrc = logoSources[variant] || logoSources.yellow;

  return (
    <span className={`relative group ${className}`}>
      <img
        src={imageSrc}
        alt="Logo de LingoHive, una abeja con estilo."
        className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
      />
    </span>
  );
}