import { readFileSync } from 'fs'
import { resolve } from 'path'


export const ampEmail = (name:string) => {
  return readFileSync(resolve(__dirname, name + '.amp.html'), 'utf-8')
}