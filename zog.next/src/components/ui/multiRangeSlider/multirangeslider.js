"use strict";
/**
 * Библиотечный компонент
 * Взят из библиотеки multi-range-slider-react
 */

var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const MultiRangeSlider = (props, ref) => {
  let ruler = props.ruler === undefined || props.ruler === null ? true : props.ruler;
  let label = props.label === undefined || props.label === null ? true : props.label;
  let subSteps = props.subSteps === undefined || props.subSteps === null ? false : props.subSteps;
  let stepOnly = props.stepOnly === undefined || props.stepOnly === null ? false : props.stepOnly;
  let preventWheel =
    props.preventWheel === undefined || props.preventWheel === null ? false : props.preventWheel;
  let refBar = (0, react_1.useRef)(null);
  let min = +(props.min || 0);
  let max = +(props.max || 100);
  let step = +(props.step || 5);
  let fixed = 0;
  let stepCount = Math.floor((+max - +min) / +step);
  let labels = props.labels || [];
  if (labels.length === 0) {
    labels = [];
    labels.push(min.toString());
    labels.push(max.toString());
  } else {
    stepCount = labels.length - 1;
  }
  if (typeof label === "string") {
    label = label === "true";
  }
  if (typeof ruler === "string") {
    ruler = ruler === "true";
  }
  if (typeof preventWheel === "string") {
    preventWheel = preventWheel === "true";
  }
  if (step.toString().includes(".")) {
    fixed = 2;
  }
  let _minValue = props.minValue;
  if (_minValue === null || _minValue === undefined) {
    _minValue = 25;
  }
  _minValue = +_minValue;
  let _maxValue = props.maxValue;
  if (_maxValue === null || _maxValue === undefined) {
    _maxValue = 75;
  }
  _maxValue = +_maxValue;
  if (_minValue < min) {
    _minValue = min;
  }
  if (_minValue > max) {
    _minValue = max;
  }
  if (_maxValue < _minValue) {
    _maxValue = +_minValue + +step;
  }
  if (_maxValue > max) {
    _maxValue = max;
  }
  if (_maxValue < min) {
    _maxValue = min;
  }
  const [minValue, set_minValue] = (0, react_1.useState)(+_minValue);
  const [maxValue, set_maxValue] = (0, react_1.useState)(+_maxValue);
  const [barMin, set_barMin] = (0, react_1.useState)(((minValue - min) / (max - min)) * 100);
  const [barMax, set_barMax] = (0, react_1.useState)(((max - maxValue) / (max - min)) * 100);
  // const [minCaption, setMinCaption] = (0, react_1.useState)('');
  // const [maxCaption, setMaxCaption] = (0, react_1.useState)('');
  const [isChange, setIsChange] = (0, react_1.useState)(true);
  const onBarLeftClick = (e) => {
    let _minValue = minValue - step;
    if (_minValue < min) {
      _minValue = min;
    }
    set_minValue(_minValue);
  };
  const onInputMinChange = (e) => {
    let _minValue = parseFloat(e.target.value);
    if (_minValue > maxValue - step) {
      _minValue = maxValue - step;
    }
    set_minValue(_minValue);
  };
  const onLeftThumbMousedown = (e) => {
    let startX = e.clientX;
    let thumb = e.target;
    let bar = thumb.parentNode;
    let barBox = bar.getBoundingClientRect();
    let barValue = minValue;
    setIsChange(false);
    let onLeftThumbMousemove = (e) => {
      let clientX = e.clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));
      if (val < min) {
        val = min;
      } else if (val > maxValue - step) {
        val = maxValue - step;
      }
      set_minValue(val);
    };
    let onLeftThumbMouseup = (e) => {
      setIsChange(true);
      document.removeEventListener("mousemove", onLeftThumbMousemove);
      document.removeEventListener("mouseup", onLeftThumbMouseup);
    };
    document.addEventListener("mousemove", onLeftThumbMousemove);
    document.addEventListener("mouseup", onLeftThumbMouseup);
  };
  const onLeftThumbTouchStart = (e) => {
    let startX = e.touches[0].clientX;
    let thumb = e.target;
    let bar = thumb.parentNode;
    let barBox = bar.getBoundingClientRect();
    let barValue = minValue;
    setIsChange(false);
    let onLeftThumbToucheMove = (e) => {
      let clientX = e.touches[0].clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));
      if (val < min) {
        val = min;
      } else if (val > maxValue - step) {
        val = maxValue - step;
      }
      set_minValue(val);
    };
    let onLeftThumbTouchEnd = (e) => {
      setIsChange(true);
      document.removeEventListener("touchmove", onLeftThumbToucheMove);
      document.removeEventListener("touchend", onLeftThumbTouchEnd);
    };
    document.addEventListener("touchmove", onLeftThumbToucheMove);
    document.addEventListener("touchend", onLeftThumbTouchEnd);
  };
  const onInnerBarLeftClick = (e) => {
    let _minValue = minValue + step;
    if (_minValue > maxValue - step) {
      _minValue = maxValue - step;
    }
    set_minValue(_minValue);
  };
  const onInnerBarRightClick = (e) => {
    let _maxValue = maxValue - step;
    if (_maxValue < minValue + step) {
      _maxValue = minValue + step;
    }
    set_maxValue(_maxValue);
  };
  const onInputMaxChange = (e) => {
    let _maxValue = parseFloat(e.target.value);
    if (_maxValue < minValue + step) {
      _maxValue = minValue + step;
    }
    set_maxValue(_maxValue);
  };
  const onRightThumbMousedown = (e) => {
    let startX = e.clientX;
    let thumb = e.target;
    let bar = thumb.parentNode;
    let barBox = bar.getBoundingClientRect();
    let barValue = maxValue;
    setIsChange(false);
    let onRightThumbMousemove = (e) => {
      let clientX = e.clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));
      if (val < minValue + step) {
        val = minValue + step;
      } else if (val > max) {
        val = max;
      }
      set_maxValue(val);
    };
    let onRightThumbMouseup = (e) => {
      setIsChange(true);
      document.removeEventListener("mousemove", onRightThumbMousemove);
      document.removeEventListener("mouseup", onRightThumbMouseup);
    };
    document.addEventListener("mousemove", onRightThumbMousemove);
    document.addEventListener("mouseup", onRightThumbMouseup);
  };
  const onRightThumbTouchStart = (e) => {
    let startX = e.touches[0].clientX;
    let thumb = e.target;
    let bar = thumb.parentNode;
    let barBox = bar.getBoundingClientRect();
    let barValue = maxValue;
    setIsChange(false);
    let onRightThumbTouchMove = (e) => {
      let clientX = e.touches[0].clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));
      if (val < minValue + step) {
        val = minValue + step;
      } else if (val > max) {
        val = max;
      }
      set_maxValue(val);
    };
    let onRightThumbTouchEnd = (e) => {
      setIsChange(true);
      document.removeEventListener("touchmove", onRightThumbTouchMove);
      document.removeEventListener("touchend", onRightThumbTouchEnd);
    };
    document.addEventListener("touchmove", onRightThumbTouchMove);
    document.addEventListener("touchend", onRightThumbTouchEnd);
  };
  const onBarRightClick = (e) => {
    let _maxValue = maxValue + step;
    if (_maxValue > max) {
      _maxValue = max;
    }
    set_maxValue(_maxValue);
  };
  const onMouseWheel = (e) => {
    if (preventWheel === true) {
      return;
    }
    if (!e.shiftKey && !e.ctrlKey) {
      return;
    }
    let val = (max - min) / 100;
    if (val > 1) {
      val = 1;
    }
    if (e.deltaY < 0) {
      val = -val;
    }
    let _minValue = minValue;
    let _maxValue = maxValue;
    if (e.shiftKey && e.ctrlKey) {
      if (_minValue + val >= min && _maxValue + val <= max) {
        _minValue = _minValue + val;
        _maxValue = _maxValue + val;
      }
    } else if (e.ctrlKey) {
      val = _maxValue + val;
      if (val < _minValue + step) {
        val = _minValue + step;
      } else if (val > max) {
        val = max;
      }
      _maxValue = val;
    } else if (e.shiftKey) {
      val = _minValue + val;
      if (val < min) {
        val = min;
      } else if (val > _maxValue - step) {
        val = _maxValue - step;
      }
      _minValue = val;
    }
    set_maxValue(_maxValue);
    set_minValue(_minValue);
  };
  (0, react_1.useEffect)(() => {
    if (refBar && refBar.current) {
      let bar = refBar.current;
      let p_bar = bar.parentNode;
      p_bar.addEventListener("wheel", (e) => {
        if (!e.shiftKey && !e.ctrlKey) {
          return;
        }
        e.preventDefault();
      });
    }
  }, [refBar]);
  (0, react_1.useEffect)(() => {
    if (maxValue < minValue) {
      throw new Error("maxValue is less than minValue");
    }
    const triggerChange = () => {
      let result = { min, max, minValue, maxValue };
      isChange && props.onChange && props.onChange(result);
      props.onInput && props.onInput(result);
    };
    // setMinCaption(props.minCaption || minValue.toFixed(fixed));
    // setMaxCaption(props.maxCaption || maxValue.toFixed(fixed));
    let _barMin = ((minValue - min) / (max - min)) * 100;
    set_barMin(_barMin);
    let _barMax = ((max - maxValue) / (max - min)) * 100;
    set_barMax(_barMax);
    window.setTimeout(triggerChange);
  }, [minValue, maxValue, min, max, fixed, props, isChange]);
  (0, react_1.useEffect)(() => {
    let _minValue = props.minValue;
    if (_minValue === null || _minValue === undefined) {
      _minValue = 25;
    }
    _minValue = +_minValue;
    if (_minValue < min) {
      _minValue = min;
    }
    if (_minValue > max) {
      _minValue = max;
    }
    set_minValue(+_minValue);
  }, [props.minValue, min, max]);
  (0, react_1.useEffect)(() => {
    let _maxValue = props.maxValue;
    if (_maxValue === null || _maxValue === undefined) {
      _maxValue = 75;
    }
    _maxValue = +_maxValue;
    if (_maxValue > max) {
      _maxValue = max;
    }
    if (_maxValue < min) {
      _maxValue = min;
    }
    set_maxValue(+_maxValue);
  }, [props.maxValue, min, max, step]);

  return react_1.default.createElement(
    "div",
    {
      ref: ref,
      className: (props.baseClassName || "multi-range-slider") + " " + (props.className || ""),
      style: props.style,
      onWheel: props.isDisabled ? undefined : onMouseWheel,
    },
    react_1.default.createElement(
      "div",
      { className: "bar", ref: refBar },
      react_1.default.createElement("div", {
        className: "bar-left",
        style: { width: barMin + "%", backgroundColor: props.barLeftColor },
        onClick: props.isDisabled ? undefined : onBarLeftClick,
      }),
      react_1.default.createElement("input", {
        className: "input-type-range input-type-range-min",
        type: "range",
        min: min,
        max: max,
        step: step,
        value: minValue,
        onInput: props.isDisabled ? undefined : onInputMinChange,
      }),
      react_1.default.createElement(
        "div",
        {
          className: "thumb thumb-left",
          style: { backgroundColor: props.thumbLeftColor, borderColor: props.thumbLeftColor },
          onMouseDown: props.isDisabled ? undefined : onLeftThumbMousedown,
          onTouchStart: props.isDisabled ? undefined : onLeftThumbTouchStart,
        }
        /*react_1.default.createElement("div", { className: 'caption' },
                     react_1.default.createElement("span", { className: 'min-caption' }, minCaption))*/
      ),
      react_1.default.createElement(
        "div",
        { className: "bar-inner", style: { backgroundColor: props.barInnerColor } },
        react_1.default.createElement("div", {
          className: "bar-inner-left",
          onClick: props.isDisabled ? undefined : onInnerBarLeftClick,
        }),
        react_1.default.createElement("div", {
          className: "bar-inner-right",
          onClick: props.isDisabled ? undefined : onInnerBarRightClick,
        })
      ),
      react_1.default.createElement("input", {
        className: "input-type-range input-type-range-max",
        type: "range",
        min: min,
        max: max,
        step: step,
        value: maxValue,
        onInput: props.isDisabled ? undefined : onInputMaxChange,
      }),
      react_1.default.createElement(
        "div",
        {
          className: "thumb thumb-right",
          style: { backgroundColor: props.thumbRightColor, borderColor: props.thumbRightColor },
          onMouseDown: props.isDisabled ? undefined : onRightThumbMousedown,
          onTouchStart: props.isDisabled ? undefined : onRightThumbTouchStart,
        }
        /* react_1.default.createElement("div", { className: 'caption' },
                    react_1.default.createElement("span", { className: 'max-caption' }, maxCaption))*/
      ),
      react_1.default.createElement("div", {
        className: "bar-right",
        style: { width: barMax + "%", backgroundColor: props.barRightColor },
        onClick: props.isDisabled ? undefined : onBarRightClick,
      })
    ),
    ruler &&
      react_1.default.createElement(
        "div",
        { className: "ruler" },
        [...Array(stepCount)].map((e, i) =>
          react_1.default.createElement(
            "div",
            { key: i, className: "ruler-rule" },
            subSteps &&
              [...Array(10)].map((e, n) =>
                react_1.default.createElement("div", { key: n, className: "ruler-sub-rule" })
              )
          )
        )
      ),
    label &&
      react_1.default.createElement(
        "div",
        { className: "labels" },
        labels.map((label) => {
          return react_1.default.createElement(
            "div",
            { key: label.toString(), className: "label" },
            label
          );
        })
      )
  );
};
exports.default = react_1.default.memo((0, react_1.forwardRef)(MultiRangeSlider));
