function Culture() {
  const insights = [
    {
      title: "Slava – The Family Patron Saint Day",
      description:
        "Slava is a unique Serbian Orthodox tradition where each family celebrates its patron saint with food, guests, and rituals. It’s passed down through generations.",
      image: "/images/slava.jpg",
    },
    {
      title: "Ćevapi and Serbian Cuisine",
      description:
        "Ćevapi are delicious grilled meat sausages and a national favorite. Serbian food blends Mediterranean and Eastern European flavors.",
      image: "/images/cevapi.jpg",
    },
    {
      title: "Kolo – Traditional Serbian Dance",
      description:
        "Kolo is a collective folk dance performed in a circle with traditional music. It's a huge part of Serbian cultural celebrations.",
      image: "/images/kolo.jpg",
    },
    {
      title: "Serbian Cyrillic",
      description:
        "Serbian is one of the few languages that uses both Cyrillic and Latin alphabets interchangeably. Schoolchildren learn both!",
      image: "/images/cyrillic.png",
    },
    {
      title: "Hospitality and Coffee Culture",
      description:
        "Serbs are known for their hospitality. Coffee isn't just a drink—it's a reason to gather and talk, often for hours.",
      image: "/images/kafic.jpg",
    },
    {
      title: "Guča Trumpet Festival",
      description:
        "Held every August in the small town of Guča, this world-famous brass band festival draws hundreds of thousands of visitors. It’s a celebration of music, dance, and Serbian spirit like no other.",
      image: "/images/guca.jpg",
    },
  ];

  return (
    <div className="culture-container">
      <div className="culture-grid">
        {insights.map((item, index) => (
          <div key={index} className="culture-card">
            <img src={item.image} alt={item.title} className="culture-image" />
            <div className="culture-content">
              <h2 className="culture-title">{item.title}</h2>
              <p className="culture-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Culture;
