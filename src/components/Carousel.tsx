import React, { useState, useEffect, useCallback } from 'react';
import {  MessageSquare } from 'lucide-react';
import tea1 from "../assets/1_tea.jpg";
import tea2 from "../assets/2_tea.jpg";
import tea5 from "../assets/5_tea.jpg";
import tea8 from "../assets/08_tea.jpg";
import tea9 from "../assets/9_tea.jpg";
import tea19 from "../assets/19_tea.jpg";
import tea33 from "../assets/33_tea.jpg";

interface CarouselProps {
  onChatClick: () => void;
}

interface TeaItem {
  id: string;
  title: string;
  topic: string;
  description: string;
  image: string;
}

const teaItems: TeaItem[] = [
  {
    id: '01',
    title: "1° Ilam Loose Leaf Black Tea",
    topic: "Loose Leaf Black Tea",
    description: "Sourced from Nepal's pristine Ilam region, this high-altitude tea delivers a smooth, aromatic flavor with a light-to-medium body. Ideal for plain sipping, chai, or iced tea, it's a versatile choice for any tea enthusiast.",
    image: tea1,
  },
  {
    id: '02',
    title: "2° Yak Mountain Loose Leaf Chai Tea",
    topic: "Black Tea Spice Blend",
    description: "A delicate and refreshing green tea sourced from the lush hills of Nepal. This tea features a smooth, grassy flavor profile with subtle floral notes, perfect for a calming sip. Grown at high altitudes, it offers a rich dose of antioxidants and catechins, supporting overall health and wellness.",
    image: tea2,
  },
  {
    id: '03',
    title: "5° Tulsi Tea (Sacred Basil Tea)",
    topic: "Tisane",
    description: "A soothing herbal blend inspired by Ayurveda, combining the earthy, aromatic notes of tulsi (sacred basil) with a hint of spice. Known for its calming properties.",
    image: tea5,
  },
  {
    id: '04',
    title: "08° Rose Black Tea",
    topic: "Black Tea Blend",
    description: "A delightful blend of premium black tea and fragrant Himalayan rose petals, offering a harmonious balance of bold and floral flavors. Perfect for a calming, aromatic experience.",
    image: tea8,
  },
  {
    id: '05',
    title: "09° Signature Golden Tips Tea",
    topic: "Black Tea",
    description: "A luxurious white tea handpicked from the high-altitude Himalayan gardens of Nepal. With its delicate, floral aroma and a smooth, velvety finish.",
    image: tea9,
  },
  {
    id: '06',
    title: "19° Himalayan Green Tea",
    topic: "White Tea",
    description: "A bold and invigorating black tea blend infused with traditional Himalayan spices like cardamom, cinnamon, and cloves. Perfect for crafting a rich, spiced chai latte or enjoying on its own. This tea offers a warm, aromatic experience, perfect for cozy moments or a pick-me-up.",
    image: tea19,
  },
  {
    id: '07',
    title: "33° Silver Needle Tea",
    topic: "Gold",
    description: "A rare and exquisite white tea crafted from the youngest buds of high-altitude tea gardens in Nepal. This tea features a delicate, sweet flavor with subtle floral and fruity notes, offering a luxurious and refreshing experience. Packed with antioxidants, it’s a healthful indulgence for any tea lover.",
    image: tea33,
  }
];

const Carousel: React.FC<CarouselProps> = ({ onChatClick }) => {
  const [items, setItems] = useState(teaItems);
  const [showDetail, setShowDetail] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  const rotateItems = useCallback((type: 'next' | 'prev') => {
    setDirection(type);
    setTimeout(() => {
      setItems(prevItems => {
        if (type === 'next') {
          const [first, ...rest] = prevItems;
          return [...rest, first];
        } else {
          const last = prevItems[prevItems.length - 1];
          return [last, ...prevItems.slice(0, -1)];
        }
      });
      setDirection(null);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showDetail) {
        rotateItems('next');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [rotateItems, showDetail]);

  return (
    <div className="relative min-h-screen md:h-[800px] overflow-hidden bg-gradient-to-b from-[#F4F4F4] to-white">
      <div className="absolute w-[95%] md:w-[90%] max-w-[1140px] h-[90%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute left-0 w-full md:w-[85%] h-full transition-all duration-500
              ${index === 1 ? 'z-10 translate-x-0 opacity-100' : ''}
              ${index === 2 ? 'translate-x-[25%] md:translate-x-1/2 translate-y-[5%] scale-[0.85] blur-[2px] z-9 opacity-90' : ''}
              ${index === 3 ? 'translate-x-[45%] md:translate-x-[90%] translate-y-[10%] scale-[0.7] blur-[4px] z-8 opacity-70' : ''}
              ${index === 4 ? 'translate-x-[60%] md:translate-x-[120%] translate-y-[15%] scale-[0.5] blur-[6px] z-7 opacity-40' : ''}
              ${index === 0 ? '-translate-x-full -translate-y-[5%] scale-150 blur-2xl z-11 opacity-0' : ''}`}
          >
            <div className="relative h-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-4 md:px-0">
              <div className={`w-full md:w-[45%] space-y-6 text-center md:text-left
                ${index === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="space-y-2">
                  <h2 className="text-xl md:text-2xl font-medium text-gray-600 animate-[showContent_0.5s_1s_ease-in-out_forwards]">
                    {item.title}
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-medium text-gray-900 animate-[showContent_0.5s_1.2s_ease-in-out_forwards]">
                    {item.topic}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-prose animate-[showContent_0.5s_1.4s_ease-in-out_forwards]">
                  {item.description}
                </p>
              </div>
              <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
     
     
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 ">
      <button 
  onClick={onChatClick}
  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full 
             hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg 
             hover:ring-4 hover:ring-yellow-200 hover:ring-opacity-90 hover:text-yellow-300"
>
          <MessageSquare className="w-5 h-5" />
          Chat with Bot
        </button>
      </div>
    </div>
  );
};

export default Carousel;
