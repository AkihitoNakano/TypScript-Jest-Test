import Nedb from 'nedb'
import { UserCredentials } from '../Models/ServerModels'

export class UserCredentialsDbAccess {
  private nedb: Nedb

  constructor(nedb = new Nedb('databases/Users.db')) {
    this.nedb = nedb
    this.nedb.loadDatabase()
  }

  public async putUserCredential(UserCredentials: UserCredentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(UserCredentials, (err: Error | null, docs: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  }
  public async getUserCredential(username: string, password: string): Promise<UserCredentials | null> {
    console.log('######', username, password)
    return new Promise((resolve, reject) => {
      this.nedb.find({ userName: username, password: password }, (err: Error | null, docs: UserCredentials[]) => {
        if (err) {
          return reject(err)
        } else {
          if (docs.length == 0) {
            return resolve(null)
          } else {
            return resolve(docs[0])
          }
        }
      })
    })
  }
}
