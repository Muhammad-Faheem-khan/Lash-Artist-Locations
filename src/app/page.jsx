import MapComponent from "./components/MapComponent";
import { HomeModal } from "./components/modals/HomeModal";
import { SearchSiderbar } from "./components/searchComponent";

export default async function Home() {
  return (
    <main className="">
      <HomeModal />
      <MapComponent  />
      <SearchSiderbar />
    </main>
  );
}
