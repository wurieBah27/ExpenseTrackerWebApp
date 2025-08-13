import { Label, Radio } from "flowbite-react";
import type { ElementType } from "react";
import {
  FaBicycle,
  FaBriefcaseMedical,
  FaBtc,
  FaBus,
  FaCar,
  FaChair,
  FaEraser,
  FaFire,
  FaGasPump,
  FaGrinStars,
  FaHospital,
  FaMoneyBill,
  FaMugHot,
  FaPills,
  FaPizzaSlice,
  FaPlane,
  FaRedhat,
  FaShoePrints,
  FaTaxi,
  FaTshirt,
  FaTv,
  FaUmbrella,
  FaYoutube,
} from "react-icons/fa";
import {
  FaAppleWhole,
  FaBottleWater,
  FaBuildingColumns,
  FaComputer,
  FaPersonBiking,
  FaPersonRunning,
  FaPiggyBank,
  FaSpoon,
} from "react-icons/fa6";
import { HiLightBulb, HiPhone, HiScissors, HiWifi } from "react-icons/hi";
import { HiAcademicCap, HiFaceSmile, HiMiniSignal } from "react-icons/hi2";

export const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  HiAcademicCap,
  HiFaceSmile,
  HiMiniSignal,
  HiLightBulb,
  HiPhone,
  HiScissors,
  HiWifi,
  FaBicycle,
  FaBtc,
  FaAppleWhole,
  FaBottleWater,
  FaBuildingColumns,
  FaComputer,
  FaPiggyBank,
  FaSpoon,
  FaBriefcaseMedical,
  FaPersonBiking,
  FaPersonRunning,
  FaHospital,
  FaPills,
  FaBus,
  FaCar,
  FaChair,
  FaEraser,
  FaFire,
  FaGasPump,
  FaGrinStars,
  FaMoneyBill,
  FaMugHot,
  FaPizzaSlice,
  FaPlane,
  FaRedhat,
  FaShoePrints,
  FaTaxi,
  FaTshirt,
  FaTv,
  FaUmbrella,
  FaYoutube,
};

type IconComponentProps = {
  Icon: ElementType;
  value: string;
  onClick?: (value: string) => string;
  setIconValue: (value: string) => void;
  setOpenModal: () => void;
};

type IconsPage = {
  setIconValue: (value: string) => void;
  setOpenModal: () => void;
};
const IconsPage = ({ setIconValue, setOpenModal }: IconsPage) => {
  return (
    <div>
      <div className="flex flex-col gap-5 pb-20">
        <div>
          <h3 className="mb-2">Bills</h3>
          <div className="flex flex-wrap items-center gap-3">
            <IconComponent
              Icon={HiWifi}
              value="HiWifi"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={HiLightBulb}
              value="HiLightBulb"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaGasPump}
              value="FaGasPump"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaTv}
              value="Fa42Group"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaYoutube}
              value="HiAcademicCap"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaUmbrella}
              value="FaUmbrella"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />

            <IconComponent
              Icon={FaComputer}
              value="FaComputer"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />

            <IconComponent
              Icon={HiScissors}
              value="HiScissors"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={HiPhone}
              value="HiPhone"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaFire}
              value="FaFire"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-2">Food & Drink</h3>
          <div className="flex flex-wrap items-center gap-3">
            <IconComponent
              Icon={FaSpoon}
              value="FaSpoon"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaPizzaSlice}
              value="FaPizzaSlice"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaBottleWater}
              value="FaBottleWater"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaMugHot}
              value="FaMugHot"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaAppleWhole}
              value="FaAppleWhole"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2">Clothes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <IconComponent
              Icon={FaTshirt}
              value="FaTshirt"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaPizzaSlice}
              value="FaPizzaSlice"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaShoePrints}
              value="FaShoePrints"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaRedhat}
              value="FaRedhat"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2">Travel</h3>
          <div className="flex flex-wrap items-center gap-3">
            <IconComponent
              Icon={FaPlane}
              value="FaPlane"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaBus}
              value="FaBus"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaTaxi}
              value="FaTaxi"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaBicycle}
              value="FaBicycle"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaGasPump}
              value="FaGasPump"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2">Money</h3>
          <div className="flex flex-wrap items-center gap-3">
            <IconComponent
              Icon={FaPiggyBank}
              value="FaPiggyBank"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaBuildingColumns}
              value="FaBuildingColumns"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaBtc}
              value="FaBtc"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaMoneyBill}
              value="FaMoneyBill"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaGasPump}
              value="FaGasPump"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-2">Well beig, Health & Beauty</h3>
          <div className="flex flex-wrap items-center gap-3">
            <IconComponent
              Icon={FaBriefcaseMedical}
              value="FaBriefcaseMedical"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaPersonBiking}
              value="FaPersonBiking"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaPersonRunning}
              value="FaPersonRunning"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaHospital}
              value="FaHospital"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
            <IconComponent
              Icon={FaPills}
              value="FaPills"
              setIconValue={setIconValue}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function IconComponent({
  Icon,
  value,
  setIconValue,
  setOpenModal,
}: IconComponentProps) {
  const handleClick = (e: any) => {
    setIconValue(e);
    setOpenModal();
  };

  return (
    <div>
      <Radio
        id={value}
        name="icon"
        value={value}
        className="hidden"
        onChange={(e) => handleClick(e.target.value)}
      />
      <Label htmlFor={value}>
        <Icon className="size-6 text-gray-500" />
      </Label>
    </div>
  );
}

export default IconsPage;
