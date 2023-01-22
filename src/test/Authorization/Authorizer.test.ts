import { Authorizer } from '../../app/Authorization/Authorizer'
import { SessionTokenDBAccess } from '../../app/Authorization/SessionTokenDBAccess'
import { UserCredentialsDbAccess } from '../../app/Authorization/UserCredentialsDbAccess'
import { Account, SessionToken, TokenState } from '../../app/Models/ServerModels'
jest.mock('../../app/Authorization/SessionTokenDBAccess')
jest.mock('../../app/Authorization/UserCredentialsDbAccess')

const someAccount: Account = {
  username: 'someUser',
  password: 'somePassword',
}

describe('Authorizer test suite', () => {
  let authorizer: Authorizer

  let sessionTokenDBAccessMock = {
    storeSessionToken: jest.fn(),
    getToken: jest.fn(),
  }

  let userCredentialsDBAccessMock = {
    getUserCredential: jest.fn(),
  }

  beforeEach(() => {
    authorizer = new Authorizer(sessionTokenDBAccessMock as any, userCredentialsDBAccessMock as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('constructor arguments', () => {
    new Authorizer()
    expect(SessionTokenDBAccess).toBeCalled()
    expect(UserCredentialsDbAccess).toBeCalled()
  })

  test('should return sessionToken for valid credentials', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0)
    jest.spyOn(global.Date, 'now').mockReturnValueOnce(0)
    userCredentialsDBAccessMock.getUserCredential.mockResolvedValue({
      accessRights: [1, 2, 3],
      username: 'someUser',
      password: 'somePassword',
    })

    const expectedSessionToken: SessionToken = {
      userName: 'someUser',
      accessRights: [1, 2, 3],
      valid: true,
      tokenId: '',
      expirationTime: new Date(1000 * 60 * 60),
    }
    console.log('@@@')
    const sessionToken = await authorizer.generateToken(someAccount)
    expect(expectedSessionToken).toStrictEqual(sessionToken)
    expect(sessionTokenDBAccessMock.storeSessionToken).toBeCalledWith(sessionToken)
  })
})
