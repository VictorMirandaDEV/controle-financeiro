import { window, document, exists } from "browser-monads";
import {
  codBarras2LinhaDigitavel,
  validarBoleto,
} from "@mrmgomes/boleto-utils";
import { useRouter } from "next/router";
function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var React = require("react");
var React__default = _interopDefault(React);
var Quagga = require("@ericblade/quagga2");
var broleto = require("broleto");

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var styles = { rbr__segment: "_1WWFP", rbr__btn: "_NQqIE" };

var styles$1 = {
  rbr: "_3P2z6",
  rbr__overlay: "_3zAgT",
  rbr__overlay__item: "_1aS6C",
  rbr__overlay__line: "_rgsT9",
};

function BarcodeReader(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "react-boleto-reader--barcode" : _ref$id,
    _ref$init = _ref.init,
    init = _ref$init === void 0 ? {} : _ref$init,
    _ref$inputStream = _ref.inputStream,
    inputStream = _ref$inputStream === void 0 ? {} : _ref$inputStream,
    _ref$decoder = _ref.decoder,
    decoder = _ref$decoder === void 0 ? {} : _ref$decoder,
    _ref$readers = _ref.readers,
    readers =
      _ref$readers === void 0
        ? [
            {
              format: "ean_reader",
              config: {},
            },
            {
              format: "code_128_reader",
              config: {},
            },
          ]
        : _ref$readers,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? window.innerHeight : _ref$height,
    _ref$canvasWidth = _ref.canvasWidth,
    canvasWidth = _ref$canvasWidth === void 0 ? 1280 : _ref$canvasWidth,
    _ref$canvasHeight = _ref.canvasHeight,
    canvasHeight = _ref$canvasHeight === void 0 ? 720 : _ref$canvasHeight,
    _ref$aspectRatio = _ref.aspectRatio,
    aspectRatio =
      _ref$aspectRatio === void 0
        ? {
            min: 0,
            max: 1,
          }
        : _ref$aspectRatio,
    _ref$onInit = _ref.onInit,
    onInit = _ref$onInit === void 0 ? function () {} : _ref$onInit,
    _ref$onError = _ref.onError,
    onError = _ref$onError === void 0 ? function () {} : _ref$onError,
    _ref$onDetected = _ref.onDetected,
    onDetected = _ref$onDetected === void 0 ? function () {} : _ref$onDetected,
    _ref$onCancel = _ref.onCancel,
    onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel,
    _ref$onProcessed = _ref.onProcessed,
    onProcessed =
      _ref$onProcessed === void 0 ? function () {} : _ref$onProcessed,
    _ref$svgDetectingBoxe = _ref.svgDetectingBoxesCoords,
    svgDetectingBoxesCoords =
      _ref$svgDetectingBoxe === void 0
        ? {
            x: 0,
            y: 1,
          }
        : _ref$svgDetectingBoxe,
    _ref$svgDetectingBoxe2 = _ref.svgDetectingBoxes,
    svgDetectingBoxes =
      _ref$svgDetectingBoxe2 === void 0
        ? {
            color: "rgba(255, 0, 0, .25)",
            lineWidth: 2,
          }
        : _ref$svgDetectingBoxe2,
    _ref$svgDetectingBox = _ref.svgDetectingBox,
    svgDetectingBox =
      _ref$svgDetectingBox === void 0
        ? {
            color: "transparent",
            lineWidth: 2,
          }
        : _ref$svgDetectingBox,
    _ref$svgDetectingLine = _ref.svgDetectingLine,
    svgDetectingLine =
      _ref$svgDetectingLine === void 0
        ? {
            color: "rgb(255, 0, 0, .8)",
            lineWidth: 4,
          }
        : _ref$svgDetectingLine,
    _ref$textHeader = _ref.textHeader,
    textHeader =
      _ref$textHeader === void 0
        ? "Com boa iluminação, posicione o código de barras na área delimitada:"
        : _ref$textHeader,
    _ref$textCancel = _ref.textCancel,
    textCancel =
      _ref$textCancel === void 0 ? "Digitar código de barras" : _ref$textCancel;

  var _useState = React.useState(window.innerWidth),
    compareWidth = _useState[0],
    setCompare = _useState[1];

  var _useState2 = React.useState(null),
    resizing = _useState2[0],
    setResizing = _useState2[1];

  var _useState3 = React.useState(true),
    reading = _useState3[0],
    setReading = _useState3[1];

  var videoHeight = parseInt(height, 10);
  var videoHeightHalf = videoHeight / 2;
  var canvasHeightHalf = canvasHeight / 2;
  var canvasY = canvasHeightHalf - parseInt(height, 10) / 2;
  var canvasTop =
    videoHeight > canvasHeight
      ? videoHeightHalf - canvasHeightHalf + "px"
      : "-" + (canvasY - 40) + "px";
  var run = React.useCallback(
    function () {
      try {
        Quagga.init(
          _extends(
            {
              inputStream: _extends(
                {
                  type: "LiveStream",
                  target: "#" + id,
                  constraints: {
                    width: canvasWidth,
                    height: canvasHeight,
                    facingMode: "environment",
                    aspectRatio: aspectRatio,
                  },
                },
                inputStream
              ),
              frequency: 5,
              singleChannel: true,
              locate: true,
              locator: {
                patchSize: "medium",
                halfSample: true,
              },
            },
            init,
            {
              decoder: _extends(
                {
                  readers: readers,
                },
                decoder
              ),
            }
          ),
          function (err) {
            if (err) {
              onError(err);
              // console.error(err);
              return;
            }

            Quagga.start();
            onInit();
          }
        );
        Quagga.onDetected(function (result) {
          var _ref2 = result || {},
            code = _ref2.codeResult.code;

          onDetected(result, code);
        });
        Quagga.onProcessed(function (result) {
          onProcessed(result);
          var shouldDrawGuides =
            !!svgDetectingBoxes || svgDetectingBox || svgDetectingLine;

          if (!shouldDrawGuides || !result || typeof result !== "object") {
            return;
          }

          var drawingCtx = Quagga.canvas.ctx.overlay;
          var drawingCanvas = Quagga.canvas.dom.overlay;
          var guideBox = result.box,
            guideBoxes = result.boxes,
            codeResult = result.codeResult,
            guideLine = result.line;

          var _ref3 = codeResult || {},
            readedCode = _ref3.code;

          if (guideBoxes && svgDetectingBoxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute("width")),
              parseInt(drawingCanvas.getAttribute("height"))
            );
            guideBoxes
              .filter(function (guideBoxItem) {
                return guideBoxItem !== guideBox;
              })
              .forEach(function (guideBoxItem) {
                Quagga.ImageDebug.drawPath(
                  guideBoxItem,
                  svgDetectingBoxesCoords,
                  drawingCtx,
                  svgDetectingBoxes
                );
              });
          }

          if (guideBox && svgDetectingBox) {
            Quagga.ImageDebug.drawPath(
              guideBox,
              {
                x: 0,
                y: 1,
              },
              drawingCtx,
              svgDetectingBox
            );
          }

          if (readedCode && svgDetectingLine) {
            Quagga.ImageDebug.drawPath(
              guideLine,
              {
                x: "x",
                y: "y",
              },
              drawingCtx,
              svgDetectingLine
            );
          }
        });
      } catch (error) {
        onError(error);
      }
    },
    [onInit, onDetected, onProcessed, onError]
  );
  var cameraOff = React.useCallback(function () {
    try {
      var video = document.querySelector("video");
      var mediaStream = video.srcObject;
      var tracks = mediaStream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
    } catch (e) {
      console.error("BoletoBarcodeReader could not stop the camera");
    }
  });
  var stop = React.useCallback(function () {
    Quagga.offDetected();
    Quagga.offProcessed();
    Quagga.stop();
    cameraOff();
  }, []);
  var handleScreenResize = React.useCallback(
    function () {
      clearTimeout(resizing);

      if (compareWidth === window.innerWidth) {
        return;
      }

      stop();
      setResizing(
        setTimeout(function () {
          run();
          setCompare(window.innerWidth);
        }, 1500)
      );
    },
    [run, stop, compareWidth]
  );
  var handleCancel = React.useCallback(
    function () {
      onCancel();
      Quagga.stop();
      setTimeout(function () {
        return setReading(false);
      }, 2000);
    },
    [onCancel, stop, run]
  );
  React.useLayoutEffect(
    function () {
      run();
      window.addEventListener("resize", handleScreenResize);
      return function () {
        window.removeEventListener("resize", handleScreenResize);
      };
    },
    [run, handleScreenResize]
  );
  return !reading
    ? null
    : /*#__PURE__*/ React__default.createElement(
        "div",
        {
          id: id,
          className: styles$1.rbr,
          style: {
            "--rbr-canvas-top": canvasTop,
            "--rbr-height": height,
            height: height,
          },
        },
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: styles$1.rbr__overlay,
          },
          /*#__PURE__*/ React__default.createElement(
            "div",
            {
              className: styles$1.rbr__overlay__item,
            },
            /*#__PURE__*/ React__default.createElement(
              "small",
              null,
              textHeader
            )
          ),
          /*#__PURE__*/ React__default.createElement(
            "div",
            {
              className: styles$1.rbr__overlay__line,
            },
            /*#__PURE__*/ React__default.createElement("hr", null)
          ),
          /*#__PURE__*/ React__default.createElement(
            "div",
            {
              className: styles$1.rbr__overlay__item,
            },
            /*#__PURE__*/ React__default.createElement(
              "button",
              {
                type: "button",
                className: styles.rbr__btn + " rbr__btn",
                onClick: handleCancel,
              },
              textCancel
            )
          )
        )
      );
}

