import { useState } from 'react';
import styled from 'styled-components';

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
    const [tags, setTags] = useState("");
    const [glob, setGlob] = useState("*.(stl|3mf|lys|lyt|chitubox)");
    const [structure, setStructure] = useState(1);
    const [process, setProcess] = useState(1);
    const [thumbnail, setThumbnail] = useState(1);
    return <Main>
        <h3>D:/Storage/STLs/**</h3>
        <Wrapper>
            <label>Files to Allocate</label>
            <input type='text' value={glob} onChange={(e) => { setGlob(e.target.value)}} />
            <label>Structure</label>
            <Wrapper>
                <input type='radio' name="structure" checked={structure === 1} onChange={(e) => { setStructure(1) }} /><label>Flatten subfolders into one Model, no File Groups</label>
                <input type='radio' name="structure" checked={structure === 2} onChange={(e) => { setStructure(2) }} /><label>Flatten subfolders into one Model, any subfolder containing files will become a separate File Group</label>
                <input type='radio' name="structure" checked={structure === 3} onChange={(e) => { setStructure(3) }} /><label>Any folder with files becomes Model</label>
                <input type='radio' name="structure" checked={structure === 4} onChange={(e) => { setStructure(4) }} /><label>Only leafs are Models, ignore files in folders with subfolders</label>
                <input type='radio' name="structure" checked={structure === 5} onChange={(e) => { setStructure(5) }} /><label>Leafs are File Groups and Level above Leafs are Models</label>
            </Wrapper>
            <label>Tags</label>
            <Wrapper>
                <input type='checkbox' /><label>Add Tags based on Leaf Name</label>
                <input type='checkbox' disabled={[1, 2].includes(structure)} /><label>Add Tags based on parent folder(s) Names</label>
                <input type='checkbox' /><label>Add These: <input type='text' value={tags} onChange={(e) => { setTags(e.target.value); }} /></label>
            </Wrapper>
            <label>Pick a Thumbnail?</label>
            <Wrapper>
                <input type='radio' name="thumbnail" checked={thumbnail === 1} onChange={(e) => { setThumbnail(1) }} /><label>I'll worry about the thumbnail after allocation.</label>
                <input type='radio' name="thumbnail" checked={thumbnail === 2} onChange={(e) => { setThumbnail(2) }} /><label>Take your best guess.</label>
            </Wrapper>
            <label>After Allocating...</label>
            <Wrapper>
                <input type='radio' name="process" checked={process === 1} onChange={(e) => { setProcess(1) }} /><label>Remove allocated files/folders from the pending list.</label>
                <input type='radio' name="process" checked={process === 2} onChange={(e) => { setProcess(2) }} /><label>Leave allocated files/folders in pending list.</label>
            </Wrapper>
        </Wrapper>
        <button onClick={close}>Allocate Folder</button>
    </Main>
}

export default CreateFromFolder;
