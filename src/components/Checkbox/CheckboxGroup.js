import React, { useState, useEffect, useMemo, useRef } from "react";

import "./CheckboxGroup.scss";

import propTypes from "prop-types";

import classnames from "classnames";

function CheckboxGroup({
	children,
	name,
	className,
	disibled,
	onChenge,
	value
}) {

	const clas = classnames("simple-checkbox-group-wrapper", className);
  const checkedInst = useMemo(() => {
    let obj = {}
    if (Array.isArray(value)) {
			value.forEach(item => (obj[item] = true));
    }
    return obj
  });
  
	const renderChildren = useMemo(() => {
		return React.Children.map(children, child => {
      let { value } = child.props;
			return React.cloneElement(child, {
				name,
				disibled,
				onChenge: checkboxChange,
				checked: !!checkedInst[value]
			});
		});
  }, [children, checkedInst, disibled]);
  
  function handleCheckedInst (instObj) {
    let value = []
    for (let prop in instObj) {
      if (instObj.hasOwnProperty(prop) && instObj[prop]) {
        value.push(prop)
      }
    }
    return value
  }

	function checkboxChange(checked, e) {
    let { value } = e.target
    checkedInst[value] = checked
    onChenge(handleCheckedInst(checkedInst));
  }
  
	return <div className={clas}>{renderChildren}</div>;
}

CheckboxGroup.defaultProps = {
	disibled: false,
	onChenge: () => {},
	value: []
};

CheckboxGroup.propTypes = {
	name: propTypes.string,
	disibled: propTypes.bool,
	onChenge: propTypes.func,
  value: propTypes.array,
  className: propTypes.string
};

export default CheckboxGroup;