var boletoReaderDefaultState = {
  supported: true,
  textLandscape:
    " Largura de tela insuficiente. <br/><br/> Coloque o dispositivo em posição horizontal ou maximize a janela. <br/><br/> <br/><br/> Esta janela atualmente tem largura de #wWidth.",
  textNotSupported:
    " Aparentemente este dispositivo não tem suporte a câmera ou o uso dela foi negado, <br /> o quê impossibilita a leitura de códigos de barras. ",
  textValidating: " Buscando por dispositivo de vídeo... ",
  validating: true,
  windowHeight:
    window.innerWidth <= 500 ? window.innerWidth : window.innerHeight,
  windowWidth:
    window.innerWidth <= 500 ? window.innerHeight : window.innerWidth,
};
var BoletoReaderContext = React.createContext(boletoReaderDefaultState);

function boletoReaderReducer(state, action) {
  if (state === void 0) {
    state = boletoReaderDefaultState;
  }

  if (action === void 0) {
    action = {};
  }

  var _action = action,
    type = _action.type,
    content = _action.content;

  switch (type) {
    case "set":
      return _extends({}, state, content || {});

    default:
      return state;
  }
}

function useBoletoReader() {
  return React.useContext(BoletoReaderContext);
}
function useBoletoReaderReducer() {
  return React.useReducer(boletoReaderReducer, boletoReaderDefaultState);
}
function useWindowSizes(delay) {
  if (delay === void 0) {
    delay = 500;
  }

  var _useState = React.useState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }),
    sizes = _useState[0],
    setSizes = _useState[1];

  React.useLayoutEffect(function () {
    var resizeDelay = null;

    function handleResize() {
      clearTimeout(resizeDelay);
      resizeDelay = setTimeout(function () {
        setSizes({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
        });
      }, delay);
    }

    window.addEventListener("resize", handleResize);
    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return sizes;
}

function RequireLandscape(_ref) {
  var children = _ref.children,
    height = _ref.height,
    _ref$minWidth = _ref.minWidth,
    minWidth = _ref$minWidth === void 0 ? 640 : _ref$minWidth,
    onCancel = _ref.onCancel,
    textLandscape = _ref.textLandscape;

  var _useBoletoReader = useBoletoReader(),
    windowWidth = _useBoletoReader.windowWidth,
    textFromContext = _useBoletoReader.textLandscape;

  var requireLargeWidth = windowWidth < minWidth;
  const router = useRouter();

  // const handleClick = (e) => {
  //   // e.preventDefault()
  //   router.push("/digitar-boleto")
  // }
  return !requireLargeWidth
    ? children
    : /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: styles.rbr__segment,
          style: {
            "--rbr-height": height,
          },
        },
        /*#__PURE__*/ React__default.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: String(textLandscape || textFromContext)
              .replace("#minWidth", minWidth + " pixels")
              .replace("#wWidth", windowWidth + " pixels"),
          },
        }),
        onCancel &&
          /*#__PURE__*/ React__default.createElement(
            "button",
            {
              type: "button",
              style: {
                marginTop: "40px",
              },
              className: styles.rbr__btn,
              onClick: onCancel,
              // onClick: handleClick()
            },
            "Digitar código de barras"
          )
      );
}

