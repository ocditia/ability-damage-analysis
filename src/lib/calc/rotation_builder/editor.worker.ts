import { runEditorCalculation } from './editorCalculation';
self.onmessage = ({data}) => {
    try { self.postMessage({id: data.id, ...runEditorCalculation(data.input)}); }
    catch (error) { self.postMessage({id: data.id, error: String(error)}); }
};
