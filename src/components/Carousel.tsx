// Frontend code where I fetch the data from the firebase  which path is ../firebase/config. form the db  named sliderItems and the shcema as it like below as shown in image
import React, { useState, useEffect, useCallback } from 'react';
import {  MessageSquare } from 'lucide-react';
import { db } from '../firebase/config'; // Import db from your firebase config
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

interface CarouselProps {
  onChatClick: () => void;
}

interface TeaItem {
  id: string;
  title: string;
  topic: string;
  description: string;
  imageUrl: string; // Changed 'image' to 'imageUrl' to match Firestore field
}

// Removed demo data imports and teaItems array

const Carousel: React.FC<CarouselProps> = ({ onChatClick }) => {
  const [items, setItems] = useState<TeaItem[]>([]); // Initialize items as empty array of TeaItem
  const [showDetail, setShowDetail] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchSliderItems = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const querySnapshot = await getDocs(collection(db, "sliderItems"));
      const sliderItemsData: TeaItem[] = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || '', // Ensure fallback in case data is missing
          topic: data.topic || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
        };
      });
      setItems(sliderItemsData);
    } catch (error) {
      console.error("Error fetching slider items from Firebase:", error);
      // Handle error appropriately, maybe set an error state to display a message to the user
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
    }
  }, []);

  useEffect(() => {
    fetchSliderItems(); // Fetch slider items when component mounts
  }, [fetchSliderItems]);

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
      if (!showDetail && !loading && items.length > 0) { // Check for loading and items before rotating
        rotateItems('next');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [rotateItems, showDetail, loading, items.length]); // Include loading and items.length in dependency array

  if (loading) {
    return <div className="relative min-h-screen md:h-[800px] overflow-hidden bg-gradient-to-b from-[#F4F4F4] to-white flex justify-center items-center">Loading slides...</div>; // Or a more sophisticated loading indicator
  }

  if (items.length === 0) {
    return <div className="relative min-h-screen md:h-[800px] overflow-hidden bg-gradient-to-b from-[#F4F4F4] to-white flex justify-center items-center">No slides available.</div>; // Message when no slides are found
  }


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
                  src={item.imageUrl} // Use imageUrl from fetched data
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
          Chat Now
        </button>
      </div>
    </div>
  );
};

export default Carousel;