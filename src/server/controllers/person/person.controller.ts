import { Log } from '@app/common/services';
import { Person, PersonRepo } from '@app/data/person';
import { Controller } from '@random-guys/siber';
import { Request, Response } from 'express';
import {
  controller,
  httpPost,
  httpPut,
  request,
  requestBody,
  requestParam,
  response
} from 'inversify-express-utils';
// import { validate } from '@hapi/joi';
// import { isPerson, isPersonDTO } from './Person.validator';
// import sendInvitation from '@app/actions/sendInvitation';
// import getNubanAccount from '@app/actions/getNubanAccount';

type ControllerResponse = Person | Person[] | any;

@controller('/Person')
export class PersonController extends Controller<ControllerResponse> {
  constructor() {
    super(Log);
  }

  @httpPost('/')
  async createAuthorization(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      let person = await PersonRepo.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber
      });
      this.handleSuccess(req, res, person);
    } catch (err) {
      this.handleError(req, res, err);
    }
  }

  @httpPost('/login',)
  async createAccess(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      let username = req.body.username;
      let person = await PersonRepo.byQuery({ email: username }, {'created_at': false});
      this.handleSuccess(req, res, person);
    } catch (err) {
      this.handleError(req, res, err);
    }
  }

  @httpPut('/:id')
  async confirmSingleSignatory(
    @request() req: Request,
    @response() res: Response,
    @requestParam('id') PersonId: string,
    @requestBody() body: Person
  ) {
    try {
      let person = await PersonRepo.atomicUpdate(PersonId, body);
      this.handleSuccess(req, res, person);
    } catch (err) {
      this.handleError(req, res, err);
    }
  }
}
