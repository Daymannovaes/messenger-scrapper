import styled from 'styled-components';

export default styled.button`
    margin: 0 6px;
    padding: 6px 12px;
    border-radius: 3px;
    border: 2px solid #ddd;
    background: #ddd;

    transition: 200ms all;

    &[disabled] {
        background: #eee;
    }

    &:not([disabled]):hover {
        font-weight: bold;
        border-color: #ccc;
    }
`;
