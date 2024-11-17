import CategoryPills from "./components/CategoryPills";
import Header from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import VideoGridItem from "./components/VideoGridItem";
import { videos } from "./data/videos";

const App = () => {
  return (
    <div className="max-h-screen flex flex-col">
      <Header />
      <div className="flex-grow grid grid-cols-[auto,1fr] overflow-auto">
        <Sidebar />
        <div className="overflow-x-hidden sm:px-2 px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills />
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {videos.map((item) => (
              <VideoGridItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
