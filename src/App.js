import { useState, useReducer } from 'react';
import './App.css';
import ContextMenu from './parts/contextmenu';
import CreateFromFolder from './dialogs/createfromfolder';
import CreateFromFiles from './dialogs/createfromfiles';
import Modal from './parts/modal';
import thumbnail from './thumbnail.jpg';

import { createPortal } from 'react-dom';

const FolderOptions = ({ selectDescendents, openFromFolder }) => {
    return <div className="menulist">
        <button onClick={selectDescendents}>Select Descendents</button>
        <button onClick={openFromFolder}>Create Model from this Folder</button>
    </div>
}

const SELECTION_REDUCER = (state, [action, payload]) => {
    switch (action) {
        case "remove": return state.filter(e => e !== payload);
        case "add": return [...state, payload];
        case "set": return payload;
        default: return state;
    }
}

function App() {
    const [isFromFolderOpen, setIsFromFolderOpen ] = useState(false);
    const [isFromFilesOpen, setIsFromFilesOpen ] = useState(false);
    const [view, setView ]= useState("tree");
    const [preview, setPreview] = useState(1);
    const [selection, editSelection] = useReducer(SELECTION_REDUCER, []);

  return (
      <>
        <div className="App">
            <div style={{ display: "flex", gap: "4px" }}>
                <div style={{ flex: "1 1 auto" }}>Pending Files</div>
                <button disabled={view === "tree"} onClick={() => { setView("tree") }}>Tree</button>
                <button disabled={view === "list"} onClick={() => { setView("list") }}>List</button>
            </div>
            <div></div>
            <div>Models to Import</div>
            <div className="filelist">
                {view === "tree" &&
                    <details open><summary>D:/storage/STLs/ <ContextMenu menu={<FolderOptions selectDescendents={() => { editSelection(["set", ["test1.stl", "test2.stl"]])}} openFromFolder={() => setIsFromFolderOpen(true)} />}>...</ContextMenu></summary>
                        <details open><summary>Heroes Infinite/ <button className="simple">...</button></summary>
                            <details open><summary>Arcadian Elves/ <button className="simple">...</button></summary>
                                <div><input type='checkbox' value="test1.stl" onChange={(e) => { e.target.checked ? editSelection(["add", e.target.value]) : editSelection(["remove", e.target.value]) }} checked={selection.includes("test1.stl")} /> Test1.stl</div>
                                <div><input type='checkbox' value="test2.stl" onChange={(e) => { e.target.checked ? editSelection(["add", e.target.value]) : editSelection(["remove", e.target.value]) }} checked={selection.includes("test2.stl")} /> Test2.stl</div>
                            </details>
                            <details open><summary>Dark Fairytales/ <button className="simple">...</button></summary>
                            </details>
                        </details>
                    </details>
                }
                {view === "list" &&
                    <>
                        <div><input type='checkbox' value="test1.stl" onChange={(e) => { e.target.checked ? editSelection(["add", e.target.value]) : editSelection(["remove", e.target.value]) }} checked={selection.includes("test1.stl")} /> D:/storage/STLs/Heroes Infinite/Arcadian Elves/Test1.stl</div>
                        <div><input type='checkbox' value="test2.stl" onChange={(e) => { e.target.checked ? editSelection(["add", e.target.value]) : editSelection(["remove", e.target.value]) }} checked={selection.includes("test2.stl")} /> D:/storage/STLs/Heroes Infinite/Arcadian Elves/Test2.stl</div>
                    </>
                }
            </div>
            <div className="options">
                <button disabled={selection.length === 0 || preview === 0} title="Add selected Files to Model">&raquo;</button>
            </div>
            <div className='itemlist'>
                {[1, 2, 3].map((i) => {
                    return <div key={i} className={`preview ${preview === i ? "isOpen" : ""}`}>
                    <img className="thumbnail" src={thumbnail} />
                    <div className="modelName" onClick={(e) => { preview === i ? setPreview(0) : setPreview(i) }}>Some Model</div>
                    {preview !== i ?
                        <div className="modelProps">
                            <div className="modelTags">
                                <span>Some Tag</span>
                                <span>Some Other Tag</span>
                            </div>
                            <div className="modelFileCount">9 Files in 4 groups</div>
                        </div>
                    :
                        <div className="modelPropsOpen">
                            <label>Tags</label>
                            <input type='text' value="Some_Tag Some_Other_Tag" />
                            <label>Files</label>
                            <div className="modelFiles">
                                <details open><summary>Supported</summary>
                                    <div>Test_pt1_Supported.stl</div>
                                    <div>Test_pt2_Supported.stl</div>
                                </details>
                                <details open><summary>Un-supported</summary>
                                    <div>Test_pt1_Unsupported.stl</div>
                                    <div>Test_pt2_Unsupported.stl</div>
                                </details>
                                <details open><summary>Bases</summary>
                                    <div>Test1_Base_Supported.stl</div>
                                    <div>Test1_Base_Unsupported.stl</div>
                                </details>
                                <details open><summary>Extras</summary>
                                    <div>TownBell.stl</div>
                                    <div>Bucket.stl</div>
                                    <div>Banner.stl</div>
                                </details>
                                <button>Add Group</button>
                            </div>
                        </div>
                    }
                </div>
                })}
            </div>
            <div style={{ display: "grid", gridAutoColumns: "auto", gridAutoFlow: "column", gap: "4px" }}>
                <button>Add Files...</button>
                <button disabled={selection.length === 0}>Remove Selected from Pending</button>
                <button disabled={selection.length === 0} onClick={() => { setIsFromFilesOpen(true); }}>Create Model from Selection</button>
            </div>
            <div></div>
            <button>Continue with Import</button>
        </div>
        {isFromFolderOpen && createPortal(<Modal setIsOpen={() => { setIsFromFolderOpen(false); }}><CreateFromFolder close={() => { setIsFromFolderOpen(false); }} /></Modal>, document.getElementById("root_modal"))}
        {isFromFilesOpen && createPortal(<Modal setIsOpen={() => { setIsFromFilesOpen(false); }}><CreateFromFiles close={() => { setIsFromFilesOpen(false); }} /></Modal>, document.getElementById("root_modal"))}
    </>
  );
}

export default App;
