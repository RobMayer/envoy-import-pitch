import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    background: #0004;
    backdrop-filter: blur(4px);
    position: absolute;
    inset: 0 0 0 0;
    display: grid;
`;

const Menu = styled.div`
    position: absolute;
    background: #111;
    border: 1px solid #444;
    padding: 4px;
`;

const Component = ({ children, host, setIsOpen }) => {
    const { left, top } = host.current?.getBoundingClientRect() ?? {};
    return <><Wrapper className={"popupwrapper"} onClick={function(e) {
        setIsOpen(false);
    }}>
        <Menu className={"popupmenu"} style={{ left, top }}>{children}</Menu>
    </Wrapper>
    </>
}

const ContextMenu = ({ menu, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    return <>
        <button {...props} ref={ref} onClick={() => { setIsOpen((prev) => !prev) }} />
        {isOpen && createPortal(<Component host={ref} setIsOpen={setIsOpen}>{menu}</Component>, document.getElementById('root_widget'))}
    </>
}

ContextMenu.defaultProps = {
    menu: null
}

export default ContextMenu;
