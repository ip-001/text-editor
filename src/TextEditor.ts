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

  @property({ type: Boolean, reflect: true })
  required!: boolean;

  @query('.text-editor')
  content!: HTMLElement;

  @query('.code-editor')
  code!: HTMLElement;

  @queryAll('button')
  buttons!: HTMLButtonElement[];

  private onTextClick(e: Event) {
    this.content.focus();

    const button = <HTMLButtonElement>e.target;
    const { command } = button.dataset;
    document.execCommand(command!);

    const state = document.queryCommandState(button.name);
    button.classList.toggle('selected', state);
  }

  private onTextInput() {
    if (this.content.firstChild && this.content.firstChild.nodeType === 3)
      document.execCommand('formatBlock', false, '<p>');

    if (this.content.innerHTML === '<br>') this.content.innerHTML = '';

    this.code.textContent = this.content.innerHTML;
    this.value = this.content.innerHTML;
  }

  private onCodeInput() {
    this.content.innerHTML = this.code.textContent!;
    this.value = this.code.textContent!;
  }

  private onTextUpdate() {
    for (const button of this.buttons) {
      const state = document.queryCommandState(button.name);
      button.classList.toggle('selected', state);
    }
  }

  private onCodeUpdate() {
    const button = this.shadowRoot?.querySelector('[name=code-editor]');
    button?.classList.toggle('selected', true);
  }

  private toggleCodeEditor(e: Event) {
    const button = <HTMLButtonElement>e.target;
    button.classList.toggle('selected');

    this.code.hidden = !this.code.hidden;
  }

  private toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  firstUpdated() {
    if (this.value) this.content.innerHTML = this.value;

    this.content.addEventListener('input', this.onTextInput.bind(this));
    this.content.addEventListener('mouseup', this.onTextUpdate.bind(this));
    this.content.addEventListener('keyup', this.onTextUpdate.bind(this));

    this.code.addEventListener('input', this.onCodeInput.bind(this));
    this.code.addEventListener('mouseup', this.onCodeUpdate.bind(this));
    this.code.addEventListener('keyup', this.onCodeUpdate.bind(this));
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
                  @click=${this.onTextClick}
                >
                  <span class="material-icons-round">${icon}</span>
                </button>
              `
          )}

          <button
            name="code-editor"
            type="button"
            @click=${this.toggleCodeEditor}
          >
            <span class="material-icons-round">code</span>
          </button>
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

      <main>
        <section contenteditable="true" class="text-editor"></section>
        <section contenteditable="true" class="code-editor" hidden></section>
      </main>
    `;
  }

  static styles = TextEditorStyles;
}