function getBoletoByCode(code) {
  var detected = new broleto.Boleto(String(code));
  // // console.log(detected);
  if (!detected || !detected.valid()) {
    return null;
  }

  var boleto = detected.toJSON();

  var expiration = new Date(boleto.expirationDate);
  var expirationYear = expiration.getFullYear();
  var expirationInvalid = !expirationYear || expirationYear < 2000;
  var expirationDate = expirationInvalid ? "" : boleto.expirationDate;
  var expiredDays = expirationInvalid ? "" : boleto.expiredDays;
  var expired = expirationInvalid ? false : boleto.expired;

  return _extends({}, detected, boleto, {
    expirationDate: expirationDate,
    expired: expired,
    expiredDays: expiredDays,
    barcodeTyped: code,
    linha: codBarras2LinhaDigitavel(code.toString(), true),
    valido: validarBoleto(code.toString()),
  });
}

var isSmartDevice = !!(window && typeof window.orientation !== "undefined");
function getDevice(deviceKind) {
  if (deviceKind === void 0) {
    deviceKind = "";
  }

  return new Promise(function (resolve, reject) {
    try {
      if (
        !deviceKind ||
        !navigator.mediaDevices ||
        !navigator.mediaDevices.enumerateDevices
      ) {
        reject();
        return;
      }

      navigator.mediaDevices
        .enumerateDevices()
        ["catch"](reject)
        .then(function (devices) {
          var foundDevice =
            devices
              .filter(function (device) {
                return device.kind === deviceKind;
              })
              .pop() || null;

          if (foundDevice) {
            resolve(foundDevice);
          } else {
            reject();
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}
function getCamera() {
  return getDevice("videoinput");
}

function BoletoBarcodeReader(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "react-boleto-reader" : _ref$id,
    _ref$readers = _ref.readers,
    readers = _ref$readers === void 0 ? ["i2of5_reader"] : _ref$readers,
    height = _ref.height,
    width = _ref.width,
    _ref$minWidth = _ref.minWidth,
    minWidth = _ref$minWidth === void 0 ? 640 : _ref$minWidth,
    _ref$aspectRatio = _ref.aspectRatio,
    aspectRatio =
      _ref$aspectRatio === void 0
        ? {
            min: 1,
            max: 2,
          }
        : _ref$aspectRatio,
    _ref$onDetected = _ref.onDetected,
    onDetected = _ref$onDetected === void 0 ? function () {} : _ref$onDetected,
    onCancel = _ref.onCancel,
    _ref$landscape = _ref.landscape,
    landscape = _ref$landscape === void 0 ? true : _ref$landscape,
    _ref$textLandscape = _ref.textLandscape,
    textLandscape = _ref$textLandscape === void 0 ? "" : _ref$textLandscape,
    props = _objectWithoutPropertiesLoose(_ref, [
      "id",
      "readers",
      "height",
      "minWidth",
      "aspectRatio",
      "width",
      "onDetected",
      "onCancel",
      "landscape",
      "textLandscape",
    ]);

  var _useState = React.useState(false),
    wasDetected = _useState[0],
    setDetected = _useState[1];

  var Wrapper = landscape ? RequireLandscape : Fragment;
  var wrapperProps = !landscape
    ? {}
    : {
        height: height,
        width: width,
        minWidth: minWidth,
        onCancel: onCancel,
        textLandscape: textLandscape,
      };
  var handleDetected = React.useCallback(function (result, code) {
    if (wasDetected) {
      return;
    }
    var boleto = getBoletoByCode(code);

    if (!boleto) {
      return;
    }
    setDetected(true);
    onDetected(boleto, code, result);
  }, []);
  return /*#__PURE__*/ React__default.createElement(
    Wrapper,
    wrapperProps,
    /*#__PURE__*/ React__default.createElement(
      BarcodeReader,
      _extends(
        {
          id: id,
          height: height,
          width: width,
          readers: readers,
          aspectRatio: aspectRatio,
          onCancel: onCancel,
          onDetected: handleDetected,
        },
        props
      )
    )
  );
}

function BoletoBarcodeReaderSupport(_ref) {
  var children = _ref.children;

  var _useBoletoReader = useBoletoReader(),
    setter = _useBoletoReader.setter,
    onValidate = _useBoletoReader.onValidate,
    validating = _useBoletoReader.validating,
    supported = _useBoletoReader.supported,
    textNotSupported = _useBoletoReader.textNotSupported,
    textValidating = _useBoletoReader.textValidating;

  React.useEffect(function () {
    setter({
      supported: null,
      validating: true,
    });
    getCamera()
      .then(function (cameraDevice) {
        setter({
          supported: cameraDevice || null,
          validating: false,
        });
        onValidate(cameraDevice || null);
      })
      ["catch"](function (error) {
        setter({
          supported: null,
          validating: true,
        });
        onValidate(null, error);
        // console.error(error);
      });
  }, []);
  return !validating && supported
    ? children
    : /*#__PURE__*/ React__default.createElement(
        "div",
        {
          id: "rbr_support",
          className: styles.rbr__segment,
        },
        validating &&
          /*#__PURE__*/ React__default.createElement("div", {
            id: "rbr_support_validating",
            dangerouslySetInnerHTML: {
              __html: textValidating,
            },
          }),
        !supported &&
          /*#__PURE__*/ React__default.createElement("div", {
            id: "rbr_support_not_supported",
            dangerouslySetInnerHTML: {
              __html: textNotSupported,
            },
          })
      );
}

function set(content) {
  if (content === void 0) {
    content = {};
  }

  return {
    type: "set",
    content: content,
  };
}

var boletoReaderActions = {
  set: set,
};

function BoletoBarcodeReaderProvider(_ref) {
  var children = _ref.children,
    textNotSupported = _ref.textNotSupported,
    textValidating = _ref.textValidating,
    _ref$onValidate = _ref.onValidate,
    onValidate = _ref$onValidate === void 0 ? function () {} : _ref$onValidate;

  var _useBoletoReaderReduc = useBoletoReaderReducer(),
    state = _useBoletoReaderReduc[0],
    dispatch = _useBoletoReaderReduc[1];

  var windowSizes = useWindowSizes();
  var setter = React.useCallback(
    function (content) {
      dispatch(boletoReaderActions.set(content));
    },
    [dispatch]
  );
  React.useEffect(
    function () {
      setter(windowSizes);
    },
    [setter, windowSizes]
  );
  return /*#__PURE__*/ React__default.createElement(
    BoletoReaderContext.Provider,
    {
      value: _extends({}, state, {
        textNotSupported: textNotSupported || state.textNotSupported,
        textValidating: textValidating || state.textValidating,
        onValidate: onValidate,
        dispatch: dispatch,
        setter: setter,
      }),
    },
    children
  );
}
function Stop() {
  Quagga.offDetected();
  Quagga.offProcessed();
  Quagga.stop();
}
// exports.BarcodeReader = BarcodeReader;
// exports.BoletoBarcodeReader = BoletoBarcodeReader;
// exports.BoletoBarcodeReaderProvider = BoletoBarcodeReaderProvider;
// exports.BoletoBarcodeReaderSupport = BoletoBarcodeReaderSupport;
// exports.getBoletoByCode = getBoletoByCode;
// exports.getCamera = getCamera;
// exports.getDevice = getDevice;
// exports.isSmartDevice = isSmartDevice;
// exports.useBoletoReader = useBoletoReader;
// exports.useBoletoReaderReducer = useBoletoReaderReducer;
// exports.useWindowSizes = useWindowSizes;

export {
  BarcodeReader,
  BoletoBarcodeReader,
  BoletoBarcodeReaderProvider,
  BoletoBarcodeReaderSupport,
  getBoletoByCode,
  getCamera,
  getDevice,
  isSmartDevice,
  useBoletoReader,
  useBoletoReaderReducer,
  useWindowSizes,
  BoletoReaderContext,
  Stop,
};
//# sourceMappingURL=index.js.map
