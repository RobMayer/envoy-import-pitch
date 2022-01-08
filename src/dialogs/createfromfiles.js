import { useState } from 'react';
import styled from 'styled-components';
import thumbnail from '../thumbnail.jpg';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-auto-rows: auto;
    padding: 4px;
    gap: 4px;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4px;
`;

const CreateFromFolder = ({ close }) => {
    const [tags, setTags] = useState("Some_Tag Some_Other_Tag");
    const [name, setName] = useState("Some Name");
    const [process, setProcess] = useState(1);
    return <Main>
        <h3>2 Files Selected</h3>
        <Wrapper>
            <label>Name</label>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value)}} />
            <label>Thumbnail</label>
            <div className="fromFilesThumbnail">
                <img src={thumbnail} />
                <input type='file' />
            </div>
            <label>Tags</label>
            <input type='text' value={tags} onChange={(e) => { setTags(e.target.value); }} />
            <label>File Groupings</label>
            <div className="fromFilesFiles">
                <details open><summary>Some Group <button>X</button></summary>
                    <div>Test1.stl</div>
                    <div>Test2.stl</div>
                </details>
                <details open><summary>Some Other Group <button>X</button></summary>
                    <div>Test3.stl</div>
                    <div>Test4.stl</div>
                </details>
                <details open><summary>Un-grouped</summary>
                    <div>Test5.stl</div>
                    <div>Test6.stl</div>
                </details>
            </div>
            <label>After Allocating...</label>
            <Wrapper>
                <input type='radio' name="process" checked={process === 1} onChange={(e) => { setProcess(1) }} /><label>Remove allocated files/folders from the pending list.</label>
                <input type='radio' name="process" checked={process === 2} onChange={(e) => { setProcess(2) }} /><label>Leave allocated files/folders in pending list.</label>
            </Wrapper>
        </Wrapper>
        <button onClick={close}>Allocate Files</button>
    </Main>
}

export default CreateFromFolder;
