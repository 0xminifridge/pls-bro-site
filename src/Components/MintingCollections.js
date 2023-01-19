import { MintingCollectionData } from "./constants/Collections";
import MintingItem from "./MintingItem";

export default function Minting({}) {
  return (
    <>
      <div class="h-[93vh] md:h-[100vh] bg-black overflow-y-scroll">
        <div class="text-white flex justify-center flex-col">
          <div class="m-auto flex flex-col justify-center">
            {MintingCollectionData.map((item, index) => {
              return <MintingItem key={index} item={item} />;
            })}
          </div>
        </div>
        <div class="h-20 py-10 text-2xl text-white text-center"></div>
      </div>
    </>
  );
}
