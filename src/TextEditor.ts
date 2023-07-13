import { LitElement, html } from 'lit';
import { property, query, queryAll } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import { Action, actions } from './actions.js';
import { TextEditorStyles } from './text-editor.styles.js';

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

  private onClick(e: Event) {
    this.content.focus();

    const button = <HTMLButtonElement>e.target;
    const { command } = button.dataset;
    document.execCommand(command!);

    const state = document.queryCommandState(button.name);
    button.classList.toggle('selected', state);
  }

  private onInput() {
    if (this.content.firstChild && this.content.firstChild.nodeType === 3)
      document.execCommand('formatBlock', false, '<p>');

    this.value = this.content.innerHTML;
  }

  private onUpdate() {
    for (const button of this.buttons) {
      const state = document.queryCommandState(button.name);
      button.classList.toggle('selected', state);
    }
  }

  private toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  firstUpdated() {
    if (this.value) this.content.innerHTML = this.value;

    this.content.addEventListener('input', this.onInput.bind(this));
    this.content.addEventListener('mouseup', this.onUpdate.bind(this));
    this.content.addEventListener('keyup', this.onUpdate.bind(this));
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
            this.actions,
            ({ name, command, icon }) =>
              html`
                <button
                  name=${name}
                  type="button"
                  data-command=${command}
                  @click=${this.onClick}
                >
                  <span class="material-icons-round">${icon}</span>
                </button>
              `
          )}
        </section>

        <section>
          <button
            name="fullscreen"
            type="button"
            @click=${this.toggleFullscreen}
          >
            <span class="material-icons-round">fullscreen</span>
          </button>
        </section>
      </header>

      <main contenteditable="true"></main>
    `;
  }

  static styles = TextEditorStyles;
}
