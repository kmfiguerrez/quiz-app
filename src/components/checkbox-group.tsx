'use client'

import { useState } from "react";
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";
import type { TChoice, TQuestion } from "@/utils/definition";
import { cn } from "@nextui-org/react";

type TCheckboxProps = {
  question: TQuestion
}

const MyCheckboxGroup = ({ question }: TCheckboxProps) => {
  const [selected, setSelected] = useState<Array<string>>([]);

  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup
        label="Select cities"
        color="primary"
        value={selected}
        onValueChange={setSelected}
      >
        {/* <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox> */}

        {question.choices.map(choice => (
            <Checkbox 
              value={choice.prefixSymbol}
              classNames={{
                base: cn(
                  "mb-1",
                  "hover:bg-content2",
                  "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary",
                ),
                icon: cn(
                  "data-[selected=true]:opacity-0",
                )
              }}
            >
              {choice.text}
            </Checkbox>
          ))
        }
      </CheckboxGroup>
      <p className="text-default-500 text-small">Selected: {selected.join(", ")}</p>
    </div>
  );
}

export default MyCheckboxGroup