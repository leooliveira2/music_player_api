import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ocorreu um erro! Tente novamente';

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (httpStatus === HttpStatus.BAD_REQUEST) {
        message = (exceptionResponse as any).message || 'Erro de validação';
      } else {
        message = exception.message;
      }
    }

    const responseBody = {
      statusCode: httpStatus,
      message: message,
      exception: exception instanceof Error ? exception.name : exception,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
