/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-outdated",
factory: function (require) {
var plugin;plugin=(()=>{"use strict";var e={429:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y});const s=require("@yarnpkg/cli"),n=require("@yarnpkg/core"),o=require("clipanion"),a=require("os"),i=require("semver"),c=require("@yarnpkg/plugin-essentials"),d=Boolean,p=e=>i.valid(i.coerce(e));class l{constructor(e,t,r){this.project=e,this.workspace=t,this.cache=r}async fetch(e,t){const r=await c.suggestUtils.fetchDescriptorFrom(e,t,{cache:this.cache,preserveModifier:e.range,project:this.project,workspace:this.workspace});return p(null===r?e.range:r.range)}}const u=/^([0-9]+\.)([0-9]+\.)(.+)$/,h=["name","current","latest","workspace","type"];class m{constructor(e,t,r,s){this.context=e,this.configuration=t,this.dependencies=r,this.extraColumns=s,this.sizes=null,this.headers={current:"Current",latest:"Latest",name:"Package",type:"Package Type",workspace:"Workspace"}}print(){this.sizes=this.getColumnSizes(),this.printHeader(),this.dependencies.forEach(e=>{var t;const r=this.getDiffColor(e);this.printRow({current:e.current.padEnd(this.sizes.current),latest:this.formatVersion(e,"latest",r),name:this.applyColor(e.name.padEnd(this.sizes.name),r),type:e.type.padEnd(this.sizes.type),workspace:null===(t=e.workspace)||void 0===t?void 0:t.padEnd(this.sizes.workspace)})})}applyColor(e,t){return n.formatUtils.pretty(this.configuration,e,t)}formatVersion(e,t,r){const s=e[t].padEnd(this.sizes[t]),o=s.match(u);if(!o)return s;const a=["red","yellow","green"].indexOf(r)+1,i=o.slice(1,a).join(""),c=o.slice(a).join("");return i+n.formatUtils.pretty(this.configuration,this.applyColor(c,r),"bold")}getDiffColor(e){const t=i.coerce(e.current),r=i.coerce(e.latest);return r.major>t.major?"red":r.minor>t.minor?"yellow":"green"}getColumnSizes(){const e={current:this.headers.current.length,latest:this.headers.latest.length,name:this.headers.name.length,type:this.headers.type.length,workspace:this.headers.workspace.length};for(const t of this.dependencies)for(const[r,s]of Object.entries(t)){const t=e[r],n=(s||"").length;e[r]=t>n?t:n}return e}formatColumnHeader(e){return n.formatUtils.pretty(this.configuration,this.headers[e].padEnd(this.sizes[e]),"bold")}printHeader(){this.printRow({current:this.formatColumnHeader("current"),latest:this.formatColumnHeader("latest"),name:this.formatColumnHeader("name"),type:this.formatColumnHeader("type"),workspace:this.formatColumnHeader("workspace")})}printRow(e){const t=h.filter(e=>{var t;return null===(t=this.extraColumns[e])||void 0===t||t}).map(t=>e[t]).join("   ");this.context.stdout.write(t+a.EOL)}}var f=function(e,t,r,s){var n,o=arguments.length,a=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,s);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(a=(o<3?n(a):o>3?n(t,r,a):n(t,r))||a);return o>3&&a&&Object.defineProperty(t,r,a),a};class g extends s.BaseCommand{constructor(){super(...arguments),this.all=!1,this.json=!1}async execute(){const{cache:e,configuration:t,project:r,workspace:s}=await this.loadProject(),n=new l(r,s,e),o=this.getWorkspaces(r,s),i=this.getDependencies(o),c=await this.getOutdatedDependencies(n,i);this.json?this.context.stdout.write(JSON.stringify(c)+a.EOL):c.length?new m(this.context,t,c,{workspace:this.all}).print():this.context.stdout.write("✨ All your dependencies are up to date!"+a.EOL)}async loadProject(){const e=await n.Configuration.find(this.context.cwd,this.context.plugins),[t,{project:r,workspace:o}]=await Promise.all([n.Cache.find(e),n.Project.find(e,this.context.cwd)]);if(!o)throw new s.WorkspaceRequiredError(r.cwd,this.context.cwd);return{cache:t,configuration:e,project:r,workspace:o}}getWorkspaces(e,t){return this.all?e.workspaces:[t]}getDependencies(e){const t=[],r=["dependencies","devDependencies"];for(const s of e)for(const e of r)for(const r of s.manifest[e].values())i.coerce(r.range)&&t.push({dependencyType:e,descriptor:r,workspace:s});return t}async getOutdatedDependencies(e,t){const r=t.map(async({dependencyType:t,descriptor:r,workspace:s})=>{const o=await e.fetch(r,"latest"),a=p(r.range);if(a!==o)return{current:a,latest:o,name:n.structUtils.stringifyIdent(r),type:t,workspace:this.all?this.getWorkspaceName(s):void 0}});return(await Promise.all(r)).filter(d).sort((e,t)=>e.name.localeCompare(t.name))}getWorkspaceName(e){return e.manifest.name?n.structUtils.stringifyIdent(e.manifest.name):e.computeCandidateName()}}g.usage=o.Command.Usage({description:"view outdated dependencies",details:"This command finds outdated dependencies in a project and prints the result in a table or JSON format.",examples:[["View outdated dependencies","yarn outdated"]]}),f([o.Command.Boolean("-a,--all",{description:"Include outdated dependencies from all workspaces"})],g.prototype,"all",void 0),f([o.Command.Boolean("--json",{description:"Format the output as JSON"})],g.prototype,"json",void 0),f([o.Command.Path("outdated")],g.prototype,"execute",null);const y={commands:[g]}}},t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={exports:{}};return e[s](n,n.exports,r),n.exports}return r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(429)})();
return plugin;
}
};