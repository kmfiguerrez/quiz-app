
import { Dispatch, SetStateAction } from "react";

// Next UI components.
import {Select, SelectItem} from "@nextui-org/select";

// Custom types.
import type { TColorVariants } from "@/utils/definition";
import cn from "@/utils/cn";

const colorVariants = [{color: "pink"}, {color: "purple"}, {color: "blue"}, {color: "yellow"}, {color: "orange"}, {color: "white"}]

type TColorProps = {
  selectedColor: TColorVariants
  onSetColorVariant: Dispatch<SetStateAction<TColorVariants>>
}

const ColorVariantSwitcher = ({selectedColor, onSetColorVariant}: TColorProps) => {

  return (
    <Select
      items={colorVariants}
      label="Choose color variants"
      defaultSelectedKeys={[selectedColor as string]}            
      onChange={e => {
        onSetColorVariant(e.target.value as TColorVariants)
      }}
      classNames={{
        base: "min-w-max w-min w-[200px]"
      }}
      renderValue={(items) => {
        return items.map((item) => (        
          <div key={item.key} className="flex space-x-2 items-center">
              <ColorBlock color={item.data?.color as TColorVariants} />
            <span>{item.data?.color}</span>
          </div>
        ))
      }}
    >
      {(colorVariant) => (
        <SelectItem
          key={colorVariant.color}
          value={colorVariant.color}
        >
          <div className="flex space-x-4 items-center">
            <ColorBlock color={colorVariant.color as TColorVariants} />
            <span>{colorVariant.color}</span>
          </div>
        </SelectItem>
      )

      }

    </Select>
  )
}


type TColorBlockProps = {
  color: TColorVariants
  className?: string
}

const ColorBlock = ({color, className}: TColorBlockProps) => {
  return (
    <div 
      className={cn("h-[20px] w-[20px] rounded-md",
      className,
      {
        "bg-white": color === "white",
        "bg-blue-500": color === "blue",
        "bg-purple-500": color === "purple",
        "bg-yellow-500": color === "yellow",
        "bg-pink-500": color === "pink",
        "bg-orange-500": color === "orange",
      }
      )}
    >

    </div>
  )
}

export default ColorVariantSwitcher