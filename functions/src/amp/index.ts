import { resolve } from 'path'
import * as Sqrl from 'squirrelly'

Sqrl.defaultTags(['<%', '%>'])

function getExt(type : string): string {
  switch (type) {
    case 'amp': return '.amp.html'
    case 'html': return '.html'
    case 'txt': return '.txt'
  }
  return ''
}

export const ampEmail = (name:string, type: string, options: any) => {
  return Sqrl.renderFile(resolve(__dirname, name + getExt(type)), options)
}