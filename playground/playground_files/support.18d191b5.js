(window.webpackJsonp=window.webpackJsonp||[]).push([["page/support"],{T7tS:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=r(s("4SvX")),a=r(s("i6So")),o=s("pIdu");function r(e){return e&&e.__esModule?e:{default:e}}const u={init:()=>{d.default.subscribe("#feedbackWin form",u.send),d.default.subscribe("#feedback-form",u.send)},send:e=>a.default.post("support.send",e).then(()=>(e.reset(),"feedback-form"!==e.id&&jQuery("#feedbackWin").modal("hide"),(0,o.showMessage)({title:"Спасибо",message:"Ваше сообщение отправлено."}))).catch(t=>{400===t.status&&t.detail?d.default.attachErrors(e,t.detail):(0,o.showError)(t)})};var i=u;t.default=i}}]);