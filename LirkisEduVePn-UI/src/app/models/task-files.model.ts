import {Buffer} from 'buffer';

export class TaskFiles {
  pnmlFile: string = "";
  languageFile: string = "";

  public constructor(init?: Partial<TaskFiles>) {
    Object.assign(this, init);
  }

  public static decode(taskFiles: TaskFiles) {
    taskFiles.pnmlFile = Buffer.from(taskFiles.pnmlFile, 'base64').toString('utf-8')
    taskFiles.languageFile = Buffer.from(taskFiles.languageFile, 'base64').toString('utf-8')
  }
}
