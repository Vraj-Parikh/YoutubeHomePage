import { useRef, useState } from "react";
import Button from "./utilility/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const category = [
  { name: "All" },
  { name: "Javascript" },
  { name: "Typescript" },
  { name: "Programming" },
  { name: "Weight Lifting" },
  { name: "Bowling" },
  { name: "Football" },
  { name: "Cricket" },
  { name: "Cooking" },
  { name: "Traveling" },
  { name: "Reading" },
  { name: "Photography" },
  { name: "Gardening" },
  { name: "Painting" },
  { name: "Gaming" },
  { name: "Music" },
  { name: "Movies" },
  { name: "Fitness" },
  { name: "Technology" },
  { name: "Science" },
  { name: "Astronomy" },
  { name: "Robotics" },
  { name: "DIY" },
  { name: "Writing" },
  { name: "Cycling" },
  { name: "Yoga" },
  { name: "Fishing" },
  { name: "Hiking" },
  { name: "Swimming" },
  { name: "Art" },
  { name: "Crafting" },
];
const TRANSLATE_AMOUNT = 200;
function CategoryPills() {
  const [selectedCategory, setSelectedCategory] = useState(category[0].name);
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.name);
  };
  // useEffect(() => {
  //   if (containerRef.current == null) return

  //   const observer = new ResizeObserver(entries => {
  //     const container = entries[0]?.target
  //     if (container == null) return

  //     setIsLeftVisible(translate > 0)
  //     setIsRightVisible(
  //       translate + container.clientWidth < container.scrollWidth
  //     )
  //   })

  //   observer.observe(containerRef.current)

  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [translate])
  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-max"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {category.map((item) => (
          <Button
            className="rounded-lg px-3 py-1"
            variant={selectedCategory === item.name ? "dark" : "default"}
            onClick={handleOnClick}
            name={item.name}
            key={item.name}
          >
            {item.name}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 inset-y-0 bg-gradient-to-r from-white from-50% to-transparent w-24 justify-start">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-video p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const new_translate = translate - TRANSLATE_AMOUNT;
                setIsRightVisible(true);
                if (new_translate <= 0) {
                  setIsLeftVisible(false);
                  return 0;
                }
                return new_translate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 inset-y-0 bg-gradient-to-l from-white from-50% to-transparent w-24 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-video p-1.5"
            onClick={() => {
              setTranslate(() => {
                if (containerRef.current == null) return translate;
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                setIsLeftVisible(true);
                if (newTranslate + width >= edge) {
                  setIsRightVisible(false);
                  return edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryPills;
