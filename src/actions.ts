export interface Action {
  name: string;
  icon: string;
  command: string;
}

export const actions: Action[] = [
  {
    name: 'bold',
    icon: 'format_bold',
    command: 'bold',
  },
  {
    name: 'italic',
    icon: 'format_italic',
    command: 'italic',
  },
  {
    name: 'underline',
    icon: 'format_underline',
    command: 'underline',
  },
  {
    name: 'olist',
    icon: 'format_list_numbered',
    command: 'insertOrderedList',
  },
  {
    name: 'ulist',
    icon: 'format_list_bulleted',
    command: 'insertUnorderedList',
  },
  {
    name: 'indent',
    icon: 'format_indent_increase',
    command: 'indent',
  },
  {
    name: 'outdent',
    icon: 'format_indent_decrease',
    command: 'outdent',
  },
  {
    name: 'justify-left',
    icon: 'format_align_left',
    command: 'justifyLeft',
  },
  {
    name: 'justify-center',
    icon: 'format_align_center',
    command: 'justifyCenter',
  },
  {
    name: 'justify-right',
    icon: 'format_align_right',
    command: 'justifyRight',
  },
  {
    name: 'justify-full',
    icon: 'format_align_justify',
    command: 'justifyFull',
  },
  {
    name: 'undo',
    icon: 'undo',
    command: 'undo',
  },
  {
    name: 'redo',
    icon: 'redo',
    command: 'redo',
  },
  {
    name: 'remove-format',
    icon: 'format_clear',
    command: 'removeFormat',
  },
];
