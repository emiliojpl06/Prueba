/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function(){\r\n    // Se verifica si existe un token y se envia hacia la pagina home\r\n    checkToken();\r\n    // Evento click del formulario login\r\n    $(\"body\").on(\"submit\",\"#form-login\",function(e){\r\n        e.preventDefault();\r\n        login();\r\n    });\r\n});\r\nfunction login(){\r\n    var username = $('#username').val();\r\n    var password = $('#password').val();\r\n    if(username != '' && password != ''){\r\n        var url =  `${API_PATH}/login`;\r\n        var data = {\r\n            email:username,\r\n            password:password\r\n        };        \r\n        fetch(url, {\r\n            method: 'POST', // or 'PUT'\r\n            body: JSON.stringify(data), // data can be `string` or {object}!\r\n            headers:{\r\n                'Content-Type': 'application/json'\r\n            }\r\n        }).then(res =>res.json())\r\n        .then(response => {\r\n            if(response.estatus && response.estatus == \"error\"){\r\n                alertshow(\"Credenciales incorrectas.\",\"danger\"); \r\n                $(\"#username\").focus();\r\n            }else{\r\n                var UserData = {\r\n                    id:response.id,\r\n                    name:response.name,\r\n                    email:response.email,\r\n                    token:response.token\r\n                };\r\n                localStorageSaver(JSON.stringify(UserData));\r\n                session(\"Iniciando session como: \"+UserData.name);\r\n                setTimeout(function(){\r\n                    $(\"#form-login\")[0].reset();\r\n                    window.location.href = \"index.html\";\r\n                },1500);\r\n            }\r\n        })\r\n        .catch(error => alertshow(\"Error: \"+error.message,\"danger\"));\r\n    }else{\r\n        alertshow(\"Campos obligatorios\",\"danger\");\r\n        $('#username').focus();\r\n    }\r\n}\r\nfunction localStorageSaver(data){\r\n    if(localStorage.getItem(\"blogapi\")){\r\n        localStorage.setItem(\"blogapi\",data);\r\n    }else{\r\n        localStorage.setItem(\"blogapi\",data);\r\n    }\r\n}\r\nfunction checkToken(){\r\n   if(localStorage.getItem(\"blogapi\")){\r\n        var userdata = JSON.parse(localStorage.getItem(\"blogapi\"));\r\n        if(userdata.id > 0 && userdata.token.length == 36){\r\n            window.location.href = 'index.html';\r\n        }else{\r\n            localStorage.removeItem(\"blogapi\");\r\n        }\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbG9naW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4uanM/MzUyZiJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgLy8gU2UgdmVyaWZpY2Egc2kgZXhpc3RlIHVuIHRva2VuIHkgc2UgZW52aWEgaGFjaWEgbGEgcGFnaW5hIGhvbWVcclxuICAgIGNoZWNrVG9rZW4oKTtcclxuICAgIC8vIEV2ZW50byBjbGljayBkZWwgZm9ybXVsYXJpbyBsb2dpblxyXG4gICAgJChcImJvZHlcIikub24oXCJzdWJtaXRcIixcIiNmb3JtLWxvZ2luXCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxvZ2luKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbmZ1bmN0aW9uIGxvZ2luKCl7XHJcbiAgICB2YXIgdXNlcm5hbWUgPSAkKCcjdXNlcm5hbWUnKS52YWwoKTtcclxuICAgIHZhciBwYXNzd29yZCA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xyXG4gICAgaWYodXNlcm5hbWUgIT0gJycgJiYgcGFzc3dvcmQgIT0gJycpe1xyXG4gICAgICAgIHZhciB1cmwgPSAgYCR7QVBJX1BBVEh9L2xvZ2luYDtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgZW1haWw6dXNlcm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOnBhc3N3b3JkXHJcbiAgICAgICAgfTsgICAgICAgIFxyXG4gICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgLy8gb3IgJ1BVVCdcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksIC8vIGRhdGEgY2FuIGJlIGBzdHJpbmdgIG9yIHtvYmplY3R9IVxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+cmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLmVzdGF0dXMgJiYgcmVzcG9uc2UuZXN0YXR1cyA9PSBcImVycm9yXCIpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnRzaG93KFwiQ3JlZGVuY2lhbGVzIGluY29ycmVjdGFzLlwiLFwiZGFuZ2VyXCIpOyBcclxuICAgICAgICAgICAgICAgICQoXCIjdXNlcm5hbWVcIikuZm9jdXMoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgVXNlckRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6cmVzcG9uc2UuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpyZXNwb25zZS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOnJlc3BvbnNlLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOnJlc3BvbnNlLnRva2VuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2F2ZXIoSlNPTi5zdHJpbmdpZnkoVXNlckRhdGEpKTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb24oXCJJbmljaWFuZG8gc2Vzc2lvbiBjb21vOiBcIitVc2VyRGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2Zvcm0tbG9naW5cIilbMF0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaW5kZXguaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgfSwxNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGFsZXJ0c2hvdyhcIkVycm9yOiBcIitlcnJvci5tZXNzYWdlLFwiZGFuZ2VyXCIpKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGFsZXJ0c2hvdyhcIkNhbXBvcyBvYmxpZ2F0b3Jpb3NcIixcImRhbmdlclwiKTtcclxuICAgICAgICAkKCcjdXNlcm5hbWUnKS5mb2N1cygpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGxvY2FsU3RvcmFnZVNhdmVyKGRhdGEpe1xyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJibG9nYXBpXCIpKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImJsb2dhcGlcIixkYXRhKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYmxvZ2FwaVwiLGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrVG9rZW4oKXtcclxuICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJibG9nYXBpXCIpKXtcclxuICAgICAgICB2YXIgdXNlcmRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYmxvZ2FwaVwiKSk7XHJcbiAgICAgICAgaWYodXNlcmRhdGEuaWQgPiAwICYmIHVzZXJkYXRhLnRva2VuLmxlbmd0aCA9PSAzNil7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2luZGV4Lmh0bWwnO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImJsb2dhcGlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/login.js\n");

/***/ })

/******/ });