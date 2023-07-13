import { css } from 'lit';

export const TextEditorStyles = css`
  :host {
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'header'
      'main  ';
    background-color: white;
    border: 1px solid var(--text-editor-border-color, #ecf0f1);
    border-radius: 0.25rem;
    box-sizing: border-box;
  }

  :host([fullscreen]) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    z-index: 2;
  }

  header {
    grid-area: header;
    height: auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--text-editor-border-color, #ecf0f1);
    box-sizing: border-box;
  }

  button {
    all: initial;
    margin: 0;
    padding: 14px;
    font-family: 'Material Icons';
    font-size: 20px;
    background: none;
    border: none;
    outline: none;
    text-decoration: none;
  }

  button:hover {
    background-color: var(--text-editor-hover-color, #ecf0f1);
    cursor: pointer;
  }

  button > span {
    pointer-events: none;
  }

  button.selected {
    background-color: var(--text-editor-hover-color, #ecf0f1);
  }

  main {
    grid-area: main;
    height: auto;
    min-height: 100px;
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    overflow: hidden;
    resize: vertical;
    outline: 0px solid transparent;
    box-sizing: border-box;
  }

  p {
    all: unset;
  }
`;
