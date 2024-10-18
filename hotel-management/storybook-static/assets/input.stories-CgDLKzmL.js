import{j as R}from"./jsx-runtime-Cw0GR0a5.js";import{r as T}from"./index-CTjT7uj6.js";import{I as x}from"./index-C6ie2Boq.js";const W={title:"Components/Input",component:x,argTypes:{backgroundColor:{control:"color"},color:{control:"color"},size:{control:{type:"select",options:["sm","md","lg"]}},direction:{control:{type:"select",options:["row","column","row-reverse","column-reverse"]}}}},o=s=>{const[V,y]=T.useState(s.value||""),L=l=>{y(l.target.value),s.onChange&&s.onChange(l)};return R.jsx(x,{...s,value:V,onChange:L})},e=o.bind({});e.args={label:"Default Input",placeholder:"Search for rooms and offer",type:"text",value:"",size:"md",backgroundColor:"#fff",color:"#000",borderRadius:4,direction:"column"};const a=o.bind({});a.args={label:"Input with Placeholder",placeholder:"Search for rooms and offer",type:"text",value:""};const n=o.bind({});n.args={label:"Large Input",placeholder:"Search for rooms and offer",type:"text",size:"lg",value:""};const t=o.bind({});t.args={label:"Small Input",placeholder:"Search for rooms and offer",type:"text",size:"sm",value:""};const r=o.bind({});r.args={label:"Custom Colored Input",placeholder:"Search for rooms and offer",type:"text",value:"",backgroundColor:"#e0f7fa",color:"#00796b"};var u,c,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Input {...args} value={value} onChange={handleChange} />;
}`,...(g=(c=e.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var p,h,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Input {...args} value={value} onChange={handleChange} />;
}`,...(d=(h=a.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};var m,v,i;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Input {...args} value={value} onChange={handleChange} />;
}`,...(i=(v=n.parameters)==null?void 0:v.docs)==null?void 0:i.source}}};var C,f,I;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Input {...args} value={value} onChange={handleChange} />;
}`,...(I=(f=t.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};var S,b,E;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const [value, setValue] = useState(args.value || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (args.onChange) {
      args.onChange(event);
    }
  };
  return <Input {...args} value={value} onChange={handleChange} />;
}`,...(E=(b=r.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};const j=["Default","WithPlaceholder","LargeInput","SmallInput","WithCustomColor"];export{e as Default,n as LargeInput,t as SmallInput,r as WithCustomColor,a as WithPlaceholder,j as __namedExportsOrder,W as default};
