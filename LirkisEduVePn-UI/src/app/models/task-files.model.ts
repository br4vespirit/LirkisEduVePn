import {Buffer} from 'buffer';

export class TaskFiles {
  htmlFile: string = "";
  tsFile: string = "";
  specTsFile: string = "";
  pnmlFile: string = "";
  languageFile: string = "";

  public constructor(init?: Partial<TaskFiles>) {
    Object.assign(this, init);
  }

  public static decode(taskFiles: TaskFiles) {
    taskFiles.pnmlFile = Buffer.from(taskFiles.pnmlFile, 'base64').toString('binary')
    taskFiles.htmlFile = Buffer.from(taskFiles.htmlFile, 'base64').toString('binary')
    taskFiles.tsFile = Buffer.from(taskFiles.tsFile, 'base64').toString('binary')
    taskFiles.specTsFile = Buffer.from(taskFiles.specTsFile, 'base64').toString('binary')
    taskFiles.languageFile = Buffer.from(taskFiles.languageFile, 'base64').toString('binary')
  }
}
