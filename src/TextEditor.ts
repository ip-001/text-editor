import { LitElement, css, html } from 'lit';
import { property, query, queryAll } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import { Action, actions } from './actions.js';

export class TextEditor extends LitElement {
  private actions: Action[] = actions;

  @property({ type: String, reflect: true })
  name!: string;

  @property({ type: String, reflect: false })
  value!: string;

  @property({ type: Boolean, reflect: true })
  fullscreen: boolean = false;

  @query('main')
  content!: HTMLElement;

  @queryAll('button')
  buttons!: HTMLButtonElement[];

  static styles = css`
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
      all: initial;
    }
  `;

  private onClick(e: Event) {
    const button = <HTMLButtonElement>e.target;

    const { command } = button.dataset;
    document.execCommand(command!);

    const state = document.queryCommandState(button.name);
    button.classList.toggle('selected', state);

    this.content.focus();
  }

  private onInput() {
    const { firstChild } = this.content;
    if (firstChild && firstChild.nodeType === 3)
      document.execCommand('formatBlock', false, '<p>');

    if (this.content.innerHTML === '<br>') this.content.innerHTML = '';
    this.value = this.content.innerHTML;
  }

  private onMouseup() {
    for (const button of this.buttons) {
      const state = document.queryCommandState(button.name);
      button.classList.toggle('selected', state);
    }
  }

  private onToggle() {
    this.fullscreen = !this.fullscreen;
  }

  firstUpdated() {
    if (this.value) this.content.innerHTML = this.value;

    this.content.addEventListener('input', () => this.onInput());
    this.content.addEventListener('mouseup', () => this.onMouseup());
  }

  render() {
    return html`
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <header>
        <section>
          ${map(
            actions,
            (a: Action) =>
              html`<button
                name=${a.name}
                type="button"
                data-command=${a.command}
                @click=${this.onClick}
              >
                <span class="material-icons-round">${a.icon}</span>
              </button>`
          )}
        </section>

        <section>
          <button name="fullscreen" type="button" @click=${this.onToggle}>
            <span class="material-icons-round">fullscreen</span>
          </button>
        </section>
      </header>

      <main contenteditable="true"></main>
    `;
  }
}
