import { createServer, ServerResponse, IncomingMessage } from 'http'
import { Utils } from '../Utils/Utils'
import { LoginHandler } from '../Handlers/LoginHandler'
import { DataHandler } from '../Handlers/DataHandler'
import { Authorizer } from '../Authorization/Authorizer'
import { UsersDBAccess } from '../Data/UserDBAccess'

export class Server {
  private authorizer: Authorizer = new Authrizer()
  private usersDBAccess: UsersDBAcess = new UserDBAccess()

  public startServer() {
    createServer(async (req, res) => {
      const basePath = Utils.getRequestBasePath(req)
    })
  }
}
