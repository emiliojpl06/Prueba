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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/registrarse.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/registrarse.js":
/*!****************************!*\
  !*** ./src/registrarse.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function(){\r\n    // Evento click del formulario registrarse\r\n    $(\"body\").on(\"submit\",\"#form-registrarse\",function(e){\r\n        e.preventDefault();\r\n        registrarse();\r\n    });\r\n    // Validar contraseñas\r\n    $(\"body\").on(\"keyup\",\"#re-password\",function(e){\r\n        var password = $(\"#password\").val();\r\n        var repassword = $(this).val();\r\n        if(password === repassword){\r\n            $(this).addClass(\"valid\").removeClass(\"invalid\").attr('title','Contrañas coinciden');\r\n        }else{\r\n            $(this).addClass(\"invalid\").removeClass(\"valid\").attr(\"title\",\"Contrañas no coinciden\");\r\n        }\r\n    })\r\n});\r\nfunction registrarse(){\r\n    var name = $('#name').val();\r\n    var email = $('#email').val();\r\n    var password = $('#rpassword').val();\r\n    var repassword = $('#re-password').val();\r\n    if(name != '' && email != '' && password != '' && repassword != ''){\r\n        if(password === repassword){\r\n            var url = `${API_PATH}/register`;\r\n            var data = {\r\n                name:name,\r\n                email:email,\r\n                password:password\r\n            };\r\n            \r\n            fetch(url, {\r\n              method: 'POST', // or 'PUT'\r\n              body: JSON.stringify(data), // data can be `string` or {object}!\r\n              headers:{\r\n                'Content-Type': 'application/json'\r\n              }\r\n            })\r\n            .then(res => res.json())\r\n            .then(response => {\r\n                if (response.error) {\r\n                    alertshow(response.message,'danger');\r\n                    $(\"#email\").focus();\r\n                }else{\r\n                    \r\n                    alertshow(\"usuario: \"+response.name+\" <small>Creado</smal>\",'success');\r\n                    $(\"#form-registrarse\")[0].reset();\r\n                    \r\n                }\r\n            })\r\n            /*.then((res) => {\r\n                if(res.ok){\r\n                    res.json()\r\n                }\r\n                throw new Error('La respuesta no es ok...');\r\n            })\r\n            \r\n            .then(response => {\r\n                if(response.error){\r\n                    alertshow(response.message,'danger');\r\n                    $(\"#email\").focus();\r\n                }else{\r\n                    $(\"#form-registrarse\")[0].reset();\r\n                    alertshow(\"usuario: \"+response.email+\" <small>Creado</smal>\",'success');\r\n                }\r\n            })*/\r\n            .catch(error => alertshow('Error: '+error.message,'danger'));\r\n        }else{\r\n            alertshow(\"Contraseñas no coiciden!\",'warning');\r\n            $('#re-password').focus(); \r\n        }\r\n    }else{\r\n        alertshow(\"Campos obligatorios\",'danger');\r\n        $('#username').focus();\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVnaXN0cmFyc2UuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVnaXN0cmFyc2UuanM/MzlhYiJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgLy8gRXZlbnRvIGNsaWNrIGRlbCBmb3JtdWxhcmlvIHJlZ2lzdHJhcnNlXHJcbiAgICAkKFwiYm9keVwiKS5vbihcInN1Ym1pdFwiLFwiI2Zvcm0tcmVnaXN0cmFyc2VcIixmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmVnaXN0cmFyc2UoKTtcclxuICAgIH0pO1xyXG4gICAgLy8gVmFsaWRhciBjb250cmFzZcOxYXNcclxuICAgICQoXCJib2R5XCIpLm9uKFwia2V5dXBcIixcIiNyZS1wYXNzd29yZFwiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciBwYXNzd29yZCA9ICQoXCIjcGFzc3dvcmRcIikudmFsKCk7XHJcbiAgICAgICAgdmFyIHJlcGFzc3dvcmQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIGlmKHBhc3N3b3JkID09PSByZXBhc3N3b3JkKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInZhbGlkXCIpLnJlbW92ZUNsYXNzKFwiaW52YWxpZFwiKS5hdHRyKCd0aXRsZScsJ0NvbnRyYcOxYXMgY29pbmNpZGVuJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJpbnZhbGlkXCIpLnJlbW92ZUNsYXNzKFwidmFsaWRcIikuYXR0cihcInRpdGxlXCIsXCJDb250cmHDsWFzIG5vIGNvaW5jaWRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KTtcclxuZnVuY3Rpb24gcmVnaXN0cmFyc2UoKXtcclxuICAgIHZhciBuYW1lID0gJCgnI25hbWUnKS52YWwoKTtcclxuICAgIHZhciBlbWFpbCA9ICQoJyNlbWFpbCcpLnZhbCgpO1xyXG4gICAgdmFyIHBhc3N3b3JkID0gJCgnI3JwYXNzd29yZCcpLnZhbCgpO1xyXG4gICAgdmFyIHJlcGFzc3dvcmQgPSAkKCcjcmUtcGFzc3dvcmQnKS52YWwoKTtcclxuICAgIGlmKG5hbWUgIT0gJycgJiYgZW1haWwgIT0gJycgJiYgcGFzc3dvcmQgIT0gJycgJiYgcmVwYXNzd29yZCAhPSAnJyl7XHJcbiAgICAgICAgaWYocGFzc3dvcmQgPT09IHJlcGFzc3dvcmQpe1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gYCR7QVBJX1BBVEh9L3JlZ2lzdGVyYDtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOm5hbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDplbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgLy8gb3IgJ1BVVCdcclxuICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gZGF0YSBjYW4gYmUgYHN0cmluZ2Agb3Ige29iamVjdH0hXHJcbiAgICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRzaG93KHJlc3BvbnNlLm1lc3NhZ2UsJ2RhbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZW1haWxcIikuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0c2hvdyhcInVzdWFyaW86IFwiK3Jlc3BvbnNlLm5hbWUrXCIgPHNtYWxsPkNyZWFkbzwvc21hbD5cIiwnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZm9ybS1yZWdpc3RyYXJzZVwiKVswXS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvKi50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5vayl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMYSByZXNwdWVzdGEgbm8gZXMgb2suLi4nKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLmVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydHNob3cocmVzcG9uc2UubWVzc2FnZSwnZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNlbWFpbFwiKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNmb3JtLXJlZ2lzdHJhcnNlXCIpWzBdLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRzaG93KFwidXN1YXJpbzogXCIrcmVzcG9uc2UuZW1haWwrXCIgPHNtYWxsPkNyZWFkbzwvc21hbD5cIiwnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSovXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBhbGVydHNob3coJ0Vycm9yOiAnK2Vycm9yLm1lc3NhZ2UsJ2RhbmdlcicpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYWxlcnRzaG93KFwiQ29udHJhc2XDsWFzIG5vIGNvaWNpZGVuIVwiLCd3YXJuaW5nJyk7XHJcbiAgICAgICAgICAgICQoJyNyZS1wYXNzd29yZCcpLmZvY3VzKCk7IFxyXG4gICAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICAgIGFsZXJ0c2hvdyhcIkNhbXBvcyBvYmxpZ2F0b3Jpb3NcIiwnZGFuZ2VyJyk7XHJcbiAgICAgICAgJCgnI3VzZXJuYW1lJykuZm9jdXMoKTtcclxuICAgIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/registrarse.js\n");

/***/ })

/******/ });