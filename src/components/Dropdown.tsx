import { Dropdown } from "flowbite-react";
import type React from "react";

type DropdownComponentProps = {
  RenderTrigerChildren: React.ReactElement;
  children: React.ReactNode;
  hideDropdown: boolean;
};
const DropdownComponent = ({
  RenderTrigerChildren,
  children,
  hideDropdown,
}: DropdownComponentProps) => {
  return (
    <div>
      <Dropdown
        label=""
        dismissOnClick={hideDropdown}
        renderTrigger={() => RenderTrigerChildren}
      >
        {children}
      </Dropdown>
    </div>
  );
};

export default DropdownComponent;
