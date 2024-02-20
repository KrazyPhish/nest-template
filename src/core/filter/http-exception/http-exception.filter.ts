import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let validatorMessage = exceptionResponse;
    if (typeof exceptionResponse === 'object') {
      const { message } = exceptionResponse as { message: string[] | string };
      validatorMessage = Array.isArray(message) ? message[0] : message;
    }
    console.log(exceptionResponse, 'exceptionResponse');
    console.log(validatorMessage, 'validatorMessage');

    const errorResponse = {
      data: null,
      message:
        validatorMessage ||
        `${status >= 500 ? 'Service Error' : 'Client Error'}`,
      code: -1,
    };

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
