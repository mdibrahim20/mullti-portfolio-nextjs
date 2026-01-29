(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[216],{8806:function(t,e,n){Promise.resolve().then(n.bind(n,9698))},6264:function(t,e,n){"use strict";n.d(e,{I:function(){return i}});let c="https://api.ibrahimlogs.me".replace(/\/$/,"");async function a(t,e){try{let n=await fetch("".concat(c).concat(t),{...e,headers:{Accept:"application/json","Content-Type":"application/json",...(null==e?void 0:e.headers)||{}}});if(!n.ok){let c=await n.text().catch(()=>"");throw Error("".concat((null==e?void 0:e.method)||"GET"," ").concat(t," failed (").concat(n.status,"): ").concat(c))}if(204===n.status)return{};return await n.json()}catch(e){return console.warn("API call failed, using fallback data: ".concat(t),e),{data:{siteConfig:{site_name:"Portfolio",tagline:"Full-stack Developer",github_url:"#",linkedin_url:"#"},portfolioSettings:{active_version:"v1"},navItems:[],socialLinks:[],sections:{hero:[{settings:{},ctas:[]}],about:[{}],projects:[{}],skills:[{}],experience:[{}],contact:[{}],footer:[{}]},projects:[],experiences:[],skills:{categories:[],radars:[]},highlights:[],principles:[]}}}}async function i(t){return a("/api/public/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}},3231:function(t,e,n){"use strict";n.d(e,{Z:function(){return c}});/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,n(8030).Z)("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},2030:function(t,e,n){"use strict";n.d(e,{Z:function(){return c}});/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,n(8030).Z)("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]])},5430:function(t,e,n){"use strict";n.d(e,{Z:function(){return c}});/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,n(8030).Z)("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]])}},function(t){t.O(0,[172,698,971,23,744],function(){return t(t.s=8806)}),_N_E=t.O()}]);