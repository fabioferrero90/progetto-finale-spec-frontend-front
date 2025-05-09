import { TbWorld } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";
import { AiTwotoneShop } from "react-icons/ai";


const HeaderTopBar = () => {
  return (
    <div className="px-5 py-2 bg-black text-white text-sm">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <TbWorld className="inline text-3xl pr-2"/>
              <span>IT | Italiano</span>
            </div>
            <div>
              <LuTruck className="inline text-3xl pr-2"/>
              <span className="">Consegna in casa a €59. fino al 31/12</span>
            </div>
            <div>
              <LuTruck className="inline text-3xl pr-2"/>
              <span>20019</span>
              <span className="px-2">|</span>
              <AiTwotoneShop className="inline text-3xl pr-2"/>
              <span>Milano</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HeaderTopBar