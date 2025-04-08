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
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Serbian Culture</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Culture;
