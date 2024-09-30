import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MarkdownEditor from "./Lazy/LazyPage.tsx";
import App from "./Suspense/SuspensePage.tsx";
// import ContextPage from "./Context/ContextApp.tsx";
import AppDL from "./UseContext/App.tsx";
import UseContextPage from "./UseContext/ContextPage.tsx";
import AppError from "./ErrorBoundary/App.tsx";
import UseMemoApp from "./UseMemo/UseMemoApp.tsx";
import AppUseMemo from "./UseMemo/ExamplesUseMemo.tsx";
import AppProfiler from "./Profiler/ProfilerApp.tsx";
import Input from "./Input/Input.tsx";
import FormSubmit from "./Input/FormSubmit.tsx";
import EditPost from "./Select/Select.tsx";
import MyFormSelectVegetables from "./Select/SelectApp.tsx";
import TextAreaApp from "./TextArea/TextAreaApp.tsx";
import AppStatus from "./CustomHooks/SaveButton.tsx";
import ChatApp from "./CustomHooks/Exams/App.tsx";
import BigCircle from "./CustomHooks/ColorRandom/ColorApp.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
      {/* <ContextPage /> */}
      <MarkdownEditor />
      <App />
      <AppDL />
      <UseContextPage />
      <AppError />
      <UseMemoApp />
      <hr />
      <AppUseMemo />
      <hr />
      <AppProfiler />
      <hr />
      <Input />
      <hr />
      <FormSubmit />
      <hr />
      <EditPost />
      <hr />
      <MyFormSelectVegetables />
      <hr />
      <TextAreaApp />
      <hr />
      <AppStatus />
      <hr />
      <ChatApp />
      <hr />
      <BigCircle />
  </StrictMode>
);
