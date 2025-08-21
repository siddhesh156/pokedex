import React, { ReactNode } from 'react';
import { CheckPicker } from 'rsuite';
import './multiSelectdropDown.scss';

interface AppMultiSelectDropDownProps {
  label: ReactNode;
  onChangeHandler: (value: any) => void;
  data: any[];
  placeholder?: string;
  isOpen?: boolean;
  onCloseHandler?: () => void;
  onCleanHandler?: (event: any) => void;
  onOpenHandler?: () => void;
}

const AppMultiSelectDropDown: React.FC<AppMultiSelectDropDownProps> = ({
  label,
  onChangeHandler,
  data,
  placeholder,
  isOpen,
  onCloseHandler,
  onCleanHandler,
  onOpenHandler,
}) => (
  <>
    <div className="multiselect-dropdown-wrapper">
      <div className="dropdown-label"><span>{label}</span></div>
      <div className={`${isOpen ? 'is-dropdown-open' : ''} check-picker-wrap`}>
        <CheckPicker
          block
          placeholder={placeholder}
          onChange={onChangeHandler}
          size="lg"
          onOpen={onOpenHandler}
          onClose={onCloseHandler}
          onClean={onCleanHandler}
          data={data}
          searchable={false}
          style={{ width: 224 }}
        />
      </div>
    </div>
  </>
);



export default AppMultiSelectDropDown;
