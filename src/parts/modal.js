import styled from 'styled-components';

const Wrapper = styled.div`
    background: #0004;
    backdrop-filter: blur(4px);
    position: absolute;
    inset: 0 0 0 0;
    display: grid;
`;

const Dialog = styled.div`
    align-self: center;
    justify-self: center;
    background: #333;
    border: 1px solid #666;
    min-width: 640px;
    pointer-events: initial;
`;

const Center = styled.div`
    position: absolute;
    inset: 0 0 0 0;
    display: grid;
    pointer-events: none;
`

const Modal = ({ children, setIsOpen }) => {
    return <><Wrapper className={"popupwrapper"} onClick={function(e) {
        setIsOpen(false);
    }}>
    </Wrapper>
    <Center>
        <Dialog className={"popupdiv"}>{children}</Dialog>
    </Center>
    </>
}

export default Modal;
