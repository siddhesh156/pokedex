import PropTypes from 'prop-types';
import React, { ReactNode } from 'react'; // Removed FC from here
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

AppMultiSelectDropDown.propTypes = {
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onCloseHandler: PropTypes.func,
  onCleanHandler: PropTypes.func,
  onOpenHandler: PropTypes.func,
  label: PropTypes.node.isRequired,
};

export default AppMultiSelectDropDown;
