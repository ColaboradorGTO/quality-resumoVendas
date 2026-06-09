import React, { Fragment } from 'react';

export const ButtonType = ({ 
  textButton,
  onClickButtonType,
  id,
  className,
  cor,
  tipo,
  Icon,
  iconColor,
  iconSize,
  disabledBTN,
  visibilityBTN,
  style,
  outline  
}) => {
  
  let btnClasses = "btn waves-effect waves-themed";

  const cores = ["primary", "secondary", "success", "danger", "warning", "info"];

  if (cores.includes(cor)) {
    btnClasses += outline ? ` btn-outline-${cor}` : ` btn-${cor}`;
  }

  const typeButton = tipo === "button" ? "button" : "submit";

  const defaultStyle = {
    marginRight: "10px",
    marginLeft: "10px",
    marginTop: "20px",
    ...style 
  };

  return (
    <Fragment>
      <div style={{...style}}>
        <button
          id={id}
          className={`${btnClasses} ${className}`}
          type={typeButton}
          onClick={() => onClickButtonType()}
          style={defaultStyle}
          disabled={disabledBTN}
          visible={visibilityBTN}
        >
          {Icon && <Icon size={iconSize} color={iconColor} />}
          {textButton}
        </button>
      </div>
    </Fragment>
  );
};